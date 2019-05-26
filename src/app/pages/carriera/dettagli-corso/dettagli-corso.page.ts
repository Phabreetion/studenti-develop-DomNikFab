import {Component, OnInit} from '@angular/core';
import {GlobalDataService} from '../../../services/global-data.service';
import {HttpService} from '../../../services/http.service';
import {ActivatedRoute} from '@angular/router';
import {PianoDiStudioService} from '../../../services/piano-di-studio.service';
import {Corso} from '../../../models/Corso';
import {AppelliService} from '../../../services/appelli.service';
import {AppelloDisponibile} from '../../../models/AppelloDisponibile';

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


    public isClickContenuti: boolean;
    public isClickTesti: boolean;
    public isClickObiettiviFormativi: boolean;


    //booleano per dire se ci sono appelli disponibili
    corsoConAppelli: boolean;


    constructor(
        public globalData: GlobalDataService,
        public http: HttpService,
        private route: ActivatedRoute,
        private pianoDiStudioService: PianoDiStudioService,
        private appelliService: AppelliService) {
        this.corsoConAppelli = false;
    }

    async ngOnInit() {
        //@TODO -> ridurre complessità di caricamento della pagina

        this.http.getConnected();

        this.ad_id_corso = Number(this.route.snapshot.paramMap.get('id'));


        //this.corso = this.globalData.corso;
        const corsoPromise = this.pianoDiStudioService.getCorso(this.ad_id_corso);
        const corsiMapPromise = this.pianoDiStudioService.getCorsiAsMap();
        const appelliPromise = this.appelliService.getAppelliDisponibili();
        //const filePromise = this.sync.getJson()

        Promise.all([corsoPromise, corsiMapPromise, appelliPromise]).then(
            (data) => {
                this.corso = data[0];
                this.corsiMap = data[1];
                this.appelli = data[2];

                this.pianoDiStudioService.getPropedeuticita(this.ad_id_corso, this.corsiMap).then((data1) => {
                    this.corsiPropedeutici = data1;
                });

                //cerco un appello con ad_id uguale a quello passato
                let i = 0;
                while (i < this.appelli.length && this.appelli[i].ad_id != this.ad_id_corso) {
                    i++;
                }

                this.corsoConAppelli = i < this.appelli.length;
            }
        );
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
