import {Block} from '../block';
import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {BlockServiceTs} from '../block.service';

import 'rxjs/add/operator/switchMap';

@Injectable()
export class BlockDetailResolver implements Resolve<Observable<Block>> {

    constructor(private blockService: BlockServiceTs) {

    }


    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<Block> {

        const theid = route.params['id'];
        return this.blockService.getBlock(Number(theid));

        //        throw new Error('Method not implemented.');

    }


}
