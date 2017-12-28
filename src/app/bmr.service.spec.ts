import { TestBed, inject } from '@angular/core/testing';

import { BmrService } from './bmr.service';

describe('BmrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BmrService]
    });
  });

  it('should be created', inject([BmrService], (service: BmrService) => {
    expect(service).toBeTruthy();
  }));
});
