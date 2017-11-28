import { Component, OnInit, OnDestroy } from '@angular/core';
import { Block } from '../block';
import { BlockServiceTs } from '../block.service';
import Web3 from 'web3';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

//const web3 = new Web3( new Web3.providers.HttpProvider( 'http://localhost:9595' ) );
//const web3 = new Web3( new Web3.providers.HttpProvider( 'http://localhost:9595' ) );
var web3 = new Web3(Web3.givenProvider || "ws://localhost:9595");

@Component( {
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
} )

export class DashboardComponent implements OnInit, OnDestroy {

    blocks: Block[] = [];
    subWatch: any;
    subBlocks: any;
    subBlockService: any;

    //    coinbase = web3.eth.coinbase;
    balance: number;
    balanceEther: string;
    accounts: string[];
    latestBlock: number;
    transactionsNum: number;

subscription = web3.eth.subscribe('newBlockHeaders', function(error, result){
    if (error)
        console.log(error);
    else
        console.log(result);
}).on("data", function(blockHeader){
});
    //    filtr = web3.eth.filter('latest');
//    sub = web3.eth.subscribe('newBlockHeaders', function(error, result) {
//        if(!error) {
//            console.log('!!!!!!!!!!!!!! result = ' + JSON.stringify(result));
//        }
//        if(error) {
//            console.log('!!!!!!!!!!!!!! error = ' + JSON.stringify(error));
//        } else {
//            console.log('!!!!!!!!!!!!!! completed ' );
//        }
//    }).on("data", function(blockHeader) {
//        
//        console.log('******************** startet sub with: ' + JSON.stringify(blockHeader));
//    });

    constructor( private blockService: BlockServiceTs ) { }

    ngOnInit() {
        this.getStats();
        console.log( 'OnInit' );
        console.log( 'Before: ' + this.blocks.length );
        this.getBlocks();
        console.log( 'After1: ' + this.blocks.length );
        this.watchBlocks();
        console.log( 'After2: ' + this.blocks.length );
        //        this.subWatch = this.watchBlocks().subscribe(blocks => this.blocks = blocks);
    }

    ngOnDestroy() {
        console.log( 'onDestroy' );
        //        this.subWatch.unsubscribe();
        //        this.subBlocks.unsubscribe();
        //        this.subBlockService.unsubscribe();
        //        this.filtr.stopWatching();
//        this.sub.unsubscribe();
    }

    getBlocks() {
        this.subBlocks = this.blockService.getBlocks().subscribe( blocks => this.blocks = blocks.slice( 1, 5 ) );
    }

    watchBlocks() {
//        this.sub.on("data", function(blockHeader) {
//        
//            console.log('******************** startet sub with: ' + JSON.stringify(blockHeader));
//        });
        //        this.filtr.watch(x => {
        //            this.subBlockService = this.blockService.getBlocksStream().subscribe(blocks => {
        //                this.blocks = blocks.slice(1, 5);
        //                this.getStats();
        //            },
        //                err => {
        //                    console.log(err);
        //                    // closeLoadingBar();
        //                },
        //                () => {
        //                    console.log('Completed watchBlock');
        //                    //               this.subBlockServ();
        //               
        //                    // do whatever you want
        //                    // closeLoadingBar()
        //                }
        //            );
        //        });
    }

    getStats() {
        web3.eth.getBlock( 'latest' ).then( x => this.latestBlock = x.number );
        //        this.balance = web3.eth.getBalance(this.coinbase);
        //        this.balanceEther = web3.fromWei(web3.eth.getBalance(web3.eth.coinbase), 'ether').toString(10);
        //        this.accounts = web3.eth.accounts;
        //        this.latestBlock = web3.eth.getBlock('latest').number; // web3.eth.defaultBlock;
        //        this.transactionsNum = web3.eth.getTransactionCount(this.coinbase);
    }
}
