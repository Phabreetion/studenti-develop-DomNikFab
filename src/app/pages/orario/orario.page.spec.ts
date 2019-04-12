import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrarioPage } from './orario.page';

describe('OrarioPage', () => {
  let component: OrarioPage;
  let fixture: ComponentFixture<OrarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrarioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
