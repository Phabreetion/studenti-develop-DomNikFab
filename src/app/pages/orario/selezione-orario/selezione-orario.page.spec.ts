import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelezioneOrarioPage } from './selezione-orario.page';

describe('SelezioneOrarioPage', () => {
  let component: SelezioneOrarioPage;
  let fixture: ComponentFixture<SelezioneOrarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelezioneOrarioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelezioneOrarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
