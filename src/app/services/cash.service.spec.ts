import { TestBed } from '@angular/core/testing';

import { CashService } from './cash.service';

describe('CashService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CashService = TestBed.get(CashService);
    expect(service).toBeTruthy();
  });
});
