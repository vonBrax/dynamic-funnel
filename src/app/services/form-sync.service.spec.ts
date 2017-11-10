import { TestBed, inject } from '@angular/core/testing';

import { FormSyncService } from './form-sync.service';

describe('FormSyncService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormSyncService]
    });
  });

  it('should be created', inject([FormSyncService], (service: FormSyncService) => {
    expect(service).toBeTruthy();
  }));
});
