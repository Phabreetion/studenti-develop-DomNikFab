import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {Corso} from '../../../../../models/Corso';
import {GlobalDataService} from '../../../../../services/global-data.service';
import {FiltroPianoDiStudio} from '../../../../../models/FiltroPianoDiStudio';

@Component({
    selector: 'app-lista-corsi',
    templateUrl: './lista-corsi.component.html',
    styleUrls: ['./lista-corsi.component.scss'],
})
export class ListaCorsiComponent implements OnInit {

    corsi: Corso[];
    corsiTrovati: Corso[];

    filtro: FiltroPianoDiStudio;


    //ricerca
    @ViewChild('searchbar') searchbar: any;
    isSearchbarOpened = false;
    searchKey: string;


    constructor(
        public navParams: NavParams,
        public modalController: ModalController,
        public globalData: GlobalDataService
    ) {
        this.filtro = new FiltroPianoDiStudio();
        this.filtro.idOrdinamento = 2;
        this.searchKey = '';
    }

    ngOnInit() {
        this.corsi = this.navParams.get('corsi');
        this.filtro.ordina(this.corsi);
        this.search();
    }

    closeModal() {
        this.modalController.dismiss();
    }

    goToMaterialeDidattico(corso: Corso) {
        this.globalData.goTo(this, ['materiale-didattico/', corso.AD_ID,  corso.DESCRIZIONE], 'forward', false);
        this.modalController.dismiss();
    }

    toogleSearchbar() {
        this.isSearchbarOpened = !this.isSearchbarOpened;

        if (this.isSearchbarOpened) {
            setTimeout(() => {
                this.searchbar.setFocus();
            }, 150);
        }

        this.searchKey = '';
        this.search();
    }

    search() {
        if (this.searchKey !== '') {
            const searchKeyLowered = this.searchKey.toLowerCase();
            this.corsiTrovati = this.corsi.filter(corsi => corsi.DESCRIZIONE.toLowerCase().search(searchKeyLowered) >= 0);
        } else {
            this.corsiTrovati = this.corsi;
        }
    }
}
