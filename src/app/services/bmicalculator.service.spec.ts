import { TestBed, inject } from '@angular/core/testing';

import { BmicalculatorService } from './bmicalculator.service';

describe('BmicalculatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BmicalculatorService]
    });
  });

  it('should be created', inject([BmicalculatorService], (service: BmicalculatorService) => {
    expect(service).toBeTruthy();
  }));
});
