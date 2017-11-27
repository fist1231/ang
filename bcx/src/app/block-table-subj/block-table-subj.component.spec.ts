import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockTableSubjComponent } from './block-table-subj.component';

describe('BlockTableSubjComponent', () => {
  let component: BlockTableSubjComponent;
  let fixture: ComponentFixture<BlockTableSubjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockTableSubjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockTableSubjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
