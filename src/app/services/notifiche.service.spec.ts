import { TestBed, inject } from '@angular/core/testing';

import { NotificheService } from './notifiche.service';

describe('NotificheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificheService]
    });
  });

  it('should be created', inject([NotificheService], (service: NotificheService) => {
    expect(service).toBeTruthy();
  }));
});
