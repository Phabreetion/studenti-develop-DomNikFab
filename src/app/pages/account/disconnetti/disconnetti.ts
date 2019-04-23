import {Component, OnInit} from '@angular/core';
import {LoadingController, AlertController, ToastController} from '@ionic/angular';
import {Storage } from '@ionic/storage';
import {SyncService} from '../../../services/sync.service';
import {GlobalDataService} from '../../../services/global-data.service';
import {NotificheService} from '../../../services/notifiche.service';
import {AccountService} from '../../../services/account.service';
import {HttpService} from '../../../services/http.service';



@Component({
    selector: 'app-page-disconnetti',
    templateUrl: 'disconnetti.html',
})
export class DisconnettiPage implements OnInit {

    url: any;
    token: string;
    tokenNotifiche: string;

    constructor(
        public sync: SyncService,
        public globalData: GlobalDataService,
        public http: HttpService,
        public notificheService: NotificheService,
        public account: AccountService,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public toastCtrl: ToastController,
        public storage: Storage) {
    }

    ngOnInit() {
        this.url = this.account.getUrlDisconnetti();

        this.storage.get('token').then((val) => {
            this.token = val;

            this.alertCtrl.create({
                header: 'Log out',
                message: 'Sicuro di voler eliminare l\'account dal dispositivo?',
                buttons: [
                    {
                        text: 'Si',
                        role: 'cancel',
                        handler: () => {
                            this.logout();
                        }
                    },
                    {
                        text: 'No',
                        handler: () => {
                            this.continua();
                        }
                    }
                ]
            }).then(confirm => confirm.present());

        });
    }

    logout() {
        this.storage.get('tokenNotifiche').then((val) => {

            // salviamo il tokenNotifiche e lo reinseriamo nel nuovo storage
            this.tokenNotifiche = val;
            let body;

            body = {
                token: this.token,
            };

            this.loadingCtrl.create({
                message: 'Attendere...'
            }).then(loading => {

                loading.present();

                this.http.post(this.url, body).then(
                    (response) => {
                        loading.dismiss();
                        if (response) {
                            this.notificheService.rimuoviSottoscrizioni();
                            this.storage.clear();
                            this.storage.set('logged', false);
                            this.storage.set('tokenNotifiche', this.tokenNotifiche);
                            this.globalData.goTo(this.globalData.srcPage, '/login', 'root', false);
                            this.toastCtrl.create({
                                message: response.toString(),
                                duration: 3000
                            }).then(
                                (toast) => {toast.present(); },
                                (errToast) => { GlobalDataService.log(2, 'Errore Toast', errToast); });
                        } else {
                            this.globalData.goTo(this.globalData.srcPage, '/home', 'root', false);
                        }
                    }, (reject) => {
                        GlobalDataService.log(
                            2,
                            this.url,
                            reject);
                        loading.dismiss();
                        this.presentConfirm();
                    }
                );
            });
        });
    }

    continua() {
        this.storage.set('logged', true);

        if ( this.globalData.srcPage ) {
            this.globalData.goTo(this.globalData.srcPage, this.globalData.srcPage, 'root', false);
        } else {
            this.globalData.goTo('/home', '/home', 'root', false);

        }
    }

    presentConfirm() {
        this.alertCtrl.create({
            header: 'Errore',
            subHeader: 'Server non raggiungibile',
            message: 'Il server non risponde. Per poter cancellare la registrazione di questo dispoditivo devi essere connesso ' +
            'ad Internet. Se procedi, i dati sul tuo dispositivo saranno rimossi, ma i dati sul server non potranno essere cancellati. ' +
            'Sei sicuro di voler procedere?',
            buttons: [
                {
                    text: 'Disconnetti',
                    role: 'cancel',
                    handler: () => {
                            this.storage.clear();
                            this.storage.set('tokenNotifiche', this.tokenNotifiche);
                            this.notificheService.rimuoviSottoscrizioni().then(
                                () => {
                                    this.globalData.goTo('/login', '/login', 'root', false);

                                }
                            );
                    }
                },
                {
                    text: 'Annulla',
                    handler: () => {
                        this.globalData.goTo('/home', '/home', 'root', false);
                    }
                }
            ]
        }).then(alert => alert.present());
    }

}
