import { TestBed } from '@angular/core/testing';

import { NutrientsService } from './nutrients.service';

describe('NutrientsService', () => {
  let service: NutrientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutrientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
