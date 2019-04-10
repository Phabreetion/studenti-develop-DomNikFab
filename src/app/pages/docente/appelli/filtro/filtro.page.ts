import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from '@ionic/angular';

@Component({
    selector: 'app-page-filtro',
    templateUrl: 'filtro.page.html'
})


export class FiltroPage implements  OnInit {
    page: any;
    monthsName = 'Gennaio, Febbraio, Marzo, Aprile, Maggio, Giugno, Luglio, Agosto, Settembre, Ottobre, Novembre, Dicembre';
    monthShortNames = 'Gen, Feb, Mar, Apr, Mag, Giu, Lug, Ago, Set, Ott, Nov, Dic';

    constructor(private navCtrl: NavController, private navParams: NavParams) {
    }

    ngOnInit() {
        this.page = this.navParams.get('page');
    }

    applicaFiltri() {
        this.page.setFiltro();
    }

    todayString(): string {
        const today = new Date();
        const dd = today.getDate();
        const mm = today.getMonth() + 1; // January is 0!
        let mmStr = '' + mm;
        let ddStr = '' + dd;
        const yyyy = today.getFullYear();

        if (dd < 10) {
            ddStr = '0' + dd;
        }
        if (mm < 10) {
            mmStr = '0' + mm;
        }
        // console.log(yyyy + '-' + mmStr + '-' + ddStr);
        return yyyy + '-' + mmStr + '-' + ddStr;
    }


    filtraDaOggi(slidingItem) {
        this.page.dal = this.todayString();
        slidingItem.close();
    }
    azzeraFiltraDa(slidingItem) {
        this.page.dal = '';
        slidingItem.close();
    }

    filtraAOggi(slidingItem) {
        this.page.al = this.todayString();
        slidingItem.close();
    }
    azzeraFiltraA(slidingItem) {
        this.page.al = '';
        slidingItem.close();
    }

    reset() {
        this.page.prenotati = false;
        this.page.verbalizzati = false;
        this.page.nonVerbalizzati = false;
        this.page.futuri = false;
        this.page.presidente = false;
        this.page.searchTerm = '';
        this.page.dal = '';
        this.page.al = '';
    }

    chiudi() {
        this.page.dismissPopover();
        // this.navCtrl.pop();
    }
}
