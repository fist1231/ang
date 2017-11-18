import { Injectable, OnDestroy } from '@angular/core';
import { Block } from './block';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import Web3 from 'web3';

const web3 = new Web3( new Web3.providers.HttpProvider( "http://localhost:9595" ) );


@Injectable()
export class BlockService implements OnDestroy {

    coinbase = web3.eth.coinbase;
    accounts = web3.eth.accounts;
    BLOCKS: Block[] = [];

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
    
}
