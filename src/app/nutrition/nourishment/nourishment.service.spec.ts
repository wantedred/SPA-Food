import { TestBed } from '@angular/core/testing';

import { NourishmentService } from './nourishment.service';

describe('NourishmentService', () => {
  let service: NourishmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NourishmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
