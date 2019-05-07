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
    esame: Corso;
    private libretto: any[];
    private codiceEsame: string;

    constructor(
        public globalData: GlobalDataService,
        public http: HttpService,
        private activatedRoute: ActivatedRoute,
        private pianoDiStudioService: PianoDiStudioService) {
    }

    ngOnInit() {
        this.srcPage = this.globalData.srcPage;
        //this.esame = this.globalData.esame;
        this.http.getConnected();
        this.codiceEsame = this.activatedRoute.snapshot.paramMap.get('id');

        this.a();
    }

    a() {
        this.pianoDiStudioService.getLibretto().then(
            (data) => {
                this.libretto = data[0];
                this.esame = this.libretto.find( esame => esame.CODICE === this.codiceEsame);
                this.esame = Corso.toObj(this.esame);
            }
        );
    }

    onGoBack()  {
        this.globalData.goTo(this.globalData.srcPage, this.globalData.srcPage, 'backward', false);
    }

    asDueProfessori() {

        if (this.esame.COGNOME && this.esame.NOME !== ' ' && this.esame.NOME) {

            return true;

        }

        return false;

    }





}
