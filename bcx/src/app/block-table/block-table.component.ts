import { Component, OnInit, ViewEncapsulation, OnDestroy, AfterViewInit, ViewChild, NgZone } from '@angular/core';
import { Block } from '../block';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BlockServiceTs } from '../block.service';
import { Subject } from 'rxjs/Subject';
//import * as $ from 'jquery';
//import 'datatables.net';
import { DataTableDirective } from 'angular-datatables';
import 'rxjs/add/operator/map';

// declare var $:JQueryStatic;


@Component( {
    selector: 'app-block-table',
    templateUrl: './block-table.component.html',
    styleUrls: [
        './block-table.component.css'
    ],
    encapsulation: ViewEncapsulation.None
} )

export class BlockTableComponent implements OnInit, OnDestroy {

    blocks: Block[] = [];
    localBlocks: Block[] = [];
    blocks$: Observable<Block[]>;
    subBlocks: any;
    //    public tableWidget: any;

    @ViewChild( DataTableDirective )
    dtElementO: DataTableDirective;
    dtOptionsO: DataTables.Settings = {};
    dtTriggerO: Subject<any> = new Subject();


    constructor( private blockService: BlockServiceTs, private _ngZone: NgZone ) { }


    ngOnInit() {
        this.dtTriggerO.next();
        this.dtOptionsO = {
            pagingType: 'full_numbers',
            pageLength: 25
        };
        this.getBlocks();
    }

    
    
    getBlocks() {
        this.localBlocks = []; 
        this.subBlocks = this.blockService.fetchBlocks( 100 ).subscribe( 
                next => {
                    this.localBlocks = next;
                },
                error => {
                  console.log('Block-table.component subscribe ERROR: ' + error);  
                },
                () => {
                    this._ngZone.run(() => {
                      this.blocks = this.localBlocks;
                    } );
                    this.rerender(3);
                    console.log( '++++++++++++++++++++++++++> this.blocks onComplete: ' + this.blocks.length );
                }
            );
    }
    
    ngOnDestroy(): void {
        this.subBlocks.unsubscribe();
    }

    ngAfterViewInit(): void {


        //        this.dtTriggerO.next();
        //        console.log('++++++++++++++++++++++++++> ngAfterViewInit dtTriggerO = ' + this.dtTriggerO);
        //        this.rerender(1);
        //        console.log('++++++++++++++++++++++++++> ngAfterViewInit = ' + this.displayToConsole());

        //        const exampleId: any = $( '#table_id' );
        //        this.tableWidget = exampleId.DataTable( {
        //            select: true
        //        } );


        //        $('#table_id').DataTable();
        //        $(document).ready(function() {
        //            $('#table_id').DataTable();
        //        });
    }

    rerender( x ): void {
        if ( this.dtElementO.dtInstance ) {
            this.dtElementO.dtInstance.then(( dtInstance: DataTables.Api ) => {
                dtInstance.destroy();
                this.dtTriggerO.next();
            } );

        } else {
            this.dtTriggerO.next();

        }
    }

}
