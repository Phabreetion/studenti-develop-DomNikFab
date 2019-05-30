import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Platform, ToastController} from '@ionic/angular';
import {SyncService} from '../../../services/sync.service';
import {GlobalDataService} from '../../../services/global-data.service';
import {NotificheService} from '../../../services/notifiche.service';
import {AccountService} from '../../../services/account.service';
import {HttpService} from '../../../services/http.service';


@Component({
    selector: 'app-page-home-docente',
    templateUrl: 'home-docente.page.html',
    styleUrls: ['home-docente.page.scss'],
})
export class HomeDocentePage implements OnInit {

    currentPage = '/home-docente';

    idServizio = 12; // Piano di studi
    dati = [];

    ultimoDato = '';
    inizializzato = false;
    nome: string;
    cognome: string;
    idDocente: number;
    token: string;
    dipartimento: string;
    tokenNotifiche: string;

    dataAggiornamento: string;
    aggiornamentoVerificato = false;
    rinvioAggiornamento = false;
    nrRinvii = 0;
    maxNrRinvii = 5;

    constructor(
        public toastCtrl: ToastController,
        // private speechRecognition: SpeechRecognition,
        public sync: SyncService,
        public http: HttpService,
        public storage: Storage,
        public platform: Platform,
        public globalData: GlobalDataService,
        public notificheService: NotificheService,
        public account: AccountService) {
    }

    ngOnInit() {
        this.globalData.srcPage = '/home-docente';

        this.storage.get('token').then(
            (token) => {
                if (!token) {
                    GlobalDataService.log(2, 'Nessun Token', this.token);
                    this.globalData.goTo(this.currentPage, '/login', 'root', false);
                    return;
                } else {
                    // Aggiorniamo lo stati di log dell'utente
                    this.account.controllaAccount().then(
                        (logged) => {
                            GlobalDataService.log(
                                1,
                                'Logged in ',
                                logged);

                            // Verifichiamo la presenza sul server di messaggi diretti per il token dell'utemte
                            this.sync.controllaMessaggi();

                            // Controlliamo so stato della connessione
                            this.http.checkConnection();

                            // srcPage lo azzeriamo perchè siamo già sulla home page
                            this.globalData.srcPage = '';

                            this.sync.aggiornaAnnoCorrente();

                            this.caricaPreferenze();
                            this.aggiornaStatoApp();
                            this.caricaDatiDaStorage();

                            this.aggiorna(false, true);
                        }, (err) => {
                            GlobalDataService.log(
                                1,
                                'Not Logged in ',
                                err);
                            this.globalData.goTo(this.currentPage, '/login', 'root', false);
                        }
                    );

                }
            }, (err) => {
                GlobalDataService.log(0, 'Accidenti', err);
                this.globalData.goTo(this.currentPage, '/login', 'root', false);
            }
        ).catch(
            (exception) => {
                GlobalDataService.log( 2, 'Eccezione get token', exception);
                this.globalData.goTo(this.currentPage, '/login', 'root', false);
            }
        );
    }

    caricaDatiDaStorage() {
        // Carichiamo i dati dell'utente
        const nome = this.storage.get('nome');
        const cognome = this.storage.get('cognome');
        const idDocente = this.storage.get('id_docente');
        const token = this.storage.get('token');
        const dipartimento = this.storage.get('nome_dip');
        const tokenNotifiche = this.storage.get('tokenNotifiche');

        Promise.all([nome, cognome, idDocente, token, dipartimento, tokenNotifiche]).then(data => {
            this.nome = data[0];
            this.cognome = data[1];
            this.idDocente = data[2];
            this.token = data[3];
            this.dipartimento = data[4];
            this.tokenNotifiche = data[5];
        });
    }

