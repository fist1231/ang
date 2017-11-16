import { Component, EventEmitter, Input, Output, OnChanges, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import Web3 from 'web3';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

const web3 = new Web3( new Web3.providers.HttpProvider( "http://localhost:9595" ) );

@Component( {
  selector: 'tsx-component',
  template: `
      Transactions:
      <div *ngIf="txs">
          <div style="overflow: auto; width:900px; height:200px; border:1px solid black;">
                <div class="message-ballon" *ngFor="let tx of txs; let i = index">
                    <p style="white-space: nowrap;"> [{{i + 1}}] {{tx}} </p>
                 </div>
          </div>
      </div>

    
   `
})

export class TsxComponent implements OnChanges, OnInit {

    coinbase = web3.eth.coinbase;

    @Input() txs: Array<string>;
    
  
    ngOnChanges() {
    }
  

    ngOnInit() {
    }
    
    constructor() {
    }    

  
}
