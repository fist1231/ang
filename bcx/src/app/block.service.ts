import {Injectable, OnDestroy} from '@angular/core';
import {Block} from './block';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {from} from 'rxjs/observable/from';
import {defer} from 'rxjs/observable/defer';
import {interval} from 'rxjs/observable/interval';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {MessageService} from './message.service';
import Web3 from 'web3';
import {Tx} from './tx';
import {Subject} from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';

import {range} from 'rxjs/observable/range';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeWhile';

import {
    debounceTime, distinctUntilChanged, switchMap, flatMap
} from 'rxjs/operators';

// import {map} from 'rxjs/add/operator/map';
// import { just } from 'rxjs/observable/just';


const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9595'));


@Injectable()
export class BlockServiceTs implements OnDestroy {

    coinbase = web3.eth.coinbase;
    accounts = web3.eth.accounts;
    BLOCKS: Block[] = [];
    txs: Tx[] = [];

    // Observable string sources
    txSource = new Subject<Tx>();

    public that = this;

    txAnnounced$ = this.txSource.asObservable();



    subBlocks: any;

    constructor(private messageService: MessageService) {}

    ngOnDestroy() {
        console.log('onDestroy');
        //      this.subBlocks.unsubscribe();
    }

    getBlocks1(): Observable<Block[]> {
        this.messageService.add('BlockService: fetched blocks');
        return of(this.BLOCKS);
    }

    getBlock(id: number): Observable<Block> {
        // Todo: send the message _after_ fetching the block
        console.log('BLOCKS size = ' + this.BLOCKS.length);
        this.messageService.add(`BlockService: fetched block id=${id}`);
        return of(this.BLOCKS.find(blk => blk.id === id));
    }


