import {User} from '../users/user';
import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UsersService} from '../users.service';

import 'rxjs/add/operator/switchMap';

@Injectable()
export class UserDetailsResolver implements Resolve<Observable<User>> {

    constructor(private usersService: UsersService) {

    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<User> {

        const theid = route.params['id'];
//        return this.usersService.getUser(Number(theid));
        return this.usersService.getUser(theid);

        //        throw new Error('Method not implemented.');

    }


}
