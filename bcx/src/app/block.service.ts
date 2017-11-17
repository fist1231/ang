import { Injectable } from '@angular/core';
import { Block } from './block';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import Web3 from 'web3';

const web3 = new Web3( new Web3.providers.HttpProvider( "http://localhost:9595" ) );


@Injectable()
export class BlockService {

    coinbase = web3.eth.coinbase;
    accounts = web3.eth.accounts;
    BLOCKS: Block[] = [];

    constructor(private messageService: MessageService) { }
    
    getBlocks1(): Observable<Block[]> {
        this.messageService.add('BlockService: fetched blocks');
        return of(this.BLOCKS);
    }    

    getBlock(id: number): Observable<Block> {
        // Todo: send the message _after_ fetching the block
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
            console.log("string = " + JSON.stringify(blk));
            console.log("number = " + parsedObj.number);
            console.log("miner = " + parsedObj.miner);

            
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
    
    getBlocks(): Observable<Block[]> {
        

        this.populateBlocks(10).subscribe(blks => this.BLOCKS = blks);
//        this.populateBlocks(5);
        
//        web3.eth.filter('latest').watch(x => {
//            this.populateBlocks(10);
//         });
        
/*        web3.eth.filter('latest').watch(x => {
            blk = web3.eth.getBlock();
            console.log("blocknum:" + numbre);
            console.log("cbn1:" + this.currentBlock);
            this.currentBlock = numbre;
            console.log("cbn2:" + this.currentBlock);
        });       
*/
          return of(this.BLOCKS);
//        return of(web3.eth.getBlock('latest').number);
    }
    
}
