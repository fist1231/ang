import { Component, OnInit, OnDestroy, AfterViewInit, TemplateRef } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { User } from "./user";
import { ActivatedRoute } from "@angular/router";
import { UsersService } from '../users.service';
import { Subject } from "rxjs/Subject";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';



@Component( {
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
} )
export class UsersComponent implements OnInit, OnDestroy, AfterViewInit {
    
    ngAfterViewInit(): void {
        this.searchTerms.next('');
    }

    users: User[];
    users$: Observable<User[]>;
    usrs$;
    private searchTerms = new Subject<string>();
    public modalRef: BsModalRef;
    user$: Observable<User>;

    constructor( private route: ActivatedRoute, private usersService: UsersService, private modalService: BsModalService ) { }

    ngOnInit() {
//        this.getUsers();
        this.initSearch();
    }


    ngOnDestroy(): void {
        //        throw new Error( "Method not implemented n." );
    }

    getUsers() {
        this.users$ = this.route.data.map( x => x.users );

        //        this.route.data.map( x => x.users ).subscribe( usrs => this.users = usrs );
    }

    delete( user: User ): void {
        this.users = this.users.filter( u => u !== user );
        this.usersService.deleteUser( user ).subscribe();
    }


    search( term: string ): void {
        console.log('searching: ' + term);
        this.searchTerms.next( term );
    }

    initSearch() {

        this.users$ = this.searchTerms
        .debounceTime(300)
        .distinctUntilChanged()
        .switchMap((term: string) => this.usersService.searchUsers(term));

/*        this.users$ = this.searchTerms.pipe(
                // wait 300ms after each keystroke before considering the term
                debounceTime(300),
           
                // ignore new term if same as previous term
                distinctUntilChanged(),
           
                // switch to new search observable each time the term changes
                switchMap((term: string) => this.usersService.searchUsers(term)),
              );
*/
    }
    
    getUser() {
        this.usersService.getUser(Number('1'));
    }
    
    
    public openModal(template: TemplateRef<any>) {
        this.getUser();
        this.modalRef = this.modalService.show(template, {user: this.user$});
    }
    
    
}
