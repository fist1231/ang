import { Component, OnInit, ViewEncapsulation, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BlockService }  from '../block.service';
import { Tx }  from '../tx';
import Web3 from 'web3';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

const web3 = new Web3( new Web3.providers.HttpProvider( "http://localhost:9595" ) );

@Component({
  selector: 'app-tx-list',
  templateUrl: './tx-list.component.html',
  styleUrls: ['./tx-list.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class TxListComponent implements OnInit {

    transactions: Tx[] = [];
    tranz: Observable<Tx[]>;

    constructor(private route: ActivatedRoute,
            private blockService: BlockService,
            private location: Location
    ) { }
    
    ngOnInit() {
//        this.getTxs();
        this.firstThou();
    }
    
    firstThou() {
//        this.blockService.getTransactionsByBlk(1).subscribe(txs => this.transactions = txs);
        this.blockService.txAnnounced$.subscribe(txs => {
                this.transactions = txs;
                console.log("Un- Sourced +++++++++++++++++++++++++++++++++++> " + txs);
                console.log("Un- Sourced +++++++++++++++++++++++++++++++++++> " + this.transactions);

            }
        );
        
        
//      this.getTran().subscribe(txs => this.transactions = txs);
//      return this.transactions;
        
    }
    
    ngAfterViewChecked() {
//        this.getMoreTxs();
    }
    
    getTran(): Observable<Tx[]> {
  
        const account = +this.route.snapshot.paramMap.get('account');
        console.log('getTransactions for account = ' + account);
        for (var i = 1; i <= 2000; i++) {
            if (i % 1000 == 0) {
              console.log("Searching block " + i);
            }
              this.blockService.getTransactionsByBlk(i, account);
        }
        
//        this.getTxs();
        return of(this.transactions);
        
    }
    
    getTxs(): void {
        const account = +this.route.snapshot.paramMap.get('account');
        console.log('getTransactions for account = ' + account);
        for (var i = 1; i <= 2000; i++) {
            if (i % 1000 == 0) {
              console.log("Searching block " + i);
            }
              this.blockService.getTransactionsByBlk(i, account);
        }
                
//        this.blockService.getTransactions(account).subscribe(txs => this.transactions = txs);
    }

    getMoreTxs(): void {
        
        const account = +this.route.snapshot.paramMap.get('account');
        console.log('getTransactions for account = ' + account);
        
        this.blockService.getTransactionsByBlk(1, account).subscribe(traaan => this.transactions = traaan);
        
        
//        this.tranz.subscribe(traaan => this.transactions = traaan);
        
//        this.blockService.getTransactionsByBlk(1);
//        this.blockService.getTransactionsByBlk(1, account).subscribe(txs => this.transactions = txs);
                
//        this.blockService.getTransactions(account).subscribe(txs => this.transactions = txs);
    }

    goBack(): void {
        this.location.back();
    }

}
