import {Component, OnInit} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {GlobalDataService} from '../../../services/global-data.service';


@Component({
    selector: 'app-page-dettagli-utente',
    templateUrl: 'dettagli-utente.html',
})

export class DettagliUtentePage implements OnInit {

    currentPage = '/dettagli-utente';
    matId: number;
    username: string;
    nome: string;
    cognome: string;
    matricola: number;
    token: string;
    cds: string;
    cdsId: number;
    dipartimento: string;
    dipId: number;


    constructor(
        public modalCtrl: ModalController,
        public globalData: GlobalDataService,
        private storage: Storage) {
    }

    onGoBack()  {
        this.globalData.goTo(this.currentPage, '/home','back', false);
    }


    ngOnInit() {
        const username = this.storage.get('username');
        const nome = this.storage.get('nome');
        const cognome = this.storage.get('cognome');
        const matricola = this.storage.get('matricola');
        const token = this.storage.get('token');
        const cds = this.storage.get('nome_cds');
        const cdsId = this.storage.get('cdsID');
        const dipartimento = this.storage.get('nome_dip');
        const dipId = this.storage.get('dipID');
        const matId = this.storage.get('matid');

        Promise.all([username, nome, cognome, matricola, token, cds, dipartimento, matId, cdsId, dipId]).then(data => {
            this.username = data[0];
            this.nome = data[1];
            this.cognome = data[2];
            this.matricola = data[3];
            this.token = data[4];
            this.cds = data[5];
            this.dipartimento = data[6];
            this.matId = data[7];
            this.cdsId = data[8];
            this.dipId = data[9];
            if (!this.token) {
                this.modalCtrl.dismiss();
                this.globalData.goTo(this.currentPage, '/login','root', false);
            }
        });
    }

}
