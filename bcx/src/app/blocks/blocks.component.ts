import { Component, OnInit, OnDestroy, Input, NgZone, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Block } from '../block';
import { BlockServiceTs } from '../block.service';
import Web3 from 'web3';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subject } from "rxjs/Subject";

//const web3 = new Web3( new Web3.providers.HttpProvider( 'http://localhost:9595' ) );
const web3 = new Web3( Web3.givenProvider || "ws://localhost:9595" );


@Component( {
    selector: 'app-blocks',
    templateUrl: './blocks.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./blocks.component.css'],
} )


export class BlocksComponent implements OnInit, OnDestroy {

    blocks: Block[] = [];
    subWatch: any;
    subBlocks: any;
    subBlockService: any;

    selectedBlock: Block;
    subscription;
    blocS: string = "here we go ...";
    clicks$: Observable<any>;
    @ViewChild('bttn') button;

    private clicksFrom2 = new Subject<string>();
    
    
    //    filtr = web3.eth.filter('latest');
    //    filtr = web3.eth.subscribe('latest');

    constructor( private blockService: BlockServiceTs, private _ngZone: NgZone, private cd: ChangeDetectorRef ) { }

    ngOnInit() {
        this.listenClicks();
        this.listenClicks2();
        
        console.log( 'OnInit' );
        this.getBlocks();
        this.watchBlockHeaders();
        //        this.subWatch = this.watchBlocks().subscribe(blocks => this.blocks = blocks);
    }

    ngOnDestroy() {
        this.stopWatchingBlockHeaders();
        console.log( 'onDestroy' );
        //        this.subWatch.unsubscribe();
        //        this.subBlocks.unsubscribe();
        //        this.subBlockService.unsubscribe();
        //        this.filtr.stopWatching();
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
            this.getBlocks();

        } );
    }

    getBlocks() {
        this.subBlocks = this.blockService.fetchBlocks( 10 )
            .map( x => x.sort(( a, b ) => {
                return a < b ? -1 : 1;
            } ) )
            .subscribe( 
                    x => {
                        console.log( '0000 getBlocks next ' + this.blocks.length );
                        this._ngZone.run(() => {
                            this.blocks = x;
                        })
                    },
                    error => {
                        console.log( 'getBlocks Error: ' + error );
                    },
                    () => {
//                        console.log( '0000 getBlocks complete: blocks.length  = ' + this.blocks.length );
                        this._ngZone.run(() => {
                            this.cd.markForCheck();
                        })
                    }
                );
    }

    //    watchBlocks(): Observable<Block[]> {
    watchBlocks() {
        //        this.filtr.watch(x => {
        //            this.subBlockService = this.blockService.getBlocks().subscribe(blocks => {
        //                this.blocks = blocks;
        //            },
        //                err => {
        //                    console.log(err);
        //                    // closeLoadingBar();
        //                },
        //                () => {
        //                    console.log('Completed watchBlock');
        //                    //                   this.subBlockServ
        //
        //                    // do whatever you want
        //                    // closeLoadingBar()
        //                }
        //            );
        //        });
        //        return of(this.blocks);
    }

    onSelect( block: Block ): void {
        this.selectedBlock = block;
        this.blocS = block.id.toString();
    }
    
    goChange() {
        this.blocS = "changed now";
    }

    listenClicks() {
        
        let i=0;
        
        this.clicks$ = fromEvent(this.button.nativeElement, 'click');
        
        this.clicks$.subscribe(clk => {
            i++;
            console.log('clicked: ' + clk);
            console.log('from event click: ' + i);
            this.blocS = "from event click: " + i;
            this.cd.markForCheck();
        }
        );
        
    }
    
    click2() {
        this.clicksFrom2.next('clicked');
    }
    
    listenClicks2() {
        let i=0;
        this.clicksFrom2.subscribe(clk => {
            i++;
            console.log('clicked: ' + clk);
            console.log('from event click: ' + i);
            this.blocS = "from event click: " + i;
            this.cd.markForCheck();
        }
        );
    }
    
}
