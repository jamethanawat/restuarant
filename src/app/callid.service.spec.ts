import { TestBed, inject } from '@angular/core/testing';

import { CallidService } from './callid.service';

describe('CallidService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CallidService]
    });
  });

  it('should be created', inject([CallidService], (service: CallidService) => {
    expect(service).toBeTruthy();
  }));
});
