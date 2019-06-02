import {Component, OnInit, ViewChild} from '@angular/core';
import {GlobalDataService} from '../../../services/global-data.service';
import {MaterialeDidatticoDbService} from '../../../services/materiale-didattico-db-service';

@Component({
    selector: 'app-materiale-didattico-figo',
    templateUrl: './materiale-didattico-figo.page.html',
    styleUrls: ['./materiale-didattico-figo.page.scss'],
})
export class MaterialeDidatticoFigoPage implements OnInit {

    public allegatiScaricati: Array<any>;

    public MOCK_FILES = [
        {id: 12, filename: 'iannolli.pdf', estenzione: 'pdf'},
        {id: 13, filename: 'scroKING.zip',  estenzione: 'zip'},
        {id: 14, filename: 'nella Fattispecie.pptx', estenzione: 'pptx'},
        {id: 15, filename: 'Giovanni offre.pdf', estenzione: 'pdf'},
        {id: 16, filename: 'Pesche deuticità.pdf', estenzione: 'pdf'},
    ];


    //ricerca
    @ViewChild('searchbar') searchbar: any;
    isSearchbarOpened = false;
    searchKey: string;

    constructor(
        public globalData: GlobalDataService,
        public matDidatticoService: MaterialeDidatticoDbService
    ) {
    }

    ngOnInit() {
        if (this.matDidatticoService.isPiattaformaSupportata()) {
            this.matDidatticoService.getTuttiAllegatiScaricatiFromDB().then((allegati) => {
                this.allegatiScaricati = allegati;
            });
        } else {
            this.allegatiScaricati = this.MOCK_FILES;
        }
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
        //@TODO
    }
}
