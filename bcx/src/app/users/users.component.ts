import { Component, OnInit, OnDestroy, AfterViewInit, TemplateRef, NgZone } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import { User } from "./user";
import { ActivatedRoute } from "@angular/router";
import { UsersService } from '../users.service';
import { Subject } from "rxjs/Subject";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { merge } from "rxjs/operator/merge";
import { MenuItem } from "primeng/primeng";
import { FormControl, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';


interface Status {
    name: string,
    code: string[]
}


@Component( {
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
} )


export class UsersComponent implements OnInit, OnDestroy, AfterViewInit {

    users: User[];
    users$: Observable<User[]>;
    usrs$;
    private searchTerms = new Subject<string>();
    public modalRef: BsModalRef;
    user$: Observable<User>;
    user: User;

    displayUpdate: boolean = false;
    displayAdd: boolean = false;
    displayDelete: boolean = false;
    submitted = false;

    selectedUser: User;
    items: MenuItem[];

    updateUserForm: FormGroup;
    
    statuses: Status[];
    selectedStatus: Status;
    
    //    updateUserForm = new FormGroup( {
    //        id: new FormControl(),
    //        name: new FormControl(),
    //        status: new FormControl(),
    //        created_date: new FormControl()
    //    } );

    //    id = new FormControl();
    //    name = new FormControl();
    //    status = new FormControl();
    //    created_date = new FormControl();


    onSubmit() { this.submitted = true; }

    constructor( private route: ActivatedRoute
        , private usersService: UsersService
        , private modalService: BsModalService
        , private _ngZone: NgZone
        , private fb: FormBuilder
    ) {
        this.createStatusList();
        this.createUpdateUserForm();
        //        this.setUpdateFormValues()
    }
    
    createStatusList() {
        this.statuses = [
                        {name: 'Pending', code: ['pending']},
                        {name: 'Ongoing', code: ['ongoing']},
                        {name: 'Completed', code: ['completed']}
                    ];
        
    }

    createUpdateUserForm() {
        this.updateUserForm = this.fb.group( {
            id: ['', [Validators.required, Validators.minLength( 2 ), Validators.pattern( /^[1-9][0-9]*$/ )] /*, this.userNotTakenValidator.bind( this )*/],
            name: ['', [Validators.required, Validators.minLength( 4 ), forbiddenNameValidator( /wtf/i )]],
            status:  this.statuses[0],
            created_date: Date,
        } );
    }

    setUpdateUserFormValues( user: User ) {
//        let st = this.statuses.map(x=>{console.log(x);return x}).find(x => x.code[0] === user.status[0]);
        let st = this.statuses.find(x => x.code[0] === user.status[0]);
        this.updateUserForm.setValue( {
            id: user.id,
            name: user.name,
            status: st,
            created_date: user.created_date,
        } );
    }



    showUpdateDialog( id ) {

        console.log( 'userid = ' + id );
        this.usersService.getUser( id ).subscribe( usr => {
            console.log('--------------- user = ' + JSON.stringify(usr));
            this.user = usr;
            this.setUpdateUserFormValues( this.user );
            this.displayUpdate = true;
        } );
    }

    hideUpdateDialog() {
        this.displayUpdate = false;
    }

    showAddDialog() {

        //        this.user = { _id: "", id: "", name: "", desc: "", create_date: "", created_date: "" };
        this.user = new User( "", "", ["pending"], new Date() );
        this.displayAdd = true;
    }

    hideAddDialog() {
        this.displayAdd = false;
    }

    showDeleteDialog( id ) {

        console.log( 'userid = ' + id );
        this.usersService.getUser( id ).subscribe( usr => {
            this.user = usr;
            this.displayDelete = true;
        } );
    }

    hideDeleteDialog() {
        this.displayDelete = false;
    }

    ngOnInit() {
        //        this.getUsers();
        this.initSearch();
        this.populateContextMenu();
    }

    ngAfterViewInit(): void {
        this.searchTerms.next( '' );
    }

    ngOnDestroy(): void {
        //        throw new Error( "Method not implemented n." );
    }

    populateContextMenu() {
        this.items = [
            { label: 'Add new', icon: 'fa-plus', command: ( event ) => this.showAddDialog() },
            { label: 'Update', icon: 'fa-search', command: ( event ) => this.showUpdateDialog( this.selectedUser._id ) },
            { label: 'Delete', icon: 'fa-close', command: ( event ) => this.showDeleteDialog( this.selectedUser._id ) }
        ];

    }

    getUsers() {
        this.users$ = this.route.data.map( x => x.users );

        //        this.route.data.map( x => x.users ).subscribe( usrs => this.users = usrs );
    }

    deleteUser( user: User ): void {
        //        this.users = this.users.filter(u => u !== user);
        this.initSearch();
        this.usersService.deleteUser( user ).subscribe(
            usr => { },
            err => {
                console.log( 'Delete user ERROR: ' + err );
            },
            () => {
                console.log( 'Completed Delete user' );
                this.searchTerms.next( '' );
                this.hideDeleteDialog();
                //                this.users$.subscribe(x => {
                //                    this.users = this.users.filter(u => u !== user);
                //                });
            }
        );
    }


    updateUser( user: User ): void {
        this.initSearch();
        
        const formModel = this.updateUserForm.value;

        console.log( '****************************** user.status: ' + user.status );
        console.log( '****************************** user.create_date: ' + user.create_date );

         user.name = formModel.name;
         user.status = formModel.status['code'];
         user.create_date = formModel.create_date;
         console.log( '****************************** Before Updating user: ' + JSON.stringify(user) );
         
        console.log( '****************************** formModel.name: ' + formModel.name );
        console.log( '****************************** formModel.status[code]: ' + formModel.status['code'] );
        console.log( '****************************** formModel.create_date: ' + formModel.create_date );
        
        this.usersService.updateUser( user ).subscribe(
            x => {
                console.log( 'Updating user ...' );
            },
            err => {
                console.log( 'Update user ERROR: ' + err );
            },
            () => {
                console.log( 'Completed update user' );
                //                this.searchTerms.next( '' );
                //                this.searchTerms.next( 'a' );
                this._ngZone.run(() => {
                    this.searchTerms.next( '' );
                } )
                this.hideUpdateDialog();
            }
        );
    }

    createUser( user: User ) {
        console.log( 'User: ' + JSON.stringify( user ) );
        //        this.users$.subscribe( console.log );
        //        //        console.log( 'Users$: ' + JSON.stringify( this.users$ ) );
        //        let merged = this.users$.merge( of( user ) );

        this.initSearch();
        this.usersService.addUser( user ).subscribe(
            usr => {
            },
            err => { console.log( 'Create user ERROR: ' + err ); },
            () => {
                this.searchTerms.next( '' );
                //                        this.users$.merge( of( user ) );
                console.log( 'Create user completed' );
                this.hideAddDialog();

            }

        );

    }


    search( term: string ): void {
        console.log( 'searching: ' + term );
        this.searchTerms.next( term );
    }

    initSearch() {

        this.users$ = this.searchTerms
            .debounceTime( 300 )
            .distinctUntilChanged()
            .switchMap(( term: string ) => this.usersService.searchUsers( term ) );

        /*        this.users$ = this.searchTerms.pipe(
                        // wait 300ms after each keystroke before considering the term
                        debounceTime(300),
                   
                        // ignore new term if same as previous term
                        distinctUntilChanged(),
                   
                        // switch to new search observable each time the term changes
                        switchMap((term: string) => this.usersService.searchUsers(term)),
                      );
        */

        this.users$.subscribe(
            usr => {
                console.log( '' );
                this.users = usr;
            },
            err => {
                console.log( '' );
            },
            () => {
                console.log( '' );
            }
        );
    }

    getUser() {
        this.usersService.getUser( Number( '1' ) );
    }


    public openModal( template: TemplateRef<any> ) {
        this.getUser();
        this.modalRef = this.modalService.show( template, { user: this.user$ } );
    }

    userNotTakenValidator( control: AbstractControl ) { //: ValidatorFn {
        const id = control.value;
        let result: boolean;
        return this.usersService.findUserById( id )
            .map(
                usr => {
                    console.log( 'checkUserNotTaken search user id = ' + id );
                    console.log( 'checkUserNotTaken usr = ' + JSON.stringify( usr ) );
                    console.log( 'checkUserNotTaken usr.length = ' + usr.length );
                    if ( usr && usr.length > 0 ) {
                        console.log( 'checkUserNotTaken found user with matching id = ' + usr[0].id );
                        console.log( 'checkUserNotTaken number of users with matching id: ' + usr.length );
                        let result = usr.find( x => x.id === id ) != null;
                        return result ? {userNotTaken: {value: {size: usr.length, usrs: usr}}}: null;
                    } else {
                        
                        console.log( 'checkUserNotTaken not found user with matching id = ' + id );
                        return null;
                    }
                }
            );
        //            .subscribe(
        //                usr => {
        //                    console.log( 'checkUserNotTaken search user id = ' + id );
        //                    console.log( 'checkUserNotTaken usr = ' + JSON.stringify(usr) );
        //                    if(usr) {
        //                        console.log( 'checkUserNotTaken found user with matching id = ' + usr[0].id );
        //                        console.log( 'checkUserNotTaken number of users with matching id: ' + usr.length );
        //                        return result = usr.find(x => x.id === id) != null;
        //                    } else {
        //                        console.log( 'checkUserNotTaken not found user with matching id = ' + id );
        //                    }
        //                },
        //                err => { console.log( 'checkUserNotTaken user ERROR: ' + err ); },
        //                () => {
        //                    console.log( 'checkUserNotTaken user completed' );
        //                }
        //
        //            );

        //        return result ? 

        //        return (control: AbstractControl): {[key: string]: any} => {
        //            const forbidden = result;
        //            return result ? {'userNotTaken': {value: control.value}} : null;
        //        };

    }



}

export function forbiddenNameValidator( nameRe: RegExp ): ValidatorFn {
    return ( control: AbstractControl ): { [key: string]: any } => {
        const forbidden = nameRe.test( control.value );
        return forbidden ? { 'forbiddenName': { value: control.value } } : null;
    };
}
