import {Component, OnInit, Input} from '@angular/core';
import {Block} from '../block';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Observable} from 'rxjs/Observable';

import {BlockServiceTs} from '../block.service';

@Component({
    selector: 'app-block-detail',
    templateUrl: './block-detail.component.html',
    styleUrls: ['./block-detail.component.css']
})

export class BlockDetailComponent implements OnInit {

    block: Block;
    block$: Observable<Block>;


    //    constructor(private route: ActivatedRoute,
    //        private blockService: BlockServiceTs,
    //        private location: Location
    //  ) {}


    constructor(private route: ActivatedRoute,
        private location: Location
    ) {}


    ngOnInit() {
        this.getBlock();
    }

    getBlock(): void {

        //        this.block$ = this.route.snapshot.data['blockDetail'];
        this.block$ = this.route.data.map(x => x.blockDetail);

        //        const blk = this.route.data.subscribe((value) => {
        //            console.log('value = ' + value);
        //            console.log('block = ' + JSON.stringify(value));
        //            this.block = value.blockDetail;
        //        });


        //        const id = this.route.snapshot.paramMap.get('id');
        //        console.log('getBlock id = ' + id);
        //        this.blockService.getBlock(id).subscribe(blk => this.block = blk);
    }

    goBack(): void {
        this.location.back();
    }
}
