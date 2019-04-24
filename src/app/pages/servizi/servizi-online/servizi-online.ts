import {Component, OnInit} from '@angular/core';
import {LoadingController} from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import {SyncService} from '../../../services/sync.service';
import {GlobalDataService} from '../../../services/global-data.service';
import {AccountService} from '../../../services/account.service';
import {Esse3Service} from '../../../services/esse3.service';
import {HttpService} from '../../../services/http.service';

@Component({
    selector: 'app-page-servizi-online',
    templateUrl: 'servizi-online.html',
})
export class ServiziOnlinPage implements OnInit {

    currentPage = '/servizi-online';

    private browser: any;
    options: InAppBrowserOptions = {
        location : 'yes', // Or 'no'
        hidden : 'no', // Or  'yes'
        clearcache : 'yes',
        clearsessioncache : 'yes',
        zoom : 'yes', // Android only ,shows browser zoom controls
        hardwareback : 'yes',
        mediaPlaybackRequiresUserAction : 'no',
        shouldPauseOnSuspend : 'no', // Android only
        closebuttoncaption : 'Close', // iOS only
        disallowoverscroll : 'no', // iOS only
        toolbar : 'yes', // iOS only
        enableViewportScale : 'no', // iOS only
        allowInlineMediaPlayback : 'no', // iOS only
        presentationstyle : 'pagesheet', // iOS only
        fullscreen : 'yes', // Windows only
    };

    constructor(
        public sync: SyncService,
        public http: HttpService,
        public loadingCtrl: LoadingController,
        public inAppBrowser: InAppBrowser,
        public globalData: GlobalDataService,
        public esse3: Esse3Service,
        public account: AccountService) {
    }

    ngOnInit() {
        this.globalData.srcPage = this.currentPage;

        this.account.controllaAccount().then(
            (ok) => {
                this.http.getConnected();
            }, (err) => {
                this.globalData.goTo(this.currentPage, '/login', 'root', false);
            }
        );
    }

    apriLinkTrasporti() {
        this.loadingCtrl.create().then(
            loading => {

                loading.present();

                this.esse3.queryStringTrasporti().then(
                    (query) => {
                        const urlTrasporti = 'http://trasporti.unimol.it/home.php' + query;
                        loading.dismiss();
                        this.apriLinkBrowser(urlTrasporti);
                    }, (err) => {
                        console.log(err);
                        loading.dismiss();
                    }
                );
            }
        );
    }

    public apriLinkBrowser(url) {
        const target = '_system';
        this.browser = this.inAppBrowser.create(url, target, this.options);
    }
}
