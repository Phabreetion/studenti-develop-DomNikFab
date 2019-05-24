import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DettagliCorsoPage } from './dettagli-corso.page';

describe('DettagliCorsoPage', () => {
  let component: DettagliCorsoPage;
  let fixture: ComponentFixture<DettagliCorsoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DettagliCorsoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DettagliCorsoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
