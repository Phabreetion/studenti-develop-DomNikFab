import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PianoDiStudioPage } from './piano-di-studio.page';

describe('PianoDiStudioPage', () => {
  let component: PianoDiStudioPage;
  let fixture: ComponentFixture<PianoDiStudioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PianoDiStudioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PianoDiStudioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
