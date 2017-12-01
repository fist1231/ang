import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Block } from '../block';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-block-preview',
  templateUrl: './block-detail.component.html',
  styleUrls: ['./block-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BlockPreviewComponent implements OnInit {
    
    @Input() block: Block;
    @Input() blockPreview: Block;
    bloc: Block;

    constructor(private location: Location) { }

    ngOnInit() {
    }
    
    goBack(): void {
        this.location.back();
    }
}
