import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { User } from "./users/user";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

import { Users } from '@nress/users';
import { MessageService } from "./message.service";


//const usrs = new Users();


const httpOptions = {
    headers: new HttpHeaders( { 'Content-Type': 'application/json' } )
};

@Injectable()
export class UsersService implements OnInit, OnDestroy {

    private host = 'http://192.168.99.100:3333';
    
    private usersUrl = this.host + '/nress/users';  // URL to web api
    private searchUrl = this.host + '/nress/search';  // URL to web api
    private findUserByIdUrl = this.host + '/nress/user';  // URL to web api

    ngOnDestroy(): void {
        //        throw new Error( "Method not implemented." );
    }
    ngOnInit(): void {
        //        throw new Error( "Method not implemented." );
    }

    constructor( private http: HttpClient, private messageService: MessageService ) { }


    private log( message: string ) {
        this.messageService.add( 'HeroService: ' + message );
    }

    getUsers(): Observable<User[]> {
        console.log( 'getting users' );
        //      const users: User[] = [ {id: 'id1', name: 'name-1', desc: 'desc-1'}, {id: 'id2', name: 'name-2', desc: 'desc-2'} ];


        const users$: Observable<User[]> = this.http.get<User[]>( this.usersUrl )
            .pipe(
            map( x => x.sort(( a, b ) => {
                return Number( a.id ) < Number( b.id ) ? -1 : 1;
            } ) ),
            catchError( this.handleError( 'getUsers', [] ) )
            );

        this.http.get( this.usersUrl ).subscribe( users => {
            console.log( 'users from node: ' + JSON.stringify( users ) );
        } );

        //      this.usrs.getUsers().subscribe(x => console.log);

        return users$;
    }

    searchUsers( term: string ): Observable<User[]> {
        if ( !term.trim() )
        {
            // if not search term, return all array.
            console.log( 'First search ...' );
            return this.getUsers();
        }
        const users$: Observable<User[]> = this.http.get<User[]>( this.searchUrl + `/${term}` ).pipe(
            map( x => x.sort(( a, b ) => {
                return Number( a.id ) < Number( b.id ) ? -1 : 1;
            } ) ),
            tap( _ => this.log( `found users matching "${term}"` ) ),
            catchError( this.handleError<any>( 'searchUsers', [] ) )
        );
        return users$;
    }

    
    findUserById( id: string ): Observable<User[]> {
        const users$: Observable<User[]> = this.http.get<User[]>( this.findUserByIdUrl + `/${id}` ).pipe(
            tap( _ => this.log( `findUserById found user matching id: "${id}"` ) ),
            catchError( this.handleError<any>( 'findUserById', [] ) )
        );
        return users$;
    }
    

    getUser( id: number ): Observable<User> {
        console.log( 'number = ' + id );
        const url = `${this.usersUrl}/${id}`;
        console.log( 'url = ' + url );
        return this.http.get<User>( url ).pipe(
            tap( _ => this.log( `fetched user id=${id}` ) ),
            catchError( this.handleError<any>( `getUser id=${id}` ) )
        );
    }

    updateUser( user: User ): Observable<any> {
        console.log( 'USER = ' + JSON.stringify( user ) );
        const url = `${this.usersUrl}/${user._id}`;
        return this.http.put( url, user, httpOptions ).pipe(
            tap( _ => this.log( `updated hero id=${user.id}` ) ),
            catchError( this.handleError<any>( 'updateUser' ) )
        );
    }

    addUser( user: User ): Observable<User> {
        console.log( 'addUser USER = ' + JSON.stringify( user ) );
        return this.http.post( this.usersUrl, user, httpOptions ).pipe(
            tap( _ => this.log( `added user w/ id=${user.id}` ) ),
            catchError( this.handleError<any>( 'addUser' ) )
        );
    }


    deleteUser( user: User | number ): Observable<User> {
        const id = typeof user === 'number' ? user : user._id;
        const url = `${this.usersUrl}/${id}`;

        return this.http.delete<User>( url, httpOptions ).pipe(
            tap( _ => this.log( `deleted hero id=${id}` ) ),
            catchError( this.handleError<User>( 'deleteUser' ) )
        );
    }


    private handleError<T>( operation = 'operation', result?: T ) {
        return ( error: any ): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error( error ); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log( `${operation} failed: ${error.message}` );

            // Let the app keep running by returning an empty result.
            return of( result as T );
        };
    }



}
