import {Component, OnInit} from '@angular/core';
import {GlobalDataService} from '../../../services/global-data.service';
import {MaterialeDidatticoDbService} from '../../../services/materiale-didattico-db-service';

@Component({
    selector: 'app-materiale-didattico-figo',
    templateUrl: './materiale-didattico-figo.page.html',
    styleUrls: ['./materiale-didattico-figo.page.scss'],
})
export class MaterialeDidatticoFigoPage implements OnInit {

    public allegatiScaricati: Array<any>;

    constructor(
        public globalData: GlobalDataService,
        public matDidatticoService: MaterialeDidatticoDbService
    ) {
    }

    ngOnInit() {
        this.matDidatticoService.getTuttiAllegatiScaricatiFromDB().then((allegati) => {
            this.allegatiScaricati = allegati;
        });
    }

    toogleSearchbar() {

    }
}
