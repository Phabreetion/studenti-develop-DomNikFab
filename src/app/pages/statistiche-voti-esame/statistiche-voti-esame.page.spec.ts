import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticheVotiEsamePage } from './statistiche-voti-esame.page';

describe('StatisticheVotiEsamePage', () => {
    let component: StatisticheVotiEsamePage;
    let fixture: ComponentFixture<StatisticheVotiEsamePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ StatisticheVotiEsamePage ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StatisticheVotiEsamePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
