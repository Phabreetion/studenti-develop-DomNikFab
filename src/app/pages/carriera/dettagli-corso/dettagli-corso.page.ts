import {Component, OnInit} from '@angular/core';
import {GlobalDataService} from '../../../services/global-data.service';
import {HttpService} from '../../../services/http.service';
import {ActivatedRoute} from '@angular/router';
import {PianoDiStudioService} from '../../../services/piano-di-studio.service';
import {Corso} from '../../../models/Corso';
import {AppelliService} from '../../../services/appelli.service';
import {AppelloDisponibile} from '../../../models/AppelloDisponibile';
import {SyncService} from '../../../services/sync.service';

@Component({
    selector: 'app-dettagli-corso',
    templateUrl: './dettagli-corso.page.html',
    styleUrls: ['./dettagli-corso.page.scss'],
})
export class DettagliCorsoPage implements OnInit {

    //query string
    ad_id_corso: string;
    nome_corso: string;

    //corsi
    corso: Corso;
    corsiMap: Map<string, Corso>;
    corsiPropedeutici: Corso[];

    //appelli
    appelli: AppelloDisponibile[];


    isClickContenuti: boolean;
    isClickTesti: boolean;
    isClickObiettiviFormativi: boolean;


    //booleano per dire se ci sono appelli disponibili
    corsoConAppelli: boolean;
    corsoConMateriale: boolean;


    constructor(
        public globalData: GlobalDataService,
        public http: HttpService,
        private route: ActivatedRoute,
        private pianoDiStudioService: PianoDiStudioService,
        private appelliService: AppelliService,
        private sync: SyncService) {
        this.corsoConAppelli = false;
    }

    async ngOnInit() {
        this.http.getConnected();


        this.ad_id_corso = this.route.snapshot.paramMap.get('ad_id');
        if (this.globalData.corso) {
            this.corso = this.globalData.corso;
            console.log('a');
        } else {
            this.corso = await this.pianoDiStudioService.getCorso(this.ad_id_corso);
        }


        this.ad_id_corso = this.corso.AD_ID;
        this.nome_corso = this.corso.DESCRIZIONE;


        this.pianoDiStudioService.getCorsiAsMap().then( (data) => {
            this.corsiMap = data;
            console.log(this.corsiMap);

            this.pianoDiStudioService.getPropedeuticita(this.corso.AD_ID, this.corsiMap).then( (corsiProp) => {
                this.corsiPropedeutici = corsiProp;
            });
        });


        this.appelliService.hasAlmenoUnAppello(this.ad_id_corso).then(value => { this.corsoConAppelli = value; });

        this.sync.getJson(18, null, false ).then((data) => {

            const files = data[0];

            let i = 0;
            while (i < files.length && files[i].AD_ID !== this.ad_id_corso) {
                i++;
            }

            this.corsoConMateriale = i < files.length;

        });
    }


    public mostraContenuti() {
        if (this.isClickContenuti === true) {
            this.isClickContenuti = false;
            return this.isClickContenuti;
        } else {
            this.isClickContenuti = true;
            return this.isClickContenuti;
        }
    }

    public mostraTesti() {
        if (this.isClickTesti === true) {
            this.isClickTesti = false;
            return this.isClickTesti;
        } else {
            this.isClickTesti = true;
            return this.isClickTesti;
        }
    }

    public mostraObiettiviFormativi() {
        if (this.isClickObiettiviFormativi === true) {
            this.isClickObiettiviFormativi = false;
            return this.isClickObiettiviFormativi;
        } else {
            this.isClickObiettiviFormativi = true;
            return this.isClickObiettiviFormativi;
        }
    }


    goToAppelli() {
        this.globalData.goTo(this, ['/appelli/', this.corso.AD_ID, this.corso.DESCRIZIONE], 'forward', false);
    }

    goToMaterialeDidattico() {
        this.globalData.goTo(this, ['/materiale-didattico/', this.corso.AD_ID, this.corso.DESCRIZIONE], 'forward', false);
    }

    goToDettagliCorso(corso: Corso) {
        this.globalData.corso = this.corsiMap.get(corso.AD_ID);
        this.globalData.goTo(this, '/dettagli-corso', 'forward', false);
    }

}
