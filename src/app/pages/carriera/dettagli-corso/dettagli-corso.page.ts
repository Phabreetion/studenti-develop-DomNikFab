import {Component, OnInit} from '@angular/core';
import {GlobalDataService} from '../../../services/global-data.service';
import {HttpService} from '../../../services/http.service';
import {ActivatedRoute} from '@angular/router';
import {PianoDiStudioService} from '../../../services/piano-di-studio.service';
import {Corso} from '../../../models/Corso';
import {AppelliService} from '../../../services/appelli.service';
import {AppelloDisponibile} from '../../../models/AppelloDisponibile';
import {SyncService} from '../../../services/sync.service';
import {fileBufferToString} from '@angular-devkit/core/src/virtual-fs/host';

@Component({
    selector: 'app-dettagli-corso',
    templateUrl: './dettagli-corso.page.html',
    styleUrls: ['./dettagli-corso.page.scss'],
})
export class DettagliCorsoPage implements OnInit {

    //query string
    ad_id_corso: number;

    //corsi
    corso: Corso;
    corsiMap: Map<number, Corso>;
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
        //@TODO -> ridurre complessità di caricamento della pagina

        this.http.getConnected();

        this.ad_id_corso = Number(this.route.snapshot.paramMap.get('id'));

        this.pianoDiStudioService.getCorso(this.ad_id_corso).then((corso) => {
            this.corso = corso;

            this.pianoDiStudioService.getCorsiAsMap().then( (data) => {
                this.corsiMap = data;
                console.log(this.corsiMap);

                this.pianoDiStudioService.getPropedeuticita(this.corso.AD_ID, this.corsiMap).then( (corsiProp) => {
                    this.corsiPropedeutici = corsiProp;
                });
            });
        });

        this.appelliService.hasAlmenoUnAppello(this.ad_id_corso).then(value => { this.corsoConAppelli = value; });

        this.sync.getJson(18, null, false ).then((data) => {

            const files = data[0];

            let i = 0;
            while (i < files.length && files[i].AD_ID != this.ad_id_corso) {
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
        this.globalData.goTo(this, ['/appelli/', this.corso.AD_ID], 'forward', false);
    }

    goToMaterialeDidattico() {
        this.globalData.goTo(this, ['/materiale-didattico/', this.corso.AD_ID], 'forward', false);
    }


    goToDettagliCorso(corsoPropedeutico) {

        this.globalData.goTo(this, ['/esame/', corsoPropedeutico.AD_ID], 'forward', false);
        //this.globalData.esame = esame;
        //this.globalData.goTo(this.currentPage, '/esame', 'forward', false); //
    }



}
