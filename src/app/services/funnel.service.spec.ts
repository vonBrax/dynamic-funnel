import { TestBed, inject } from '@angular/core/testing';

import { FunnelService } from './funnel.service';

describe('FunnelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FunnelService]
    });
  });

  it('should be created', inject([FunnelService], (service: FunnelService) => {
    expect(service).toBeTruthy();
  }));
});
