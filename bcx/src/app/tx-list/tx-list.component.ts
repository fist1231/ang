import {Component, OnInit, ViewEncapsulation, AfterViewChecked} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {BlockServiceTs} from '../block.service';
import {Tx} from '../tx';
import Web3 from 'web3';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

import {interval} from 'rxjs/observable/interval';
import {merge} from 'rxjs/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';

import {
    debounceTime, distinctUntilChanged, flatMap
} from 'rxjs/operators';

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9595'));

@Component({
    selector: 'app-tx-list',
    templateUrl: './tx-list.component.html',
    styleUrls: ['./tx-list.component.css'],
    encapsulation: ViewEncapsulation.None
})


export class TxListComponent implements OnInit {

    transactions: Tx[] = [];
    transactions$: Observable<Tx[]>;

    tranz: Observable<Tx[]>;
    subWatch: any;


    //    constructor(private route: ActivatedRoute,
    //        private blockService: BlockServiceTs,
    //        private location: Location
    //  ) {}

    constructor(private route: ActivatedRoute, private location: Location) {}


    ngOnInit() {
        this.transactions.push(this.route.snapshot.data['transactions']);
        
        
        //        this.getTxs();
        //        this.firstThou();
    }

    //    firstThou() {
    //        //        this.blockService.getTransactionsByBlk(1).subscribe(txs => this.transactions = txs);
    //        this.subWatch = this.blockService.txAnnounced$.subscribe(txs => {
    //            this.transactions.push(txs);
    //            console.log('Un- Sourced +++++++++++++++++++++++++++++++++++> ' + txs);
    //            console.log('Un- Sourced +++++++++++++++++++++++++++++++++++> ' + this.transactions);
    //
    //        }
    //        );
    //
    //
    //        //      this.getTran().subscribe(txs => this.transactions = txs);
    //        //      return thistions;
    //
    //    }


    //    getTran(): Observable<Tx[]> {
    //
    //        const account = +this.route.snapshot.paramMap.get('account');
    //        console.log('getTransactions for account = ' + account);
    //        for (let i = 1; i <= 2000; i++) {
    //            if (i % 1000 === 0) {
    //                console.log('Searching block ' + i);
    //            }
    //            this.blockService.getTransactionsByBlk(i, account);
    //        }
    //
    //        //        this.getTxs();
    //        return of(this.transactions);
    //
    //    }

    //    getTxs(): void {
    //        const account = +this.route.snapshot.paramMap.get('account');
    //        console.log('getTransactions for account = ' + account);
    //        for (let i = 1; i <= 2000; i++) {
    //            if (i % 1000 === 0) {
    //                console.log('Searching block ' + i);
    //            }
    //            this.blockService.getTransactionsByBlk(i, account);
    //        }
    //
    //        //        this.blockService.getTransactions(account).subscribe(txs => this.transactions = txs);
    //    }

    getMoreTxs() {
        //        const account = +this.route.snapshot.paramMap.get('account');
        //        console.log('getTransactions for account = ' + account);
        //
        //        //        this.blockService.getTransactionsByBlk(1, account).subscribe(traaan => this.transactions = traa        
        //        this.blockService.fetchTxs(1, account).subscribe(x => {
        //            console.log('from component x = '
        //                + x);
        //        });



        /*
                const words = "Row row row your boat gently down the stream merrily merrily merrily merrily life is but a dream".split(" ");
                const numWords = words.length;
                const singer$ = interval(500) // emit a value every half second .
                .scan(x => {
        //            console.log("scan val:"+(x+1));
                    if(x+1>100) {
                        complete();
                    }
                    return (x + 1);
                    }) // record the count 
                .map(count => {
        //            console.log("map moduloe val:"+(count % numWords));
                    return (count % numWords);
                }) // convert into a resetting index
                .map(index => words[index]); // map to the word
                
                const round$ = interval(4500)
        .mergeMap(() => singer$)
                round$.subscribe(console.    
                
        //        singer$.subscribe(console.log);
                
        */
        //        this.tranz.subscribe(traaan =>ns = traaan);

        //        this.blockService.getTransactionsByBlk(1);
        //        this.blockService.getTransactionsByBlk(1, account).subscribe(txs => this.transactions = txs);

        //        this.blockService.getTransactions(account).subscribe(txs => this.transactions = txs);
    }

    goBack() {
                this.location.back();
    }

    sandbox() {
/*        
        const countdownSeconds = 5;
        const setHTML = id => val => document.getElementById(id).innerHTML = val;
        const pauseButton = document.getElementById('pause');
        const resumeButton = document.getElementById('resume');
        const interval$ = interval(1000).mapTo(-1);

        const pause$ = fromEvent(pauseButton, 'click').mapTo(Rx.Observable.of(false))
        const resume$ = fromEvent(resumeButton, 'click').mapTo(interval$);        
        
        const timer$ = merge(pause$, resume$)
      .startWith(interval$)
      .switchMap(val => val)
      .scan((acc, curr) => curr ? curr + acc : acc, countdownSeconds )
      .takeWhile(x => x>=0);
      
      var tsub = timer$.subscribe(x=> {
         console.log(x);
         if(x>0) {
                setHTML('remaining')(x);
       } else {
                setHTML('remaining')('pizdes');
//           console.log("this = " + this);
//          unsub(this);
       }
      //setHTML(x); 
      });
      
      //var usub = tsub.unsubscribe();
      
      function unsub(obj) {
       obj.unsubscribe();
      }        
*/    }

}
