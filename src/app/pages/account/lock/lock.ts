import {Component, OnInit} from '@angular/core';
import {AlertController, NavController, NavParams} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import {SyncService} from '../../../services/sync.service';
import {GlobalDataService} from '../../../services/global-data.service';

@Component({
    selector: 'app-page-lock',
    templateUrl: 'lock.html'
})
export class LockPage implements OnInit {

    url: any;
    // token: string;

    constructor(
        private alertCtrl: AlertController,
        public storage: Storage,
        public globalData: GlobalDataService) {
    }

    ngOnInit() {
        // this.url = this.syn.getUrlDisconnetti();
        //
        // this.storage.get('token').then(
        //     (val) => {
        //         this.token = val;
        //         this.logout();
        //     },
        //     () => {
        //         this.logout();
        //     });

        this.alertCtrl.create({
            header: 'Log out',
            message: 'Sicuro di voler bloccare il dispositivo?',
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

    }

    logout() {
        // console.log('Torniamo al Login');
        this.storage.set('logged', false);
        this.globalData.goTo(this.globalData.srcPage, '/login','root', false);
    }

    continua() {
        this.storage.set('logged', true);

        if ( this.globalData.srcPage ) {
            this.globalData.goTo(this.globalData.srcPage, this.globalData.srcPage,'root', false);
        } else {
            this.globalData.goTo('/home', '/home','root', false);
        }
    }

}
