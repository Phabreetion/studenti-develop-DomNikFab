import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestoreListaCorsiComponent } from './gestore-lista-corsi.component';

describe('GestoreListaCorsiComponent', () => {
  let component: GestoreListaCorsiComponent;
  let fixture: ComponentFixture<GestoreListaCorsiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestoreListaCorsiComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestoreListaCorsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
