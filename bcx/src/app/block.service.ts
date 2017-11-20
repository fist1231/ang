import { Injectable, OnDestroy } from '@angular/core';
import { Block } from './block';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import Web3 from 'web3';
import { Tx }  from './tx';
import { Subject }    from 'rxjs/Subject';


const web3 = new Web3( new Web3.providers.HttpProvider( "http://localhost:9595" ) );


@Injectable()
export class BlockService implements OnDestroy {

    coinbase = web3.eth.coinbase;
    accounts = web3.eth.accounts;
    BLOCKS: Block[] = [];
    transactions: Tx[] = [];
    
    // Observable string sources
    txSource = new Subject<Tx[]>();
    
    txAnnounced$ = this.txSource.asObservable();

    

    subBlocks: any;
    
    constructor(private messageService: MessageService) { }
    
    ngOnDestroy() {
        console.log('onDestroy');
//        this.subBlocks.unsubscribe();
    }
    
    getBlocks1(): Observable<Block[]> {
        this.messageService.add('BlockService: fetched blocks');
        return of(this.BLOCKS);
    }    

    getBlock(id: number): Observable<Block> {
        // Todo: send the message _after_ fetching the block
        console.log("BLOCKS size = " + this.BLOCKS.length);
        this.messageService.add(`BlockService: fetched block id=${id}`);
        return of(this.BLOCKS.find(blk => blk.id === id));
    }

    
    populateBlocks(numberOfBlocks: number): Observable<Block[]> {

        var localBlocks = [];
        var blk: object;
        var parsedObj;
        
        for (var i=0; i < numberOfBlocks; i++) {
            blk = web3.eth.getBlock(web3.eth.blockNumber - i);
            console.log("Fetched block: " + (web3.eth.blockNumber - i));
            
            parsedObj =  JSON.parse(JSON.stringify(blk));
            //console.log("string = " + JSON.stringify(blk));
            console.log("number = " + parsedObj.number);
            //console.log("miner = " + parsedObj.miner);

            
            localBlocks.push({ id: parsedObj.number, 
                miner: parsedObj.miner, 
                difficulty: parsedObj.difficulty, 
                gasLimit: parsedObj.gasLimit,
                gasUsed: parsedObj.gasUsed,
                hash: parsedObj.hash,
                nonce: parsedObj.nonce,
                size: parsedObj.size,
                timestamp: parsedObj.timestamp,
                totalDifficulty: parsedObj.totalDifficulty,
                transactions: parsedObj.transactions
            });
            
            
            
//            web3.eth.getBlock(web3.eth.blockNumber - i, currentBlock => {
//                console.log("Fetched block: " + (web3.eth.blockNumber - i));
//                this.BLOCKS.push({ id: (web3.eth.blockNumber - i), name: ('blk #' + i)});
//            });
        }
        
        return of(localBlocks);
        
    }

    
    fetchBlocks(numberOfBlocks: number): Block[] {

        var localBlocks = [];
        var blk: object;
        var parsedObj;
        
        for (var i=0; i < numberOfBlocks; i++) {
            blk = web3.eth.getBlock(web3.eth.blockNumber - i);
            console.log("Fetched block: " + (web3.eth.blockNumber - i));
            
            parsedObj =  JSON.parse(JSON.stringify(blk));
            //console.log("string = " + JSON.stringify(blk));
            console.log("number = " + parsedObj.number);
             localBlocks.push({ id: parsedObj.number, 
                miner: parsedObj.miner, 
                difficulty: parsedObj.difficulty, 
                gasLimit: parsedObj.gasLimit,
                gasUsed: parsedObj.gasUsed,
                hash: parsedObj.hash,
                nonce: parsedObj.nonce,
                size: parsedObj.size,
                timestamp: parsedObj.timestamp,
                totalDifficulty: parsedObj.totalDifficulty,
                transactions: parsedObj.transactions
            });
        }
        this.BLOCKS = localBlocks;
        return localBlocks;
    }

    getBlocksStream(): Observable<Block[]> {
        var count = 0;
        var localBlocks = [];
//        web3.eth.filter('latest').watch(x => {
            localBlocks = this.fetchBlocks(10);
            console.log("inside getBlocksStream iteration: " + (count++) + "; blocksSize: " + localBlocks.length);
//            this.BLOCKS = localBlocks;
//        });    
        
        console.log("localBlocks getBlocksStream = " + localBlocks.length);
        
        return of(localBlocks);
    }

    
    getBlocks(): Observable<Block[]> {
        var localBlocks = [];
        localBlocks = this.fetchBlocks(10);
//        this.BLOCKS = localBlocks;

        console.log("localBlocks getBlocks = " + localBlocks.length);
        
        return of(localBlocks);
    }
    
    getTransactions(account): Observable<Tx[]> {
//        var tsx = this.getTransactionsByAccount(account, 1, null);
//        this.getTransactionsByAccount(account, 1, null).subscribe(txs => this.transactions = txs);
        return of(this.transactions);
    }

