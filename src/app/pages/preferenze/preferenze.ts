import {Component, OnInit} from '@angular/core';
import { Storage } from '@ionic/storage';
import {AlertController} from '@ionic/angular';
import {SyncService} from '../../services/sync.service';
import {GlobalDataService} from '../../services/global-data.service';
import {NotificheService} from '../../services/notifiche.service';
import {AccountService} from '../../services/account.service';
import {HttpService} from '../../services/http.service';
import {AppVersion} from '@ionic-native/app-version/ngx';

@Component({
    selector: 'app-page-preferenze',
    templateUrl: 'preferenze.html',
})
export class PreferenzePage implements OnInit {

    currentPage = '/preferenze';

    private token: string;
    private tokenNotifiche: string;
    newsDipartimento = true;
    newsCds = true;
    newsAteneo = true;
    esamiVerbalizzati = true;
    aggiornamentiApp = true;
    graficoLegacy = true;
    includiNoMedia = false;
    connessioneLenta = true;
    httpNativo = true;
    carriera = true;
    appVersionNum = '';
    step = 20;
    android = false;

    constructor(
        public sync: SyncService,
        public http: HttpService,
        public storage: Storage,
        public appVersionProvider: AppVersion,
        public globalData: GlobalDataService,
        public notificheService: NotificheService,
        public account: AccountService,
        public alertCtrl: AlertController) {
    }

    // CONTROLLA TUTTE LE IMPOSTAZIONI PRIMA DEL CARICAMENTO DELLA PAGINA
    ngOnInit() {
        this.globalData.srcPage = '/preferenze';
        this.account.controllaAccount().then(
            (ok) => {
                this.http.getConnected();
                this.android = this.globalData.android;

                this.storage.get('token').then((value) => {
                    this.token = value;
                });

                // Prende la versione dell'app settata nel file config.xml
                this.appVersionProvider.getVersionNumber().then((value) => {
                    this.appVersionNum = value;
                });

                // CONTROLLO IMPOSTAZIONI PER NEWS DIPARTIMENTO
                this.storage.get('aggiornamentiApp').then((value) => {
                    if (value != null) {
                        this.aggiornamentiApp = value;
                    } else {
                        this.aggiornamentiApp = true;
                    }
                });

                // Usa una versione del grafico differente per evitare problemi con Android 8
                this.storage.get('graficoLegacy').then((value) => {
                    if (value != null) {
                        this.graficoLegacy = value;
                    } else {
                        this.graficoLegacy = false;
                    }
                });

                // Usa una versione del grafico differente per evitare problemi con Android 8
                this.storage.get('includiNoMedia').then((value) => {
                    if (value != null) {
                        this.includiNoMedia = value;
                    } else {
                        this.includiNoMedia = true;
                    }
                });

                // Consente di visualizzate o nascondere gli avvisi di connessione lenta
                this.storage.get('connessioneLenta').then((value) => {
                    if (value != null) {
                        this.connessioneLenta = value;
                    } else {
                        this.connessioneLenta = true;
                    }
                });

                // Consente di scegliere tra chiamate http con plugin nativo o tramite Angular
                this.storage.get('httpNativo').then((value) => {
                    if (value != null) {
                        this.httpNativo = value;
                    } else {
                        this.httpNativo = true;
                    }
                });

                // CONTROLLO IMPOSTAZIONI PER NEWS DIPARTIMENTO
                this.storage.get('newsDipartimento').then((value) => {
                    if (value != null) {
                        this.newsDipartimento = value;
                    } else {
                        this.newsDipartimento = true;
                    }
                });

                // CONTROLLO IMPOSTAZIONI PER NEWS CDS
                this.storage.get('newsCds').then((value) => {
                    if (value != null) {
                        this.newsCds = value;
                    } else {
                        this.newsCds = true;
                    }
                });

                // CONTROLLO IMPOSTAZIONI PER NEWS ANNO CORSO
                this.storage.get('newsAteneo').then((value) => {
                    if (value != null) {
                        this.newsAteneo = value;
                    } else {
                        this.newsAteneo = true;
                    }
                });

                // CONTROLLO IMPOSTAZIONI PER ESAMI APPELLI
                this.storage.get('carriera').then((value) => {
                    if (value != null) {
                        this.carriera = value;
                    } else {
                        this.carriera = true;
                    }
                });

                // CONTROLLO IMPOSTAZIONI PER ESAMI VERBALIZZATI
                this.storage.get('esamiVerbalizzati').then((value) => {
                    if (value != null) {
                        this.esamiVerbalizzati = value;
                    } else {
                        this.esamiVerbalizzati = true;
                    }
                });

                // INCREMENTO NR ELEMENTI VISUALIZZATI SU UNA SCHEDA
                this.storage.get('step').then((value) => {
                    if (value != null) {
                        this.step = value;
                    } else {
                        this.step = 20;
                    }
                });
            }, (err) => {
                this.globalData.goTo(this.currentPage, '/login', 'root', false);
            }
        );
    }

