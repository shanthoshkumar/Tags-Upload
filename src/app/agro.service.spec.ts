import { TestBed, inject } from '@angular/core/testing';

import { AgroService } from './agro.service';

describe('AgroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgroService]
    });
  });

  it('should be created', inject([AgroService], (service: AgroService) => {
    expect(service).toBeTruthy();
  }));
});
