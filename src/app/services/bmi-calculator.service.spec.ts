import { TestBed, inject } from '@angular/core/testing';

import { BmiCalculatorService } from './bmi-calculator.service';

describe('BmiCalculatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BmiCalculatorService]
    });
  });

  it('should be created', inject([BmiCalculatorService], (service: BmiCalculatorService) => {
    expect(service).toBeTruthy();
  }));
});
