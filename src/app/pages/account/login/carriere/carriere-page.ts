import { Component, OnInit } from '@angular/core';
import {LoadingController} from '@ionic/angular';
import {isArray} from 'rxjs/internal/util/isArray';
import {SyncService} from '../../../../services/sync.service';
import {GlobalDataService} from '../../../../services/global-data.service';
import {AccountService} from '../../../../services/account.service';

@Component({
    selector: 'app-page-carriere',
    templateUrl: './carriere-page.html',
    styleUrls: ['./carriere-page.scss'],
})

export class CarrierePage implements OnInit {

    currentPage = '/carriere';
    carriere: any;
    username: string;
    password: string;

    constructor(
        public providers: SyncService,
        public globalData: GlobalDataService,
        public account: AccountService,
        public loadingCtrl: LoadingController) {
    }

    ngOnInit() {
        this.carriere = this.globalData.carriere;
        this.username = this.globalData.username;
        this.password = this.globalData.password;
    }

    seleziona(item)  {
        this.loadingCtrl.create().then(
            loading => {
                loading.present();

                this.account.login(this.username, this.password, item.matricola, item.cds_id, item.dip_id).then(
                    (risultato) => {
                        loading.dismiss();

                        if (isArray(risultato)) {
                            this.carriere = risultato;
                        } else {
                            switch (risultato) {
                                case 'unlocked' : {
                                    this.globalData.goTo(this.currentPage, '/home', 'root', false);
                                    break;
                                }
                                case 'logged': {
                                    this.globalData.goTo(this.currentPage, '/tutorial', 'root', false);
                                    break;
                                }
                                default: {
                                    this.globalData.goTo(this.currentPage, '/login', 'root', false);
                                }
                            }
                        }
                    },
                    (err) => {
                        loading.dismiss();
                        this.globalData.goTo(this.currentPage, '/login', 'root', false);
                    }).catch(
                    () => {
                        loading.dismiss();
                    }
                );
            }
        );

    }

    disconnetti() {
        this.globalData.goTo(this.currentPage, '/disconnetti', 'root', false);
    }
}
