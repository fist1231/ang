import { Component, OnInit } from '@angular/core';
import { Block } from '../block';
import { BlockService } from '../block.service';
import Web3 from 'web3';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

const web3 = new Web3( new Web3.providers.HttpProvider( "http://localhost:9595" ) );

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    
    blocks: Block[] = [];

    constructor(private blockService: BlockService) { }

    ngOnInit() {
        this.getBlocks();
        this.watchBlocks().subscribe(blocks => this.blocks = blocks);
    }
    
    getBlocks(): void {
        this.blockService.getBlocks().subscribe(blocks => this.blocks = blocks.slice(1, 5));
    }    

    watchBlocks(): Observable<Block[]> {
        web3.eth.filter('latest').watch(x => {
            this.blockService.getBlocks().subscribe(blocks => this.blocks = blocks.slice(1, 5));
        });       
        return of(this.blocks);
    }  


}
