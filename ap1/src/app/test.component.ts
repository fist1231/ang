import { Component, EventEmitter, Input, Output, OnChanges, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import Web3 from 'web3';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

const web3 = new Web3( new Web3.providers.HttpProvider( "http://localhost:9595" ) );

@Component( {
  selector: 'test-component',
  template: `
      <div *ngIf="block">
          <label>{{block}}</label>
      </div>
   `
})

export class TestComponent implements OnInit {
    @Input() block: number;
    @Output() blockChange = new EventEmitter<number>();
    coinbase = web3.eth.coinbase;
    
  ngOnInit() {
//    this.txs = this.getTransactionsByAccount(this.coinbase,null,null);
    
//    setInterval(() => {
//        this.block = web3.eth.getBlock('latest').number; //web3.eth.defaultBlock;
//        console.log("interval block:" + this.block);
//    }, 10000);
  }    
  
}
