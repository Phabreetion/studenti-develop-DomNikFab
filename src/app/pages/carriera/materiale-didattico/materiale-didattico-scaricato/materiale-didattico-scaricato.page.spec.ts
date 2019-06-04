import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialeDidatticoScaricatoPage } from './materiale-didattico-scaricato.page';

describe('MaterialeDidatticoScaricatoPage', () => {
  let component: MaterialeDidatticoScaricatoPage;
  let fixture: ComponentFixture<MaterialeDidatticoScaricatoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialeDidatticoScaricatoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialeDidatticoScaricatoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
