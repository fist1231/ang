import {Tx} from '../tx';
import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {BlockServiceTs} from '../block.service';

import 'rxjs/add/operator/switchMap';

@Injectable()
export class TransactionResolver implements Resolve<Tx> {

    
    
    constructor(private blockService: BlockServiceTs) {
        
    }
    
    
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<Tx> {
        
             this.blockService.txAnnounced$.subscribe(txs => {
//                    this.transactions.push(txs);
                    console.log('Un- Sourced +++++++++++++++++++++++++++++++++++> ' + txs);
//                    console.log('Un- Sourced +++++++++++++++++++++++++++++++++++> ' + this.transactions);
        
                });

        
       const bsob = this.blockService.fetchTxs(1, route.params['account']);
             

       return this.blockService.fetchTxs(1, route.params['account']);
       //.map(tr = > this.blockService.txAnnounced$); 
       
       
//        return this.blockService.fetchTxs(1, account).subscribe(x => {
//            console.log('from component x = '
//                + x);
//        }).switchMap();

    }
    //        throw new Error('Method not implemented.');
    //    }

}
