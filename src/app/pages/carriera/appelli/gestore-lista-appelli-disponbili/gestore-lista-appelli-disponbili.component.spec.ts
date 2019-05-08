import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestoreListaAppelliDisponbiliComponent } from './gestore-lista-appelli-disponbili.component';

describe('GestoreListaAppelliDisponbiliComponent', () => {
  let component: GestoreListaAppelliDisponbiliComponent;
  let fixture: ComponentFixture<GestoreListaAppelliDisponbiliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestoreListaAppelliDisponbiliComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestoreListaAppelliDisponbiliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
