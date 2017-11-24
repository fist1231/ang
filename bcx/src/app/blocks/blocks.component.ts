import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Block } from '../block';
import { BlockServiceTs } from '../block.service';
import Web3 from 'web3';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

const web3 = new Web3( new Web3.providers.HttpProvider( "http://localhost:9595" ) );

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.css']
})

export class BlocksComponent implements OnInit, OnDestroy {
    
    blocks: Block[] = [];
    subWatch: any;
    subBlocks: any;
    subBlockService: any;
    
    selectedBlock: Block;

    filtr = web3.eth.filter('latest');

    constructor(private blockService: BlockServiceTs) { }

    ngOnInit() {
        console.log('OnInit');
        this.getBlocks();
        this.watchBlocks();
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
        this.subBlocks = this.blockService.getBlocks().subscribe(blocks => this.blocks = blocks);
    }  

//    watchBlocks(): Observable<Block[]> {
    watchBlocks() {
        this.filtr.watch(x => {
            this.subBlockService = this.blockService.getBlocks().subscribe(blocks => {
                this.blocks = blocks;
                },
                err => {
                    console.log(err);
                    //closeLoadingBar();
               },
               () => {
                   console.log("Completed watchBlock");
//                   this.subBlockService.unsubscribe();
                   
                    //do whatever you want
                    //closeLoadingBar()
               }
            );
        });
//        return of(this.blocks);
    }  

    onSelect(block: Block): void {
        this.selectedBlock = block;
    }
}
