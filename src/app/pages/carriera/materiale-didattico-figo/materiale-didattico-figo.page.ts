import {Component, OnInit, ViewChild} from '@angular/core';
import {GlobalDataService} from '../../../services/global-data.service';
import {MaterialeDidatticoDbService} from '../../../services/materiale-didattico-db-service';
import {ModalController} from '@ionic/angular';
import {ListaCorsiComponent} from './lista-corsi/lista-corsi.component';
import {PianoDiStudioService} from '../../../services/piano-di-studio.service';
import {Corso} from '../../../models/Corso';

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
    private corsi: Corso[];

    constructor(
        public globalData: GlobalDataService,
        public matDidatticoService: MaterialeDidatticoDbService,
        public modalController: ModalController,
        public pianoDiStudioService: PianoDiStudioService
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

        this.pianoDiStudioService.getCorsi().then( corsi => {
            this.corsi = corsi;
        });
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: ListaCorsiComponent,
            componentProps: {
                'corsi': this.corsi
            }
        });

        await modal.present();
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
