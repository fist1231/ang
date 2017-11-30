import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Block } from '../block';
import { BlockServiceTs } from '../block.service';
import Web3 from 'web3';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { EventEmitter, BlockHeader, Subscribe } from "web3/types";



import { interval } from 'rxjs/observable/interval';
import { Subject } from 'rxjs/Subject';


//const web3 = new Web3( new Web3.providers.HttpProvider( 'http://localhost:9595' ) );
//const web3 = new Web3( new Web3.providers.HttpProvider( 'http://localhost:9595' ) );
const web3 = new Web3( Web3.givenProvider || "ws://localhost:9595" );
//const web3 = new Web3( new Web3.providers.WebsocketProvider( 'ws://localhost:9595' ) );


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

    coinbase$: Observable<string>;
    balance: number;
    balanceEther: string;
    accounts: string[];
    latestBlock: number;
    transactionsNum: number;
    subscription;
    blocks$: Observable<Block[]>;


    //    .on( "data", function( blockHeader ) {
    //    } );
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

    constructor( private blockService: BlockServiceTs, private _ngZone: NgZone ) {

    }

    private stopWatchingBlockHeaders() {

        this.subscription.unsubscribe( function( error, success ) {
            if ( success )
            {
                console.log( 'Successfully unsubscribed!' );
            }
        } );
    }

    private watchBlockHeaders() {
        let eth = web3.eth;
        this.subscription = eth.subscribe( 'newBlockHeaders', function( error, result ) {
            if ( error )
            {
                console.log( error );
            }
        } );

        this.subscription.on( "data", ( result ) => {
            console.log( '*********** result = ' + result );
            this.getStats2();
            this.getBlocks();

        } );
    }

    trackByFn( index, block ) {

        return block.number;
        //        setTimeout(() => {
        //            console.log( 'trackByFn**************' );
        //        }, 1000 );

    }

    ngOnInit() {
        console.log( 'OnInit' );
                setTimeout(() => {
        this.getStats2();
               }, 0 );
        //        this._ngZone.run(() => {
        //        setTimeout(() => {
        this.getBlocks();
        //        }, 3000 );
        //        } );

        this.watchBlockHeaders();
        
        
        
    }

    trySubjects() {
        const interval$ = interval(1000).take(7);
        
        const subject = new Subject();

        let z = interval$.subscribe(subject);
        
        subject.map(value => `Observer one ${value}`).subscribe(value => {
          console.log(value);
        });


        setTimeout(() => {
          subject.map(value => `Observer two ${value}`).subscribe(value => {
             console.log(value);
          });
        }, 4000);
        
    }
    
    ngOnDestroy() {
        console.log( 'onDestroy' );
        this.stopWatchingBlockHeaders();
        //        this.subWatch.unsubscribe();
        //        this.subBlocks.unsubscribe();
        //        this.subBlockService.unsubscribe();
        //        this.filtr.stopWatching();
        //        this.sub.unsubscribe();
    }

    getBlocks() {
        //        this._ngZone.run(() => {
        //        this.blocks$ = this.blockService.fetchBlocks( 10 )
        //            .map( x => x.slice( 0, 4 ) );
        this.blockService.fetchBlocks( 10 )
            .map( x => x.slice( 0, 4 ).sort(( a, b ) => {
                return a < b ? -1 : 1;
            } ) )

            //            .map( x => {
            //                const y = x.splice( 1, 5 );
            //                console.log( '--------- subBlocks.length = ' + y.length );
            //                return y;
            //            } )
            //            .take( 2 )
            //            .map( x => {
            //                console.log( '--------- subBlocks.length = ' + x.length );
            //                return x;
            //            } )
            .subscribe( x => {
                this._ngZone.run(() => {

                    this.blocks = x;
                } );
                console.log( '^^^^^^^^^^^ blocks = ' + x.length );
            } );
        //            } );
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
        /*     
        web3.eth.getCoinbase(( error, success ) => {
            if ( error )
            {
                console.log( 'ERROR: getCoinbase: ' + error );
            }
            if ( success )
            {
                console.log( 'SUCCESS: getCoinbase: ' + success );
            }
        } ).then( cb => {
            return this.coinbase = cb;
        } ).then( cb => {
            return web3.eth.getBalance( cb, 'latest', ( error, success ) => {
                if ( error )
                {
                    console.log( 'ERROR: getBalance: ' + error );
                }
    //                if ( success )
    //                {
    //                    console.log( 'SUCCESS: getBalance: ' + success );
    //                }
            } ).then( balance => {
                return this.balance = balance;
            } );
        } );
    */

        //        this.balance = web3.eth.getBalance(this.coinbase);
        //        this.balanceEther = web3.fromWei(web3.eth.getBalance(web3.eth.coinbase), 'ether').toString(10);
        //        this.accounts = web3.eth.accounts;
        //        this.latestBlock = web3.eth.getBlock('latest').number; // web3.eth.defaultBlock;
        //        this.transactionsNum = web3.eth.getTransactionCount(this.coinbase);
    }

    getStats2() {
        //        const cbProm = web3.eth.getCoinbase();
        //        this.coinbase$ = fromPromise( web3.eth.getCoinbase() );

        web3.eth.getCoinbase()
            .then( account => {
                this._ngZone.run(() => {
                    this.coinbase$ = of( account );
                } );
                console.log( account );
                return web3.eth.getBalance( account, 'latest' );
            } )
            .then( balance => {
                this._ngZone.run(() => {
                    this.balance = balance;
                    this.balanceEther = web3.utils.fromWei( balance, 'ether' );
                } );
                console.log( balance );
            } );

        web3.eth.getCoinbase()
            .then( account => {
                return web3.eth.getTransactionCount( account );
            } )
            .then( txNum => {
                this._ngZone.run(() => {
                    this.transactionsNum = txNum;
                } );
                console.log( txNum );
            } );




        //        web3.eth.getBalance( web3.eth.getCoinbase(), 'latest' )
        //
        //        fromPromise( web3.eth.getCoinbase() )
        //            .map( cb => {
        //                this._ngZone.run(() => {
        //                    this.coinbase$ = of( cb );
        //                } );
        //                return cb;
        //            } )
        //            .flatMap( cb => {
        //                console.log( 'coinbase = ' + cb );
        //                //                const balProm = ;
        //                //                const k = fromPromise( balProm );
        //                let prom = fromPromise( web3.eth.getBalance( cb, 'latest' ) ).map( x => { return x } );
        //                return prom;
        //            } )
        //            .map(( bal ) => {
        //                console.log( 'balance = ' + bal );
        //                this._ngZone.run(() => {
        //                    //                    this.balance = of( bal );
        //                    //                    this.balanceEther = web3.utils.fromWei( bal, 'ether' );
        //                } );
        //                return of( bal );
        //            } ).subscribe();
        //
        web3.eth.getAccounts().then(( value ) => {
            this._ngZone.run(() => {
                this.accounts = value;
            } );
            //            return value;
        } );

        web3.eth.getBlock( 'latest' ).then(( value ) => {
            this._ngZone.run(() => {
                this.latestBlock = value.number;
            } );
            //            return value;
        } );


        web3.eth.getAccounts().then(( value ) => {
            this._ngZone.run(() => {
                this.accounts = value;
            } );
            //            return value;
        } );

        //        this.balance = web3.eth.getBalance(this.coinbase);
        //        this.balanceEther = web3.fromWei(web3.eth.getBalance(web3.eth.coinbase), 'ether').toString(10);
        //        this.accounts = web3.eth.accounts;
        //        this.latestBlock = web3.eth.getBlock('latest').number; // web3.eth.defaultBlock;
        //        this.transactionsNum = web3.eth.getTransactionCount(this.coinbase);
    }


}
