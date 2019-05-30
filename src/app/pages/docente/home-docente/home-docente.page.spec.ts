import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDocentePage } from './home-docente.page';

describe('HomeDocentePage', () => {
  let component: HomeDocentePage;
  let fixture: ComponentFixture<HomeDocentePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeDocentePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDocentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
