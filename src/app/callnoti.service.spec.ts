import { TestBed, inject } from '@angular/core/testing';

import { CallnotiService } from './callnoti.service';

describe('CallnotiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CallnotiService]
    });
  });

  it('should be created', inject([CallnotiService], (service: CallnotiService) => {
    expect(service).toBeTruthy();
  }));
});
