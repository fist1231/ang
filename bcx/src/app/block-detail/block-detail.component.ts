import { Component, OnInit, Input } from '@angular/core';
import { Block } from '../block';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { BlockServiceTs }  from '../block.service';

@Component({
  selector: 'app-block-detail',
  templateUrl: './block-detail.component.html',
  styleUrls: ['./block-detail.component.css']
})

export class BlockDetailComponent implements OnInit {
    
    block: Block;

    constructor(private route: ActivatedRoute,
            private blockService: BlockServiceTs,
            private location: Location
    ) { }

    ngOnInit() {
        this.getBlock();
    }
    
    getBlock(): void {
        const id = +this.route.snapshot.paramMap.get('id');
        console.log('getBlock id = ' + id);
        this.blockService.getBlock(id).subscribe(blk => this.block = blk);
    }

    goBack(): void {
        this.location.back();
    }
}
