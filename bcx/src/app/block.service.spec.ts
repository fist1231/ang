import { TestBed, inject } from '@angular/core/testing';

import { BlockServiceTs } from './block.service';

describe('BlockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlockServiceTs]
    });
  });

  it('should be created', inject([BlockServiceTs], (service: BlockServiceTs) => {
    expect(service).toBeTruthy();
  }));
});
