import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialeDidatticoFigoPage } from './materiale-didattico-figo.page';

describe('MaterialeDidatticoFigoPage', () => {
  let component: MaterialeDidatticoFigoPage;
  let fixture: ComponentFixture<MaterialeDidatticoFigoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialeDidatticoFigoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialeDidatticoFigoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
