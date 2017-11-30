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
    blocks$: Observable<Block[]>;
    subBlocks: any;
    //    public tableWidget: any;

    @ViewChild( DataTableDirective )
    dtElementO: DataTableDirective;
    dtOptionsO: DataTables.Settings = {};
    dtTriggerO: Subject<any> = new Subject();


    constructor( private blockService: BlockServiceTs, private _ngZone: NgZone ) { }


    ngOnInit() {
        this.dtOptionsO = {
            pagingType: 'full_numbers',
            pageLength: 25
        };

        //      this.blocks$ = this.blockService.populateBlocks( 50 ).map(this.reload());
        //      this.dtTrigger.next();
        this.subBlocks = this.blockService.fetchBlocks( 50 ).subscribe( x => {
            this._ngZone.run(() => {
                this.blocks = x;
            } );
            console.log( '++++++++++++++++++++++++++> t ' + JSON.stringify( x ) );
            //            this.dtTriggerO.next();

            //            return x;
            console.log( '++++++++++++++++++++++++++> this.dtTrigger.next() ' );
            //                    this.rerender(2);
            //            this.rerender(2);
            //            this.dtTriggerO.complete();
        } );

        //        console.log( '............. before delay');
        //        setTimeout(() => {
        ////            this.dtTrigger.next();
        ////            this.dtTrigger.subscribe(x => this.rerender());
        //            this.rerender()
        //        }, 5000);
        //        
        //        console.log( '............. after delay');


    }

    reload() {
        this.dtTriggerO.next();
        console.log( '++++++++++++++++++++++++++> reload dtInstance = ' + this.dtElementO.dtInstance );
        //        this.rerender(3);
    }

    ngOnDestroy(): void {

        //        this.subBlocks.unsubscribe();
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
        console.log( '############# pass: ' + x );
        console.log( '++++++++++++++++++++++++++> rerender = ' + this.dtTriggerO );
        console.log( '++++++++++++++++++++++++++> rerender dtElementO = ' + this.dtElementO );
        console.log( '++++++++++++++++++++++++++> rerender dtInstance = ' + this.dtElementO.dtInstance );
        //        if(this.dtElementO.dtInstance)
        //        this.dtElementO.dtInstance.then(( dtInstance: DataTables.Api ) => {
        if ( this.dtElementO.dtInstance )
        {
            this.dtElementO.dtInstance.then(( dtInstance: DataTables.Api ) => {
                console.log( '%%%%%%%%%%%%%%%%%%%% after:' + JSON.stringify( dtInstance.data() ) );
                //                  // Destroy the table first
                dtInstance.destroy();
                //                          dtInstance.ajax.reload();
                //                          console.log('%%%%%%%%%%%%%%%%%%%% after:' + JSON.stringify(dtInstance));
                //                  dtInstance.destroy();
                //                  // Call the dtTrigger to rerender again
                this.dtTriggerO.next();
            } );

        } else
        {
            this.dtTriggerO.next();

        }
    }

    //    displayToConsole(): void {
    //        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => console.log(dtInstance));
    //    }


}
