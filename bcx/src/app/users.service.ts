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


    private usersUrl = 'http://localhost:3333/nress/users';  // URL to web api
    private searchUrl = 'http://localhost:3333/nress/search';  // URL to web api

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


        const users$: Observable<any> = this.http.get( this.usersUrl )
            .pipe(
            catchError( this.handleError( 'getHeroes', [] ) )
            );

        this.http.get( this.usersUrl ).subscribe( users => {
            console.log( 'users from node: ' + JSON.stringify( users ) );
        } );

        //      this.usrs.getUsers().subscribe(x => console.log);

        return users$;
    }

    searchUsers( term: string ): Observable<User[]> {
                if (!term.trim()) {
                  // if not search term, return all array.
                    console.log( 'First search ...' );
                  return this.getUsers();
                }
        return this.http.get<User[]>( this.searchUrl + `/${term}` ).pipe(
            tap( _ => this.log( `found users matching "${term}"` ) ),
            catchError( this.handleError<User[]>( 'searchUsers', [] ) )
        );
    }


    getUser( id: number ): Observable<User> {
        const url = `${this.usersUrl}/${id}`;
        return this.http.get<User>( url ).pipe(
            tap( _ => this.log( `fetched user id=${id}` ) ),
            catchError( this.handleError<User>( `getUser id=${id}` ) )
        );
    }

    updateUser( user: User ): Observable<any> {
        return this.http.put( this.usersUrl, user, httpOptions ).pipe(
            tap( _ => this.log( `updated hero id=${user.id}` ) ),
            catchError( this.handleError<any>( 'updateUser' ) )
        );
    }

    addUser( user: User ): Observable<User> {
        return this.http.post<User>( this.usersUrl, user, httpOptions ).pipe(
            tap(( user: User ) => this.log( `added user w/ id=${user.id}` ) ),
            catchError( this.handleError<User>( 'addUser' ) )
        );
    }


    deleteUser( user: User | number ): Observable<User> {
        const id = typeof user === 'number' ? user : user.id;
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
