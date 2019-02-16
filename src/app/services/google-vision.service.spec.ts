import { TestBed } from '@angular/core/testing';

import { GoogleVisionService } from './google-vision.service';

describe('GoogleVisionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleVisionService = TestBed.get(GoogleVisionService);
    expect(service).toBeTruthy();
  });
});
