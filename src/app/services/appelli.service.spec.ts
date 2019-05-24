import { TestBed } from '@angular/core/testing';

import { AppelliService } from './appelli.service';

describe('AppelliService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppelliService = TestBed.get(AppelliService);
    expect(service).toBeTruthy();
  });
});
