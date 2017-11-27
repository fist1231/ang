import {Component, OnInit, ViewEncapsulation, OnDestroy, AfterViewInit} from '@angular/core';
import {Block} from '../block';
import {Observable} from 'rxjs/Observable';
import {BlockServiceTs} from '../block.service';
import * as $ from 'jquery';
import 'datatables.net';

// declare var $:JQueryStatic;


@Component({
    selector: 'app-block-table',
    templateUrl: './block-table.component.html',
    styleUrls: [
        './block-table.component.css'
    ],
    encapsulation: ViewEncapsulation.None
})

export class BlockTableComponent implements OnInit, OnDestroy, AfterViewInit {

    blocks: Block[] = [];
    subBlocks: any;
    public tableWidget: any;



    constructor(private blockService: BlockServiceTs) {}

    ngOnInit() {

        this.subBlocks = this.blockService.populateBlocks(50).subscribe(x => this.blocks = x);

    }


    ngOnDestroy(): void {

        this.subBlocks.unsubscribe();
    }

    ngAfterViewInit(): void {

        const exampleId: any = $('#table_id');
        this.tableWidget = exampleId.DataTable({
            select: true
        });


        //        $('#table_id').DataTable();
        //        $(document).ready(function() {
        //            $('#table_id').DataTable();
        //        });
    }

}
