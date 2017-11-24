import {Tx} from '../tx';
import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {BlockServiceTs} from '../block.service';

@Injectable()
export class TransactionResolver implements Resolve<[Tx[], string]> {

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): [Tx[], string] | Observable<[Tx[], string]> | Promise<[Tx[], string]> {
        const blockService: BlockServiceTs;
        return blockService.fetchTxs(1, account).subscribe(x => {
            console.log('from component x = '
                + x);
        });

    }
    //        throw new Error('Method not implemented.');
    //    }

}
