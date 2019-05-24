import {Component, OnInit} from '@angular/core';
import {GlobalDataService} from '../../../services/global-data.service';
import {HttpService} from '../../../services/http.service';
import {ActivatedRoute} from '@angular/router';
import {PianoDiStudioService} from '../../../services/piano-di-studio.service';
import {Corso} from '../../../models/Corso';

@Component({
    selector: 'app-dettagli-corso',
    templateUrl: './dettagli-corso.page.html',
    styleUrls: ['./dettagli-corso.page.scss'],
})
export class DettagliCorsoPage implements OnInit {

    srcPage: string;
    corso: Corso;
    private codiceEsame: number;
    private corsiPropedeutici: Corso[];

    public isClickContenuti: boolean;
    public isClickTesti: boolean;
    public isClickObiettiviFormativi: boolean;


    constructor(
        public globalData: GlobalDataService,
        public http: HttpService,
        private route: ActivatedRoute,
        private pianoDiStudioService: PianoDiStudioService) {
    }

    async ngOnInit() {
        this.srcPage = this.globalData.srcPage;
        //this.corso = this.globalData.corso;
        this.http.getConnected();
        this.codiceEsame = parseInt(this.route.snapshot.paramMap.get('id'));

        this.corso = await this.pianoDiStudioService.getCorso(this.codiceEsame);
        this.corsiPropedeutici = await this.pianoDiStudioService.getPropedeuticita(this.corso.AD_ID);
        console.log(this.corso);
    }

    asDueProfessori() {
        return !!(this.corso.COGNOME && this.corso.NOME !== ' ' && this.corso.NOME);
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
        this.globalData.goTo(this, ['/appelli/', this.corso.CODICE], 'forward', false);
    }

    goToMaterialeDidattico() {
        this.globalData.goTo(this, ['/materiale-didattico/', this.corso.AD_ID], 'forward', false);
    }
}
