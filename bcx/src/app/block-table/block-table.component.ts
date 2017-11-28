import { Component, OnInit, ViewEncapsulation, OnDestroy, AfterViewInit } from '@angular/core';
import { Block } from '../block';
import { Observable } from 'rxjs/Observable';
import { BlockServiceTs } from '../block.service';
import { Subject } from 'rxjs/Subject';
//import * as $ from 'jquery';
//import 'datatables.net';
import { DataTableDirective } from 'angular-datatables';

// declare var $:JQueryStatic;


@Component( {
    selector: 'app-block-table',
    templateUrl: './block-table.component.html',
    styleUrls: [
        './block-table.component.css'
    ],
    encapsulation: ViewEncapsulation.None
} )

export class BlockTableComponent implements OnInit, OnDestroy, AfterViewInit {

    blocks: Block[] = [];
    subBlocks: any;
    public tableWidget: any;

    //    dtOptions: DataTables.Settings = {};
    //    dtTrigger: Subject<any> = new Subject();


    constructor( private blockService: BlockServiceTs ) { }

    ngOnInit() {
        //        this.dtOptions = {
        //            pagingType: 'full_numbers',
        //            pageLength: 10
        //        };

        this.subBlocks = this.blockService.populateBlocks( 50 ).subscribe( x => {
            this.blocks = x;
            //            this.dtTrigger.next();
        } );

    }


    ngOnDestroy(): void {

        this.subBlocks.unsubscribe();
    }

    ngAfterViewInit(): void {


        //        const exampleId: any = $( '#table_id' );
        //        this.tableWidget = exampleId.DataTable( {
        //            select: true
        //        } );


        //        $('#table_id').DataTable();
        //        $(document).ready(function() {
        //            $('#table_id').DataTable();
        //        });
    }

}
