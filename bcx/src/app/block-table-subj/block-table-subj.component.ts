import { Component, OnInit, ViewEncapsulation, OnDestroy, AfterViewInit, DoCheck, Input, ViewChild, NgZone } from '@angular/core';
import { Block } from '../block';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BlockServiceTs } from '../block.service';
import { Subject } from 'rxjs/Subject';
//import * as $ from 'jquery';
//import 'datatables.net';
import { DataTableDirective } from 'angular-datatables';

import 'rxjs/add/operator/delay';

@Component( {
    selector: 'app-block-table-subj',
    templateUrl: './block-table-subj.component.html',
    styleUrls: ['./block-table-subj.component.css']
} )


export class BlockTableSubjComponent implements OnInit, OnDestroy {

    blocks: Block[] = [];
    subBlocks: any;
    subSubject: any;
    public tableWidget: any;
    localBlocks: Block[];

    @ViewChild( DataTableDirective )
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();


    constructor( private blockService: BlockServiceTs, private _ngZone: NgZone ) { }

    ngOnInit() {
        this.dtTrigger.next();
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10
        };
        
//        this.subscribeToSubj();
//        this.populateBlocks();
        
        this.third();

    }

    third() {
        this.localBlocks = [];
        const mySubject = new Subject<Block>();
        this.blockService.fillBlocks( 100 ).subscribe(mySubject);
        
        mySubject
        .subscribe( 
                block => {
                    this.localBlocks.push( block );
                },
                error => {
                    console.log('xxxxxxxxxxxx Block-table-subj.component subscribe ERROR: ' + error);  
                },
                () => {
                    this._ngZone.run(() => {
                      this.blocks = this.localBlocks;
                    } );
                    this.rerender();
                }
        );
        
    }
    
    
    populateBlocks() {
        this.subBlocks = this.blockService.fillBlocks( 20 ).subscribe();
        //        this.subBlocks = this.blockService.populateBlocks( 1000 ).subscribe();//
    }

    subscribeToSubj() {
        this.localBlocks = [];
        this.subSubject = this.blockService.blocksAnnounced$.subscribe( 
                block => {
                    this.localBlocks.push( block );
                },
                error => {
                    console.log('xxxxxxxxxxxx Block-table-subj.component subscribe ERROR: ' + error);  
                },
                () => {
                    this._ngZone.run(() => {
                      this.blocks = this.localBlocks;
                    } );
                    this.rerender();
                }
        );
    }

    ngOnDestroy() {
//        this.subBlocks.unsubscribe();
//        this.subSubject.unsubscribe();
    }

    ngAfterViewInit() {
//        this.dtTrigger.next();
    }

    rerender(): void {
        if ( this.dtElement && this.dtElement.dtInstance ) {
            this.dtElement.dtInstance.then(( dtInstance: DataTables.Api ) => {
                // Destroy the table first
                dtInstance.destroy();
                // Call the dtTrigger to rerender again
                this.dtTrigger.next();
            } );
        } else {
            this.dtTrigger.next();

        }
    }

}