    ionViewWillLeave() {
        const storedNewsAteneo = this.storage.get('newsAteneo');
        const storedNewsDipartimento = this.storage.get('newsDipartimento');
        const storedNewsCds = this.storage.get('newsCds');
        const storedCarriera = this.storage.get('carriera');

        Promise.all([storedNewsAteneo, storedNewsDipartimento, storedNewsCds, storedCarriera ]).then(
            data => {
                //  console.log('Stored New ' + data[0] + ' ' + data[1]);
                if ((this.newsAteneo !== data[0]) ||
                    (this.newsCds !== data[1]) ||
                    (this.newsDipartimento !== data[2]) ||
                    (this.carriera !== data[3])) {
                    this.salvaPreferenze();
                }
            });
    }


    salvaPreferenze() {
        this.salvaPreferenzeLocali();

        const url = this.sync.getUrlPreferenzeNotifiche();
        // const jPref = JSON.stringify({
        //     'token': this.token,
        //     'preferenze': {
        //         'news': {
        //             'dipartimento': this.newsDipartimento,
        //             'cds': this.newsCds,
        //             'ateneo': this.newsAteneo
        //         },
        //         'carriera': this.carriera
        //     }
        // });

        const body = {
            token: this.token,
            preferenze: {
                news: {
                    dipartimento: this.newsDipartimento,
                    cds: this.newsCds,
                    ateneo: this.newsAteneo
                },
                carriera: this.carriera
            },
        };

        this.http.post(url, body).then(data => {
            // SALVA LE PREFERENZE IN LOCALE
            this.storage.set('newsDipartimento', this.newsDipartimento);
            this.storage.set('newsCds', this.newsCds);
            this.storage.set('newsAteneo', this.newsAteneo);
            this.storage.set('carriera', this.carriera);
            this.storage.get('tokenNotifiche').then(
                (val) => {
                    if ((val != null) && (val !== '')) {
                        this.tokenNotifiche = val;
                        this.sync.aggiornaTokenNotifiche(this.tokenNotifiche);
                    }
                });
        }, (reject) => {
            this.alertCtrl.create({
                header: 'ERRORE!',
                subHeader: 'Impossibile salvare le impostazioni',
                buttons: ['OK']
            }).then(alert => alert.present());
        }) .catch(exception => {
            this.alertCtrl.create({
                header: 'ERRORE!',
                subHeader: 'Impossibile salvare le impostazioni',
                buttons: ['OK']
            }).then(alert => alert.present());
        });


        // // console.dir(jPref);
        // this.http.post(url, jPref)
        //     .pipe(timeout(this.sync.getTimeout()))
        //     .subscribe(data => {
        //
        //             // SALVA LE PREFERENZE IN LOCALE
        //             this.storage.set('newsDipartimento', this.newsDipartimento);
        //             this.storage.set('newsCds', this.newsCds);
        //             this.storage.set('newsAteneo', this.newsAteneo);
        //             this.storage.set('carriera', this.carriera);
        //             this.storage.get('tokenNotifiche').then(
        //                 (val) => {
        //                     if ((val != null) && (val !== '')) {
        //                         this.tokenNotifiche = val;
        //                         this.sync.aggiornaTokenNotifiche(this.tokenNotifiche);
        //                     }
        //                 });
        //         },
        //         error => {
        //             this.alertCtrl.create({
        //                 header: 'ERRORE!',
        //                 subHeader: 'Impossibile salvare le impostazioni',
        //                 buttons: ['OK']
        //             }).then(alert => alert.present());
        //         });

        this.notificheService.aggiornaSottoscrizioni();
    }

    salvaPreferenzeLocali() {
        this.storage.set('aggiornamentiApp', this.aggiornamentiApp);
        this.storage.set('graficoLegacy', this.graficoLegacy);
        this.storage.set('includiNoMedia', this.includiNoMedia);
        this.storage.set('connessioneLenta', this.connessioneLenta);
        this.storage.set('httpNativo', this.httpNativo);
        this.http.httpNativo = this.httpNativo;
    }

    showAccounts() {
        this.globalData.goTo(this.currentPage, '/accounts', 'forward', false);
    }
}
