import { Component, OnInit, ViewEncapsulation, OnDestroy, AfterViewInit, DoCheck, Input, ViewChild  } from '@angular/core';
import { Block } from '../block';
import { Observable } from 'rxjs/Observable';
import { BlockServiceTs } from '../block.service';
import {Subject} from 'rxjs/Subject';
//import * as $ from 'jquery';
//import 'datatables.net';
import { DataTableDirective } from 'angular-datatables';

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
    
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();

    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;


    constructor( private blockService: BlockServiceTs ) { }

    ngOnInit() {
        this.dtOptions = {
                pagingType: 'full_numbers',
                pageLength: 10
         };
        this.subscribeToSubj();
        this.populateBlocks();
        
    }

    populateBlocks() {
        this.subBlocks = this.blockService.fillBlocks( 50 ).subscribe();
//        this.subBlocks = this.blockService.populateBlocks( 1000 ).subscribe();//
    }
    
    subscribeToSubj() {
        this.subSubject = this.blockService.blocksAnnounced$.subscribe(block => { 
            this.blocks.push(block);
            this.rerender();
//            this.dtTrigger.next(block);
        });
    }

    addJTable() {
        const exampleId: any = $( '#table_id' );
        this.tableWidget = exampleId.DataTable( {
            select: true
        } );
        
        console.log('+++++++++++ this.exampleId' + JSON.stringify(exampleId));
        
    }
    
    ngOnDestroy() {
        this.subBlocks.unsubscribe();
        this.subSubject.unsubscribe();
    }

    ngAfterViewInit() {
//        this.addJTable();
        this.dtTrigger.next();
    }

    rerender(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          // Destroy the table first
          dtInstance.destroy();
          // Call the dtTrigger to rerender again
          this.dtTrigger.next();
        });
      }

    
    ngDoCheck() {
       console.log('+++++++++++ arr xchanged');
//       this.dtTrigger.next();
//        console.log('~~~~~~~~~~~~~~~~~ this.tableWidget = ' + JSON.stringify(this.tableWidget));
//        if(this.tableWidget != null) {
//            this.tableWidget.draw();
//        }
//        this.addJTable();
        //throw new Error( "Method not implemented." );
    }
    
}
