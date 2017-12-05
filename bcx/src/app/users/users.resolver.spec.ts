import { TestBed, inject } from '@angular/core/testing';

import { UsersResolver } from './users.resolver';

describe('UsersResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersResolver]
    });
  });

  it('should be created', inject([UsersResolver], (service: UsersResolver) => {
    expect(service).toBeTruthy();
  }));
});
