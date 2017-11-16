import { Component, EventEmitter, Input, Output, NgZone, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import Web3 from 'web3';
const web3 = new Web3( new Web3.providers.HttpProvider( "http://localhost:9595" ) );



@Component({
    selector: 'myc-root',
    templateUrl: './myc.component.html'
  })


export class MycComponent {
    name: string;
    counter = 0;
    coinbase = web3.eth.coinbase;
    balance = web3.eth.getBalance(this.coinbase);
//    transactions = 

    @Input()  newBalance: number;
    @Output() newBalanceUpdated = new EventEmitter();

    constructor() {
      this.name = 'Max'
      this.newBalanceUpdated.emit(this.newBalance);

      console.log('Hey');
//      setInterval(() => {
//          this.counter = this.counter+1;
//          console.log('Inside-' + this.counter);
//      }, 1000);
      console.log('Hi' + this.counter);
    
    }
    sayMyName() {
      console.log('My name is', this.name);
    }
    handleNewBalanceChange($event) {
        this.name = web3.eth.getBalance(this.coinbase);
    }


  }
