import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TxListComponent } from './tx-list.component';

describe('TxListComponent', () => {
  let component: TxListComponent;
  let fixture: ComponentFixture<TxListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TxListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
