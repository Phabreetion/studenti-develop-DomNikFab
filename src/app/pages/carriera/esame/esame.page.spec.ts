import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsamePage } from './esame.page';

describe('EsamePage', () => {
  let component: EsamePage;
  let fixture: ComponentFixture<EsamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsamePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
