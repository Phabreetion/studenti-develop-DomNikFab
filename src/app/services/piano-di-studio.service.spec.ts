import { TestBed } from '@angular/core/testing';

import { PianoDiStudioService } from './piano-di-studio.service';

describe('PianoDiStudioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PianoDiStudioService = TestBed.get(PianoDiStudioService);
    expect(service).toBeTruthy();
  });
});