    caricaPreferenze() {
        this.storage.get('connessioneLenta').then(
            (connessioneLenta) => {
                if ((connessioneLenta != null) && (connessioneLenta)) {
                    this.http.connessioneLenta = connessioneLenta;
                    GlobalDataService.log(1, 'Uso grafico legacy', null);
                } else {
                    this.http.connessioneLenta = false;
                    GlobalDataService.log(1, 'Uso grafico legacy', null);
                }
            }, () => {
                this.http.connessioneLenta = false;
                GlobalDataService.log(1, 'Uso grafico legacy', null);
            });
    }

    aggiornaStatoApp() {
        // Aggiorna la versione del dispositivo aul server
        // Controlla se è presente una versione aggiornata dell'App
        // Aggiorna la sottoscrizione delle notifiche periodicamente
        if (this.platform.is('ios') || (this.platform.is('android'))) {
            this.sync.aggiornaDeviceInfo(this.tokenNotifiche).then(
                () => {
                    GlobalDataService.log(1, 'Aggiornato il Device', null);
                }, (err) => {
                    GlobalDataService.log(2, 'Impossibile aggiornare le info sul device', err);
                }
            );
            this.sync.controllaVersione().then(
                () => {
                    GlobalDataService.log(1, 'Check Ultima Versione', null);
                }, (err) => {
                    GlobalDataService.log(2, 'Impossibile controllare la versione dell\'app', err);
                }
            );
            this.notificheService.aggiornamentoPeriodicoSottoscrizioni().then(
                () => {
                    GlobalDataService.log(1, 'Sottoscrizioni Aggiornate', null);
                }, (err) => {
                    GlobalDataService.log(2, 'Impossibile aggiornare le sottoscrizioni ore', err);
                }
            );
        }
    }

    aggiorna(interattivo: boolean, sync: boolean) {
        if (this.sync.loading[this.idServizio]) {
            this.rinvioAggiornamento = true;
            this.dataAggiornamento = 'in corso';
            this.nrRinvii++;

            GlobalDataService.log(0, 'Rinvio'  + this.nrRinvii, null);

            if (this.nrRinvii < this.maxNrRinvii) {
                setTimeout(() => {
                    this.aggiorna(interattivo, sync);
                }, 2000);
                return;
            } else {
                if (this.http.connessioneLenta) {
                    this.toastCtrl.create({
                        message: 'La connessione è assente o troppo lenta. Riprova ad aggiornare i dati più tardi.',
                        duration: 3000,
                        position: 'bottom'
                    }).then(
                        (toast) => { toast.present(); },
                        (err) => { GlobalDataService.log(2, 'Errore in aggiorna', err); });
                }
            }
        }
        this.rinvioAggiornamento = false;
        this.nrRinvii = 0;


        // Otteniamo il PDS
        this.sync.getJson(this.idServizio, null, sync).then(
            (data) => {
                if (this.ultimoDato !== JSON.stringify(data[0])) {
                    this.ultimoDato = JSON.stringify(data[0]);
                    this.dati = data[0];
                    setTimeout(() => {
                        this.controllaAggiornamento();
                    }, 1000);
                }
                this.dataAggiornamento = SyncService.dataAggiornamento(data);
            },
            (err) => {
                GlobalDataService.log(2, 'Errore in aggiorna', err);
            }).catch(ex => {
            GlobalDataService.log(2, 'Eccezione in aggiorna', ex);
            setTimeout(() => {
                this.controllaAggiornamento();
            }, 1000);
        });
    }

    controllaAggiornamento() {
        // La verifica dell'aggiornamento in background la facciamo solo una volta
        if (this.aggiornamentoVerificato) {
            return;
        }

        // Se stiamo caricando dati dal server rimandiamo la verifica
        if (this.sync.loading[this.idServizio]) {
            setTimeout(() => {
                this.controllaAggiornamento();
            }, 1000);
        } else {
            this.aggiornamentoVerificato = true;
            this.aggiorna(false, false);
        }
    }

    isLoading() {
        return this.sync.loading[this.idServizio];
    }

    doRefresh(refresher) {
        if (refresher) {
            refresher.target.complete();
        }

        this.aggiorna(true, true);
    }

}
