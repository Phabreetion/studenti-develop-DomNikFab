import {Component, OnInit} from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-page-filtro-insegnamenti',
  templateUrl: 'filtro-insegnamenti.html',
})
export class FiltroInsegnamentiPage implements OnInit {
    private page: any;

    constructor(private navParams: NavParams) {
    }

    ngOnInit() {
        this.page = this.navParams.get('page');
    }

    applicaFiltri() {
        this.page.setFiltro();
    }

    cancelSearchTerm() {
        this.page.searchTerm = '';
        this.applicaFiltri();
    }

    reset() {
        this.page.searchTerm = '';
        this.page.filtraAnnoCorrente = false;
        this.applicaFiltri();
    }

    chiudi() {
        this.page.dismissPopover();
    }

}
