import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule} from '@angular/common/http';
// import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { IonicStorageModule} from '@ionic/storage';

import { DBService } from './services/db-service';
import { SyncService } from './services/sync.service';

import { AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Device } from '@ionic-native/device/ngx';
// import { FCM } from '@ionic-native/fcm/ngx';
import { File} from '@ionic-native/file/ngx';
import { FileOpener} from '@ionic-native/file-opener/ngx';
import { FileTransfer} from '@ionic-native/file-transfer/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
// import {FirebaseMessaging} from "@ionic-native/firebase-messaging/ngx";
import { HTTP } from '@ionic-native/http/ngx';
// import { HttpModule} from '@angular/http';
import { InAppBrowser} from '@ionic-native/in-app-browser/ngx';

// import {Market} from '@ionic-native/market';
import { Network } from '@ionic-native/network/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { SQLite} from '@ionic-native/sqlite/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { Transfer} from '@ionic-native/transfer';

import { NotiziaPageModule} from './pages/news/notizia/notizia.module';
import { DettagliUtentePageModule } from './pages/home/dettagli-utente/dettagli-utente.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FCM} from '@ionic-native/fcm/ngx';
import {EsamePageModule} from './pages/carriera/esame/esame.module';
import {Toast} from '@ionic-native/toast/ngx';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
// import {Push} from "@ionic-native/push/ngx";
// import {Firebase} from "@ionic-native/firebase/ngx";

// import 'hammerjs';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        AppRoutingModule,
        DettagliUtentePageModule,
        NotiziaPageModule,
        EsamePageModule,
        HttpClientModule,
        FontAwesomeModule
    ],
    providers: [
        AndroidPermissions,
        AppVersion,
        DBService,
        Device,
        FCM,
        File,
        FileOpener,
        FileTransfer,
        FingerprintAIO,
        // FirebaseMessaging,
        // Firebase,
        HTTP,
        // Http,
        // HttpModule,
        InAppBrowser,
        // Market,
        Network,
        // Push,
        ScreenOrientation,
        SplashScreen,
        SQLite,
        StatusBar,
        SyncService,
        Toast,
        // Transfer,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
