import { TestBed, inject } from '@angular/core/testing';

import { SyncService } from './sync.service';
import {Market} from '@ionic-native/market';

describe('SyncService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SyncService]
    });
  });

  it('should be created', inject([SyncService], (service: SyncService) => {
    expect(service).toBeTruthy();
  }));
});
