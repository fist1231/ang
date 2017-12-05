import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UsersService} from '../users.service';
import { User } from "./user";

@Injectable()
export class UsersResolver {

  constructor(private usersService: UsersService) { }

  resolve(
          route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<User[]> {

          const theid = route.params['id'];
          return this.usersService.getUsers();

          //        throw new Error('Method not implemented.');

      }
  
  
}
