import { Component, OnInit } from '@angular/core';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import {GlobalDataService} from '../../../services/global-data.service';
import {HttpService} from '../../../services/http.service';

@Component({
    selector: 'app-page-notizia',
    templateUrl: 'notizia.html'
})

export class NotiziaPage implements OnInit {

    currentPage = '/notizia';
    notizia: any;
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
        public inAppBrowser: InAppBrowser,
        public http: HttpService,
        public globalData: GlobalDataService) {}


    ngOnInit() {
        this.notizia = this.globalData.notizia;
        this.http.getConnected();
        // if (this.notizia.contenuto == '')
        //   this.notizia.contenuto = this.notizia.descrizione;
    }

    onGoBack()  {
        this.globalData.goTo(this.currentPage, this.globalData.srcPage, 'backward', false);
    }

    formatStringDate(stringDate): string {
        if (this.notizia.notifica) {
            return this.notizia.data;
        } else {
            return GlobalDataService.formatStringDate(stringDate);
        }
    }

    ionViewDidLoad() {
        this.notizia = this.globalData.notizia;
        this.http.getConnected();
    }


    public openWithSystemBrowser() {
        const target = '_system';
        this.browser = this.inAppBrowser.create(this.notizia.link, target, this.options);
    }

    public openWithInAppBrowser() {
        const target = '_blank';
        this.browser = this.inAppBrowser.create(this.notizia.link, target, this.options);
    }
    public openWithCordovaBrowser() {
        const target = '_self';
        this.browser = this.inAppBrowser.create(this.notizia.link, target, this.options);
    }

    public pulisciNews(newsItem: string): string {
        if (newsItem) {
            return newsItem.replace(/\\r\\n|\\r|\\n/g, '<br>');
        } else {
            return '';
        }
    }

}
