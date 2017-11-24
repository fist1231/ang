import { Component, OnInit, OnDestroy } from '@angular/core';
import { Block } from '../block';
import { BlockServiceTs } from '../block.service';
import Web3 from 'web3';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

const web3 = new Web3( new Web3.providers.HttpProvider( "http://localhost:9595" ) );

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, OnDestroy {
    
    blocks: Block[] = [];
    subWatch: any;
    subBlocks: any;
    subBlockService: any;

    coinbase = web3.eth.coinbase;
    balance: number;
    balanceEther: string;
    accounts: string[];
    latestBlock: number;
    transactionsNum: number;


    filtr = web3.eth.filter('latest');

    constructor(private blockService: BlockServiceTs) { }

    ngOnInit() {
        this.getStats();
        console.log('OnInit');
        console.log('Before: ' + this.blocks.length );
        this.getBlocks();
        console.log('After1: ' + this.blocks.length );
        this.watchBlocks();
        console.log('After2: ' + this.blocks.length );
//        this.subWatch = this.watchBlocks().subscribe(blocks => this.blocks = blocks);
    }
    
    ngOnDestroy() {
        console.log('onDestroy');
//        this.subWatch.unsubscribe();
//        this.subBlocks.unsubscribe();
//        this.subBlockService.unsubscribe();
        this.filtr.stopWatching();
        
    }
    
    getBlocks() {
        this.subBlocks = this.blockService.getBlocks().subscribe(blocks => this.blocks = blocks.slice(1, 5));
    }    

    watchBlocks() {
        this.filtr.watch(x => {
            this.subBlockService = this.blockService.getBlocksStream().subscribe(blocks => { 
                this.blocks = blocks.slice(1, 5);
                this.getStats();
            },
            err => {
                console.log(err);
                //closeLoadingBar();
           },
           () => {
               console.log("Completed watchBlock");
//               this.subBlockService.unsubscribe();
               
                //do whatever you want
                //closeLoadingBar()
           }
        );
    });
    }  

    getStats() {
        this.balance = web3.eth.getBalance( this.coinbase );
        this.balanceEther = web3.fromWei(web3.eth.getBalance(web3.eth.coinbase), "ether").toString(10);
        this.accounts = web3.eth.accounts;
        this.latestBlock = web3.eth.getBlock('latest').number; //web3.eth.defaultBlock;
        this.transactionsNum = web3.eth.getTransactionCount( this.coinbase );
    }
}