    populateBlocks(numberOfBlocks: number): Observable<Block[]> {

        const localBlocks = [];
        let blk: object;
        let parsedObj;

        for (let i = 0; i < numberOfBlocks; i++) {
            blk = web3.eth.getBlock(web3.eth.blockNumber - i);
            console.log('Fetched block: ' + (web3.eth.blockNumber - i));

            parsedObj = JSON.parse(JSON.stringify(blk));
            // console.log("string = " + JSON.stringify(blk));
            console.log('number = ' + parsedObj.number);
            // console.log("miner = " + parsedObj.miner);


            localBlocks.push({
                id: parsedObj.number,
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



            //          web3.eth.getBlock(web3.eth.blockNumber - i, currentBlock => {
            //          console.log("Fetched block: " + (web3.eth.blockNumber - i));
            //          this.BLOCKS.push({ id: (web3.eth.blockNumber - i), name: ('blk #' + i)});
            //          });
        }

        return of(localBlocks);

    }


    fetchBlocks(numberOfBlocks: number): Block[] {

        const localBlocks = [];
        let blk: object;
        let parsedObj;

        for (let i = 0; i < numberOfBlocks; i++) {
            blk = web3.eth.getBlock(web3.eth.blockNumber - i);
            console.log('Fetched block: ' + (web3.eth.blockNumber - i));

            parsedObj = JSON.parse(JSON.stringify(blk));
            // console.log("string = " + JSON.stringify(blk));
            console.log('number = ' + parsedObj.number);
            localBlocks.push({
                id: parsedObj.number,
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
        let count = 0;
        let localBlocks = [];
        //      web3.eth.filter('latest').watch(x => {
        localBlocks = this.fetchBlocks(10);
        console.log('inside getBlocksStream iteration: ' + (count++) + '; blocksSize: ' + localBlocks.length);
        //      this.BLOCKS = localBlocks;
        // );

        console.log('localBlocks getBlocksStream = ' + localBlocks.length);

        return of(localBlocks);
    }


    getBlocks(): Observable<Block[]> {
        let localBlocks = [];
        localBlocks = this.fetchBlocks(10);
        //      this.BLOCKS = localB        
        console.log('localBlocks getBlocks = ' + localBlocks.length);

        return of(localBlocks);
    }

    getTransactions(account): Observable<Tx[]> {
        //      let tsx = this.getTransactionsByAccount(account, 1, null);
        //      this.getTransactionsByAccount(account, 1, null).subscribe(txs => this.transactions = txs);
        return of(this.txs);
    }


    getTransactionsByAccount2(myaccount: string, startBlockNumber, endBlockNumber) {
        const localTrans = [];
        let parsedObj;


        if (endBlockNumber == null) {
            endBlockNumber = web3.eth.blockNumber;
            console.log('Using endBlockNumber: ' + endBlockNumber);
        }
        if (startBlockNumber == null) {
            startBlockNumber = endBlockNumber - 100;
            console.log('Using startBlockNumber: ' + startBlockNumber);
        }
        console.log('Searching for transactions to/from account "' + myaccount + '" within blocks '
            + startBlockNumber + ' and ' + endBlockNumber);

        for (let i = startBlockNumber; i <= endBlockNumber; i++) {
            if (i % 1000 === 0) {
                console.log('Searching block ' + i);
            }
            const block = web3.eth.getBlock(i, true);
            if (block != null && block.transactions != null) {
                block.transactions.forEach(function(e) {
                    if (myaccount === '*' || myaccount === e.from || myaccount === e.to) {
                        parsedObj = JSON.parse(JSON.stringify(e));

                        //                      localTrans.push("tx hash="+e.hash+"; txIdx="+e.transactionIndex+"; value="+e.value+"\n");
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


                        console.log('  tx hash          : ' + parsedObj.hash + '\n'
                            + '   nonce           : ' + parsedObj.nonce + '\n'
                            + '   blockHash       : ' + parsedObj.blockHash + '\n'
                            + '   blockNumber     : ' + parsedObj.blockNumber + '\n'
                            + '   transactionIndex: ' + parsedObj.transactionIndex + '\n'
                            + '   from            : ' + parsedObj.from + '\n'
                            + '   to              : ' + parsedObj.to + '\n'
                            + '   value           : ' + parsedObj.value + '\n'
                            + '   time            : ' + block.timestamp + ' ' + new Date(block.timestamp * 1000).toUTCString() + '\n'
                            + '   gasPrice        : ' + parsedObj.gasPrice + '\n'
                            + '   gas             : ' + parsedObj.gas + '\n'
                            + '   input           : ' + parsedObj.input);
                    }
                });
            }
        }
        return localTrans;
    }



    /*    
        getTransactionsByBlk2(id, account): Observable<Tx[]> {
            let localTrans = [];
            this.txs = [];
            
            for (let i = 9001; i <= web3.eth.blockNumber; i++) {
                if (i % 1000 == 0) {
                    console.log("Searching block " + i);
                }
    //          localTrans = this.getTransactionsByBlock(i);
                this.getTransactionsByBlock(i, account).subscribe(txs => {
                    this.txs = txs;
    //              console.log('~~~~~~~~~~~~~~~~~~Received txs of size: ' + txs.length);
    //              console.log('~~~~~~~~~~~~~~~~~~~~this.transactions =  ' + this.transactions.length);
                    
                }
                );
    //          console.log("localTrans length ======= " + localTrans.length);
            }
            
    //      let tsx = this.getTransactionsByBlock(id);
            return from(localTra
    //      return of(localTrans);
    //      return of(this.transactions);
        }
    
    */
    getTransactionsByBlk(id, account): Observable<Tx[]> {
        return Observable.create(observer => {
            setTimeout(() => {

                Array.apply(null, [web3.eth.blockNumber]).fill().map((x, i) => i + 1).map(x => {
                    if (x % 500 === 0) {
                        console.log('Searching range of blocks ' + x + ' from ' + (x - 499) + ' to ' + x);
                        this.fetchTransactionsRange(x, account, (x - 499), x).subscribe(txs => this.txs = txs);
                        //                                this.fetchTransactionsRange(x,account, (x-499), x);
                    }
                    //                Array.apply(null, [10000]).fill().map((x,i)=>i+1); // [1,2,        
                    /*
                                this.getTransactionsByBlock(x,account).subscribe(txs => {
                                    this.txs = txs;
                                    console.log('~~~~~~~~~~~~~~~~~~Received txs of size: ' + txs.length);
                                    
                                });
                    */
                });

                //            Observable.return(rez);
                observer.next([Tx, Tx, Tx]);
                observer.complete();
            }, 5000);
        });

        /*            
                    setTimeout(() => {
                        Array.apply(null, [web3.eth.blockNumber]).fill().map((x,i)=>i+1)
                        .map(x => {
                            if (x % 500 == 0) {
                                console.log("Searching range of blocks " + x + " from " + (x-499) + " to " + x);
        //                        this.fetchTransactionsRange(x,account, (x-499), x).subscribe(txs => this.txs = txs);
                            }
                            Array.apply(null, [10000]).fill().map((x,i)=>i+1); // [1,2,3,4,5]
        
                
                            this.getTransactionsByBlock(x,account).subscribe(txs => {
                                this.txs = txs;
                                console.log('~~~~~~~~~~~~~~~~~~Received txs of size: ' + txs.length);
                                
                            });
                
                 );                  observer.next([Tx,Tx,Tx]);
                        observer.complete()
                      }, 5000)
                });
                
        */


        //        return this.txSource.asObservable();
    }


    fetchTransactionsRange(id, account, frm, to): Observable<any> {
        const localTrans = [];
        this.txs = [];

        //        console.log("fetchTransactionsRange from " + from + " to " + to);
        const numbers = Array.apply(null, [500]).fill().map((x, i) => i + frm); // [1,2,3,4,5]
        numbers.map(x => {
            //            console.log("Searching block " + x);
            //            this.getTransactionsByBlock(x,account);
            //            this.getTransactionsByBlock(x,account).subscribe(txs => this.txs = txs);
        });
        return this.txSource.asObservable();
    }


    getTransactionsByBlock(blockNumber, myaccount): Observable<Tx[]> {

        const blck = web3.eth.getBlock(blockNumber, true, (error, block) => {
            const localTrans: Tx[] = [];
            let parsedObj;
            let localTx;
            if (!error) {
                if (block.transactions.length > 0) {
                    console.log('tx.length for block#: ' + blockNumber + ' =============> ' + block.transactions.length);
                }
                if (block != null && block.transactions != null) {
                    console.log('block.transactions != null: *******************> ' + JSON.stringify(block.transactions));
                    parsedObj = JSON.parse(JSON.stringify(block));
                    block.transactions.forEach((tranz) => {
                        //                      parsedObj =  JSON.parse(JSON.stringify(e));
                        parsedObj = JSON.parse(JSON.stringify(tranz));

                        if (myaccount === '*' || myaccount === parsedObj.from || myaccount === parsedObj.to) {
                            //                  localTrans.push("tx hash="+e.hash+"; txIdx="+e.transactionIndex+"; value="+e.value+"\n");
                            console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& => ' + block.transactions.length);

                            localTx = {
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
                            };

                            //                           this.transactions.push(localTx);
                            localTrans.push(localTx);
                            this.txs.push(localTx);
                            // this.txSource.next(localTx);

                            console.log('  tx hash          : ' + parsedObj.hash + '\n'
                                + '   nonce           : ' + parsedObj.nonce + '\n'
                                + '   blockHash       : ' + parsedObj.blockHash + '\n'
                                + '   blockNumber     : ' + parsedObj.blockNumber + '\n'
                                + '   transactionIndex: ' + parsedObj.transactionIndex + '\n'
                                + '   from            : ' + parsedObj.from + '\n'
                                + '   to              : ' + parsedObj.to + '\n'
                                + '   value           : ' + parsedObj.value + '\n'
                                //      + "   time            : " + block.timestamp + " " 
                                // + new Date(block.timestamp * 1000).toUTCString() + "\n"
                                + '   gasPrice        : ' + parsedObj.gasPrice + '\n'
                                + '   gas             : ' + parsedObj.gas + '\n'
                                + '   input           : ' + parsedObj.input);

                            console.log('=============> ' + localTrans);
                            //                                this.txSource.next(localTrans);
                        }
                    });
                    if (localTrans.length > 0) {
                        //                      this.txSource.next(localTrans);
                        //                      this.txs.push(localTrans);
                        localTrans.map(tx => this.txSource.next(tx));
                        console.log('Sourced %%%%%%%%%%%%%%%%%> ' + localTrans);
                    }
                }
            }
        });

        return of(this.txs);
        //        return this.txSource.asObservable();
    }

    getTransactionsByBlockNumber(blockNumber, myaccount) {
        //        console.log("In the block #" + blockNumber);
        this.getTransactionsByBlock(blockNumber, myaccount);
    }


    clearRange() {
        this.txSource = new Subject<Tx>();
    }

    myTest(): Observable<any> {
        let cnt = 1;
        const delayedStream = interval(3)
            .take(web3.eth.blockNumber - cnt + 1) // end the observable after it pulses N times
            .map(function(i) {
                return cnt++;
            });
        //        return delayedS          
        const obs$ = Observable.create(observer => {
            const rng$ = range(1, web3.eth.blockNumber);
            const range$ = delayedStream.subscribe(

                x => {
                    let readyState = 0;
                    setTimeout(() => readyState = 1, 5000);

                    console.log('range to observer next #: ' + x);

                    //                        setTimeout(() => {
                    //                    console.log("range to observer next #: " + x);
                    web3.eth.getBlock(x, true, (error, block) => {
                        if (!error) {
                            if (block.transactions.length > 0) {
                                console.log('tx.length for block#: ' + x + ' =============> ' + block.transactions.length);
                                this.txSource.next(this.buildFakeTx(x, block.transactions.length));
                                observer.next(x);
                            }// t21
                        } else {
                            console.log('web3.eth.getBlock ERROR!!! ' + error);
                        }
                    });
                    //
                    //                          //                        }, 1000);

                },
                error => {
                    console.log('range$ ERROR!!! ' + error);
                }
            );

        });
        // ret

        return obs$;





        //        let rng$ = range(1, web3.eth.blockNumber);
        //        const source$ = interval(5000);
        //        
        ////        let range$ = source$.switchMap(() => rng$.map(x => {
        //        let range$ = rng$.forEach(x => {
        //            console.log("range #: " + x);
        //            if (x % 500 == 0) {
        //                this.txSource.next(this.buildFakeTx(x, 42));
        //              }
        //            web3.eth.getBlock(x, true, (error, block) => {
        //                if(!error) {
        //                    if(block.transactions.length > 0) {
        //                        console.log("tx.length for block#: " + x + " =============> " + block.transactions.length);
        //                        this.txSource.next(this.buildFakeTx(x, block.transactions.length));
        //                    }
        //                }
        //            });
        //            
        //            
        //        });
        //        return this.txSource;

        /*
                return Observable.create( observer => {
                  let rng$ = range(1, web3.eth.blockNumber);
                  
                  rng$.map(x => {
                      let z= x*101;
                  }).do(x => console.log("In the block #" + x));
                  
                  for (let i = 1; i <= web3.eth.blockNumber; i++) {
                    setTimeout(() => {
        //              console.log("In fo" + i);
                     }, 2000);
                  }
                  
                  observer.next(this.buildFakeTx(777, 24));
                  this.txSource.next(this.buildFakeTx(888, 42));
                  observer.complete();
              }
                  );
                
        *///        


        /*
                return Observable.create( observer => {
        
                    let subject = new Subject<any>();
        //            const source$ = interval(5000);
                  
                    let ob1$ = range(1, web3.eth.blockNumber).map(x => {
        //                 subject.next(x);
                         return x;
                     });
        
                     ob1$.subscribe(x => {
                            console.log("subscribe + " + x);
        //                    setTimeout(() => {
                                web3.eth.getBlock(x, true, (error, block) => {
                                    if(!error) {
                                        if(block.transactions.length > 0) {
                                    console.log("tx.length for block#: " + x + " =============> " + block.transactions.length);
                                            this.txSource.next(this.buildFakeTx(x, block.transactions.length));
                                            subject.next(block.transactions.length);
                                        }
                                    }
                                });
        //                    }, 2000);
                     
                      });
                });
                
        */
    }


    fetchTxs(id, account): Observable<any> {
        //        return this.myTest();
        return this.myTest2(account); // filter
    }

    buildFakeTx(hash: number, num: number): Tx {

        return {
            hash: hash,
            nonce: num,
            blockHash: 0,
            blockNumber: 0,
            transactionIndex: 0,
            from: 0,
            to: 0,
            value: 0,
            gasPrice: 0,
            gas: 0,
            input: 0
        };

    }


    vault() {
        const subject = new Subject<any>();
        const ob2$ = Observable.create(observer => {

            const source$ = interval(5000);

            const ob1$ = source$.switchMap(() => range(1, web3.eth.blockNumber).map(x => {
                //                   subject.next(x);
                return x;
            }));

            ob1$.subscribe(x => {
                console.log('subscribe + ' + x);
                setTimeout(() => {
                    web3.eth.getBlock(x, true, (error, block) => {
                        if (!error) {
                            if (block.transactions.length > 0) {
                                console.log('tx.length for block#: ' + x + ' =============> ' + block.transactions.length);
                            }
                        }
                        subject.next(block.transactions.length);
                    });
                }, 2000);

            });


            //               ob1$.subscribe();             
            //               }).subscribe(x => {
            //                   setTimeout(() => {
            //                       web3.eth.getBlock(x, true, (error, block) => {
            //                           
            //                       });
            //                   }, 2000);
            //                       
            //               });
            observer.complete();
        });
        ob2$.subscribe();
        //        return subje        
        return subject.pipe(
            debounceTime(3000),
            distinctUntilChanged(),
            switchMap((num: number, act: number) => this.getTransactionsByBlock(num, act))
        );


        //                     }).subscribe(x => {
        //                         setTimeout(() => {
        //                             web3.eth.getBlock(x, true, (error, block) => {
        //                                 
        //                             });
        //                         }, 2000);
        //               
        //                     });


        //       let subscription = $subj.subscribe(
        //               function (x) {
        //                   console.log('Next: ' + x);
        //               },
        //               function (err) {
        //                   console.log('Error: ' + err);
        //        },
        //               function () {
        //                   console.log('Completed');
        //               });

        //       $subj.map(x => {
        //         Observable.create( observer => {
        //         
        //                 observer.next(x);
        //          observer.complete();
        //             });
        //       //      let subject = new Subject<any>();
        //       //      subject.next(x);
        //         });
        //       return subscription;

        //       .map(x => {
        //           Observable.create( observer => {
        //        
        //               observer.next(x);
        //               observer.complete();
        //           }).subscribe(x => console.log("x ======> " + x));
        ////           let subject = new Subject<any>();
        ////           subject.next(x);
        //       });

        //       return Observable.create( observer =>
        //               {
        //                   t 00; i <= web3.eth.blockNumber; i++) {
        //                       observer.next(i);
        //                   }
        //                   observer.complete();
        //               //or can return an Action like 
        //               //return () => Console.WriteLine("Observer has unsubscribed"); 
        //               });

        //       let subject = new ReplaySubject<any>();
        //           for (let i = 12000; i <= web3.eth.blockNumber; i++) {
        //               subject.next(i);
        //           }
        ////       subject.next("a");
        ////       subject.next("b");
        ////       subject.complete();
        ////  eout(() => {
        ////       }, 5000);
        //          
        //       return subject;        
        //       return Observable.create(function (observer) {
        //           
        //           let nums = Array.apply(null, [web3.eth.blockNumber]).fill().map((x,i)=>i+1);
        //           
        //           from(Array.apply(null, [web3.eth.blockNumbeap((x,i)=>i+1)).map(x => {
        //               observer.next(x);
        //           });
        /*            for (let i = 12000; i <= web3.eth.blockNumber; i++) {
                     if (i % 500 == 0) {
                       observer.next(i);
                     }
              if (i === web3.eth.blockNumber) {
                       setTimeout(() => {
                         observer.next(i);
                 observer.complete();
                       }, 5000);
                     }
                   }
      */          //           Array.apply(null, [web3.eth.blockNumber]).fill().map((x,i)=>i+1)
        //           .forEach(function(response) { observer.onNext(response); })
        //           .fail(function(jqXHR, status, error) { observer.onError(error); })
        //           .always(function() { observer.onCompleted(); });
        //         });
        /*        
             return from(
                     Array.apply(null, [web3.eth.blockNumber]).fill().map((x,i)=>i+1)
             );
             
      */
    }


    myTest2(myaccount): Observable<any> {

        console.log('$$$$$$$$$$ myTest2');
        const obs$ = Observable.create(observer => {
            let localTx;
            console.log('$$$$$$$$$$ before filter myTest2');

            //                       let filter = web3.eth.filter({fromBlock: 1, toBlock: web3.eth.blockNumber
            // , address: myaccount});
            //                       filter.get((errorF, result) => {
            //                           console.log("$$$$$$$$$$ filter result: " + result);
            //                         if(!errorF) {
            //               $$$$$$$$ filter: " + result);

            const cnt$ = interval(1).scan(x => x + 1).takeWhile(x => x <= web3.eth.blockNumber);
            cnt$.subscribe(
                x => {
                    web3.eth.getBlock(x, true, (error, block) => {
                        if (!error) {
                            if (block.transactions.length > 0) {
                                console.log('tx.length for block#: ' + x + ' =============> ' + block.transactions.length);



                                block.transactions.forEach((tranz) => {
                                    //                                               parsedObj =  JSON.parse(JSON.stringify(e));
                                    const parsedObj = JSON.parse(JSON.stringify(tranz));

                                    if (myaccount === '*' || myaccount === parsedObj.from || myaccount === parsedObj.to) {
                                        //                  localTrans.push("tx hash="+e.hash+"; txIdx="
                                        // +e.transactionIndex+"; value="+e.value+"\n");
                                        console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& => ' + block.transactions.length);

                                        localTx = {
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
                                            input: 0// parsedObj.input
                                        };

                                        //                                                    this.transactions.push(localTx);
                                        this.txSource.next(localTx);
                                        //                                                     observer.next(x);
                                        //                                                     localTrans.push(localTx);
                                        //                                                                 // this.txSource.next(localTx);

                                        console.log('  tx hash          : ' + parsedObj.hash + '\n'
                                            + '   nonce           : ' + parsedObj.nonce + '\n'
                                            + '   blockHash       : ' + parsedObj.blockHash + '\n'
                                            + '   blockNumber     : ' + parsedObj.blockNumber + '\n'
                                            + '   transactionIndex: ' + parsedObj.transactionIndex + '\n'
                                            + '   from            : ' + parsedObj.from + '\n'
                                            + '   to              : ' + parsedObj.to + '\n'
                                            + '   value           : ' + parsedObj.value + '\n'
                                            //      + "   time            : " + block.timestamp + " "
                                            // + new Date(block.timestamp * 1000).toUTCString() + "\n"
                                            + '   gasPrice        : ' + parsedObj.gasPrice + '\n'
                                            + '   gas             : ' + parsedObj.gas + '\n'
                                            + '   input           : ' + 0); // parsedObj.input);

                                        // console.log("=============> " + localTrans);
                                        // this.txSource.next(localTrans);
                                    }
                                });











                                //    this.txSource.next(this.buildFakeTx(x, block.transactions.length));
                                //       observer.next(x);
                            }// t21
                        } else {
                            console.log('web3.eth.getBlock ERROR!!! ' + error);
                        }
                    });
                    observer.next(x);
                },
                error => {// d
                    console.log('observer ERROR!!! ' + error);
                }
            );

            //                                   
        });


        // ret

        return obs$;


    }

}
