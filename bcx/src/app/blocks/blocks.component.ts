import { Component, OnInit, Input } from '@angular/core';
import { Block } from '../block';
import { BlockService } from '../block.service';
import {MessageService} from '../message.service'
import Web3 from 'web3';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

const web3 = new Web3( new Web3.providers.HttpProvider( "http://localhost:9595" ) );

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.css']
})

export class BlocksComponent implements OnInit {
    
    blocks: Block[];
    
    selectedBlock: Block;

    constructor(private blockService: BlockService, private messageService: MessageService) { }

    ngOnInit() {
        this.getBlocks();
        this.watchBlocks().subscribe(blocks => this.blocks = blocks);
    }
    
    getBlocks() {
        this.blockService.getBlocks().subscribe(blocks => this.blocks = blocks);
    }  

    watchBlocks(): Observable<Block[]> {
        web3.eth.filter('latest').watch(x => {
            this.blockService.getBlocks().subscribe(blocks => this.blocks = blocks);
        });       
        return of(this.blocks);
    }  

    onSelect(block: Block): void {
        this.selectedBlock = block;
    }
}