    getTransactionsByBlk(id, account): Observable<Tx[]> {
        var localTrans = [];
        for (var i = 1; i <= 2000; i++) {
            if (i % 1000 == 0) {
              console.log("Searching block " + i);
            }
//            localTrans = this.getTransactionsByBlock(i);
            this.getTransactionsByBlock(i, account).subscribe(txs => localTrans = txs);
            console.log("localTrans length ======= " + localTrans.length);
        }

//      var tsx = this.getTransactionsByBlock(id);
      return of(localTrans);
  }

    getTransactionsByAccount2(myaccount: string, startBlockNumber, endBlockNumber) {
        var localTrans = [];
        var parsedObj;
        
        
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
                  parsedObj =  JSON.parse(JSON.stringify(e));
                 
//                  localTrans.push("tx hash="+e.hash+"; txIdx="+e.transactionIndex+"; value="+e.value+"\n");
                  localTrans.push({ 
                      hash: +parsedObj.hash,
                      nonce: +parsedObj.nonce,
                      blockHash: +parsedObj.blockHash,
                      blockNumber: +parsedObj.blockNumber,
                      transactionIndex: +parsedObj.transactionIndex,
                      from: +parsedObj.from,
                      to: +parsedObj.to,
                      value: +parsedObj.value,
                      gasPrice: +parsedObj.gasPrice,
                      gas: +parsedObj.gas,
                      input: +parsedObj.input
                  });
                  
                  
                console.log("  tx hash          : " + parsedObj.hash + "\n"
                  + "   nonce           : " + parsedObj.nonce + "\n"
                  + "   blockHash       : " + parsedObj.blockHash + "\n"
                  + "   blockNumber     : " + parsedObj.blockNumber + "\n"
                  + "   transactionIndex: " + parsedObj.transactionIndex + "\n"
                  + "   from            : " + parsedObj.from + "\n" 
                  + "   to              : " + parsedObj.to + "\n"
                  + "   value           : " + parsedObj.value + "\n"
                  + "   time            : " + block.timestamp + " " + new Date(block.timestamp * 1000).toUTCString() + "\n"
                  + "   gasPrice        : " + parsedObj.gasPrice + "\n"
                  + "   gas             : " + parsedObj.gas + "\n"
                  + "   input           : " + parsedObj.input);
              }
            })
          }
        }
        return localTrans;
      }    

    getTransactionsByBlock(blockNumber, myaccount): Observable<Tx[]> {
          var localTrans = [];
          var parsedObj;
    
          var block = web3.eth.getBlock(blockNumber, true, (error, block) => {
              if(!error) {
              console.log("=============> " + block.transactions.length);
                      if (block != null && block.transactions != null) {
                          parsedObj =  JSON.parse(JSON.stringify(block));
                        block.transactions.forEach( (tranz) => {
//                            parsedObj =  JSON.parse(JSON.stringify(e));
                            parsedObj =  JSON.parse(JSON.stringify(tranz));
                            
                            if (myaccount == "*" || myaccount == parsedObj.from || myaccount == parsedObj.to) {
            //              localTrans.push("tx hash="+e.hash+"; txIdx="+e.transactionIndex+"; value="+e.value+"\n");
                                console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& => " + block.transactions.length);
                                localTrans.push({ 
                                          hash: parsedObj.hash,
                                          nonce: parsedObj.nonce,
                                          blockHash: parsedObj.blockHash,
                                          blockNumber: parsedObj.blockNumber,
                                          transactionIndex: parsedObj.transactionIndex,
                                          from: parsedObj.from,
                                          to: parsedObj.to,
                                          value: parsedObj.value,
                                          gasPrice: parsedObj.gasPrice,
                                          gas: parsedObj.gas,
                                          input: parsedObj.input
                                      });
                                 this.transactions = localTrans; 
                                  
                                        console.log("  tx hash          : " + parsedObj.hash + "\n"
                                          + "   nonce           : " + parsedObj.nonce + "\n"
                                          + "   blockHash       : " + parsedObj.blockHash + "\n"
                                          + "   blockNumber     : " + parsedObj.blockNumber + "\n"
                                          + "   transactionIndex: " + parsedObj.transactionIndex + "\n"
                                          + "   from            : " + parsedObj.from + "\n" 
                                          + "   to              : " + parsedObj.to + "\n"
                                          + "   value           : " + parsedObj.value + "\n"
                            //              + "   time            : " + block.timestamp + " " + new Date(block.timestamp * 1000).toUTCString() + "\n"
                                          + "   gasPrice        : " + parsedObj.gasPrice + "\n"
                                          + "   gas             : " + parsedObj.gas + "\n"
                                          + "   input           : " + parsedObj.input);
                                        
                                        console.log("=============> " + localTrans);
        //                                this.txSource.next(localTrans);
                            }
                        });
                        this.txSource.next(localTrans);
                      }
              }
               });

          return of(localTrans);
      }    

}
