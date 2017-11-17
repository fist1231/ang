import { Component, EventEmitter, Input, Output, OnChanges, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import Web3 from 'web3';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


const web3 = new Web3( new Web3.providers.HttpProvider( "http://localhost:9595" ) );


@Component( {
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

    title = 'app1';
    coinbase = web3.eth.coinbase;
    balance = web3.eth.getBalance( this.coinbase );
    accounts = web3.eth.accounts;
//    block = web3.eth.getBlock('latest').number; //web3.eth.defaultBlock;
    _newBalance = web3.eth.getBalance( this.coinbase );
    newBalance = 100;
    transactionsNum = web3.eth.getTransactionCount( this.coinbase );
    
    static currBlock: number;
    currentBlock: number;
    currentTrans: Array<string>;
    trans: Array<string>;
    
    
//    @Input() block: number;
//    @Output() blockChange = new EventEmitter<number>();
//    @Output() onBlockChange = new EventEmitter<number>();
//    
//    @Input() public data: string;
    
//    get rowData(): string {
//      console.debug('getting row data');
//      return this.data;
//    }
//    
    ngOnChanges(): void {
//        this.txs = this.getTransactionsByAccount(this.coinbase,null,null);
        console.debug('change');
      }

    onBlockChange(value: number) {
//        this.block = value;
        // do things that you wanted to do in ngOnChanges
      }
    
    
    ngOnInit() {
//        this.getBlockNum();
        
//        web3.eth.getBlock('latest').subscribe(currentBlock => this.currentBlock = currentBlock);    
//      web3.eth.getBlock('latest').subscribe(currentBlock => this.currentBlock = currentBlock);    
        
        
        
        this.getBlockNumber().subscribe(currentBlock => currentBlock = currentBlock); //web3.eth.defaultBlock;
        this.getTrans().subscribe(trans => this.trans = trans);
//        this.getTrans();
/*
        setInterval(() => {
            this.getBlockNumber().subscribe(currentBlock => this.currentBlock = currentBlock); //web3.eth.defaultBlock;
//            this.onBlockChange.emit(this.block);
//            this.txs = this.getTransactionsByAccount(this.coinbase,null,null);
            console.log("interval block:" + this.currentBlock);
        }, 1000);

        setInterval(() => {
            this.getTrans().subscribe(currentTrans => this.currentTrans = currentTrans);
//            console.log("interval block:" + this.txs);
        }, 50000);
        
*/    }
    
    getTrans(): Observable<Array<string>> {
        
        web3.eth.filter('latest').watch(x => {
            console.log("start fetching trans");
            //this.currentTrans = this.getTransactionsByAccount(this.coinbase,null,null);
            this.getTsx().subscribe(currentTrans => this.currentTrans = currentTrans);
            console.log("transactions fetch done");
        });       
        return of(this.currentTrans);
        
        
//        return of(this.getTransactionsByAccount(this.coinbase,null,null));
    }
  
    getTsx(): Observable<Array<string>> {
        var tsx = this.getTransactionsByAccount(this.coinbase,null,null);
        return of(tsx);
    }
    
//    get blockData(): number {
//        console.debug('getting row data');
//        return this.block;
//      }
    
    constructor() {
//      this.txs = this.getTransactionsByAccount(this.coinbase,null,null);
      
      
      
      
//      this.newBalance = web3.eth.getBalance( this.coinbase );
//      this.newBalanceChange.emit( this.newBalance );
  }


    getBlockNum() {
        
//        web3.web3ClientVersion().getBlock().number.subscribe(currentBlock => this.currentBlock = currentBlock);
    }

    getBlockNumber(): Observable<number> {
        
        var numbre;
        web3.eth.filter('latest').watch(x => {
//            var wwwe = web3.eth.getBalance(web3.eth.coinbase).toNumber();
//            console.log("interval block:" + wwwe);
            numbre = web3.eth.getBlock('latest').number;
            console.log("blocknum:" + numbre);
            console.log("cbn1:" + this.currentBlock);
            this.currentBlock = numbre;
            console.log("cbn2:" + this.currentBlock);
        });       
        return of(this.currentBlock);
//        return of(web3.eth.getBlock('latest').number);
    }
    
    changeValue() {
//        this.block = this.block = web3.eth.getBlock('latest').number;
//        this.toggledChange.emit(this.block);
     }
//    transactions = 10;
    

/* For contract addresses o   
 * 
 
    filter = web3.eth.filter({fromBlock:1, toBlock: 'latest', address: this.coinbase});
    aa = this.filter.get(function (error, result) {
      if(!error){
        var info = web3.eth.getBlock(result , function(error, result){
           if(!error){
             var trans = web3.eth.getTransaction(result.transactions[0], function(error,result){
               if(!error){
                 var str = web3.toAscii(result.input,);
                 console.log(str);
               }else{
                  console.log(error);
               }
             });
           }else{
              console.log(error);
           }
         });
     }else{
        console.log(error);
      }
    });    

*/
    
//    handleOnBlockChange( $event ) {
//        this.txs = this.getTransactionsByAccount(this.coinbase,null,null);
//        this.onBlockChange.emit(this.block);
//        console.log("Using onBlockChange: " + this.block);
//    }
    
    
    
    getTransactionsByAccount(myaccount, startBlockNumber, endBlockNumber) {
        var trans = new Array();
        if (endBlockNumber == null) {
          endBlockNumber = web3.eth.blockNumber;
          console.log("Using endBlockNumber: " + endBlockNumber);
        }
        if (startBlockNumber == null) {
          startBlockNumber = endBlockNumber - 100;
          console.log("Using startBlockNumber: " + startBlockNumber);
        }
        console.log("Searching for transactions to/from account \"" + myaccount + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);

        for (var i = startBlockNumber; i <= endBlockNumber; i++) {
          if (i % 1000 == 0) {
            console.log("Searching block " + i);
          }
          var block = web3.eth.getBlock(i, true);
          if (block != null && block.transactions != null) {
            block.transactions.forEach( function(e) {
              if (myaccount == "*" || myaccount == e.from || myaccount == e.to) {
                  
                  trans.push("tx hash="+e.hash+"; txIdx="+e.transactionIndex+"; value="+e.value+"\n");
                  
/*                console.log("  tx hash          : " + e.hash + "\n"
                  + "   nonce           : " + e.nonce + "\n"
                  + "   blockHash       : " + e.blockHash + "\n"
                  + "   blockNumber     : " + e.blockNumber + "\n"
                  + "   transactionIndex: " + e.transactionIndex + "\n"
                  + "   from            : " + e.from + "\n" 
                  + "   to              : " + e.to + "\n"
                  + "   value           : " + e.value + "\n"
                  + "   time            : " + block.timestamp + " " + new Date(block.timestamp * 1000).toUTCString() + "\n"
                  + "   gasPrice        : " + e.gasPrice + "\n"
                  + "   gas             : " + e.gas + "\n"
                  + "   input           : " + e.input);
*/              }
            })
          }
        }
        return trans;
      }    
    
    

//    @Input() newBalance: number;
//    @Output() newBalanceChange = new EventEmitter<number>();


//    well( $scope, $interval ) {
//        this.newBalance = web3.eth.getBalance( this.coinbase );
//        this.newBalanceChange.emit( this.newBalance );
//        //      $scope.balance = 1;
//        //      $scope.$watch('balance', function() {
//        //          alert('hey, balance has changed!');
//        //      });
//    }

//    ngOnInit( $scope ) {
        //      this.well();
        //      this.newBalance = web3.eth.getBalance(this.coinbase);
        //      this.newBalanceChange.emit(this.newBalance);

//    }

//    handleNewBalanceChange( $event ) {
//        this.newBalance = web3.eth.getBalance( this.coinbase );
//    }


//    ngOnChanges( changes: SimpleChanges ) {
//        //      alert('wtf');
//        //      const bal: SimpleChange = changes.newBalance;
//        //      console.log('prev value: ', bal.previousValue);
//        //      console.log('got name: ', bal.currentValue);
//        //      this.newBalance = web3.eth.getBalance(this.coinbase);
//        //      this.balance = web3.eth.getBalance(this.coinbase);
//        //      this._newBalance = bal.currentValue;
//    }

 /*
    processWithinAngularZone() {
        this.balance = web3.eth.getBalance( this.coinbase );
        //this._increaseProgress(() => console.log('Inside Done!'));
    }
*/

}

