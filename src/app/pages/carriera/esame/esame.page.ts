import {Component, OnInit} from '@angular/core';
import {GlobalDataService} from '../../../services/global-data.service';
import {HttpService} from '../../../services/http.service';
import {SyncService} from '../../../services/sync.service';
import {ActivatedRoute} from '@angular/router';
import {PianoDiStudioService} from '../../../services/piano-di-studio.service';
import {Corso} from '../../../models/Corso';

@Component({
    selector: 'app-esame',
    templateUrl: './esame.page.html',
    styleUrls: ['./esame.page.scss'],
})
export class EsamePage implements OnInit {

    srcPage: string;
    corso: Corso;
    private libretto: any[];
    private codiceEsame: number;
    private corsiPropedeutici: Corso[];

    constructor(
        public globalData: GlobalDataService,
        public http: HttpService,
        private activatedRoute: ActivatedRoute,
        private pianoDiStudioService: PianoDiStudioService) {
    }

    async ngOnInit() {
        this.srcPage = this.globalData.srcPage;
        //this.corso = this.globalData.corso;
        this.http.getConnected();
        this.codiceEsame = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

        this.corso = await this.pianoDiStudioService.getCorso(this.codiceEsame);
        this.corsiPropedeutici = await this.pianoDiStudioService.getPropedeuticita(this.corso.AD_ID);
        console.log(this.corso);
    }

    onGoBack()  {
        this.globalData.goTo(this.globalData.srcPage, this.globalData.srcPage, 'backward', false);
    }

    asDueProfessori() {
        return !!(this.corso.COGNOME && this.corso.NOME !== ' ' && this.corso.NOME);
    }





}
