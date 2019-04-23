(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-preferenze-preferenze-module"],{

/***/ "./src/app/pages/preferenze/preferenze.html":
/*!**************************************************!*\
  !*** ./src/app/pages/preferenze/preferenze.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-grid no-padding>\n    <ion-row *ngIf=\"!globalData.landscape && globalData.iPhoneX\">\n      <ion-col>\n        <ion-label> </ion-label>\n      </ion-col>\n    </ion-row>\n    <ion-row no-padding>\n      <ion-col no-padding>\n        <ion-toolbar>\n          <ion-buttons slot=\"start\">\n            <ion-menu-button></ion-menu-button>\n          </ion-buttons>\n          <ion-title>\n            Preferenze\n          </ion-title>\n        </ion-toolbar>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-header>\n\n<ion-content padding id=\"page3\">\n  <form id=\"preferenzeNotifiche-form1\">\n    <ion-item-divider color=\"light\" id=\"preferenzeNotifiche-list-item-divider1\">\n      Attiva Notifiche\n    </ion-item-divider>\n    <ion-item id=\"preferenzeNotifiche-toggle2\">\n      <ion-label>\n        News Dipartimento\n      </ion-label>\n      <ion-toggle name=\"dipartimento\" [(ngModel)]=\"newsDipartimento\"></ion-toggle>\n    </ion-item>\n    <ion-item id=\"preferenzeNotifiche-toggle3\">\n      <ion-label>\n        News Corso di studi\n      </ion-label>\n      <ion-toggle name=\"cds\" [(ngModel)]=\"newsCds\"></ion-toggle>\n    </ion-item>\n    <ion-item id=\"preferenzeNotifiche-toggle4\">\n      <ion-label>\n        News Ateneo\n      </ion-label>\n      <ion-toggle name=\"ateneo\" [(ngModel)]=\"newsAteneo\"></ion-toggle>\n    </ion-item>\n    <ion-item id=\"preferenzeNotifiche-toggle5\">\n      <ion-label>\n        Aggiornamenti Carriera\n      </ion-label>\n      <ion-toggle name=\"carriera\" [(ngModel)]=\"carriera\"></ion-toggle>\n    </ion-item>\n\n    <ion-item-divider color=\"light\" id=\"preferenzeNotifiche-list-item-divider2\">\n      Aggiornamento\n    </ion-item-divider>\n    <ion-item id=\"preferenzeAggiornamento-toggle2\">\n      <ion-label>\n        Controlla disponibilità aggiornamenti\n      </ion-label>\n      <ion-toggle name=\"aggiornamentiApp\" (ionChange)=\"salvaPreferenzeLocali()\" [(ngModel)]=\"aggiornamentiApp\"></ion-toggle>\n    </ion-item>\n    <ion-item *ngIf=\"globalData.android\" id=\"preferenzeAggiornamento-toggle3\">\n      <ion-label>\n        Usa grafico legacy\n      </ion-label>\n      <ion-toggle name=\"graficoLegacy\" (ionChange)=\"salvaPreferenzeLocali()\" [(ngModel)]=\"graficoLegacy\"></ion-toggle>\n    </ion-item>\n    <ion-item id=\"preferenzeAggiornamento-toggle5\">\n      <ion-label>\n        Includi esami fuori dal calcolo media nel grafico\n      </ion-label>\n      <ion-toggle name=\"includiNoMedia\" (ionChange)=\"salvaPreferenzeLocali()\" [(ngModel)]=\"includiNoMedia\"></ion-toggle>\n    </ion-item>\n    <ion-item id=\"preferenzeAggiornamento-toggle4\">\n      <ion-label>\n        Mostra avviso di connessione lenta\n      </ion-label>\n      <ion-toggle name=\"connessioneLenta\" (ionChange)=\"salvaPreferenzeLocali()\" [(ngModel)]=\"connessioneLenta\"></ion-toggle>\n    </ion-item>\n    <ion-item id=\"preferenzeAggiornamento-toggle6\">\n      <ion-label>\n        Usa chiamate HTTP native\n      </ion-label>\n      <ion-toggle name=\"httpNativo\" (ionChange)=\"salvaPreferenzeLocali()\" [(ngModel)]=\"httpNativo\"></ion-toggle>\n    </ion-item>\n    <!--\n    <ion-item id=\"preferenzeAggiornamento-range1\">\n      <ion-label>Elementi da caricare</ion-label>\n      <ion-select name=\"step\" [(ngModel)]=\"step\">\n        <ion-select-option value=\"10\">10</ion-select-option>\n        <ion-select-option value=\"20\">20</ion-select-option>\n        <ion-select-option value=\"50\">50</ion-select-option>\n        <ion-select-option value=\"100\">100</ion-select-option>\n        <ion-select-option value=\"500\">500</ion-select-option>\n      </ion-select>\n    </ion-item>\n    -->\n    <div class=\"spacer\" style=\"height:13PX;\" id=\"preferenzeNotifiche-spacer3\"></div>\n\n  </form>\n\n  <ion-button expand=\"block\" fill=\"outline\" (click)=\"showAccounts()\">\n    Mostra account collegati\n  </ion-button>\n</ion-content>\n\n<ion-footer  no-padding>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <fa-icon [hidden]=\"!http.getConnected()\" [icon]=\"globalData.faLink\"></fa-icon>\n      <fa-icon [hidden]=\"http.getConnected()\"  [icon]=\"globalData.faUnlink\"></fa-icon>\n    </ion-buttons>\n\n    <div class=\"testo-footer\">\n      ver. {{appVersionNum}}\n    </div>\n\n    <ion-buttons slot=\"end\" no-padding>\n      <ion-icon slot=\"icon-only\" src=\"assets/icon/blank.png\"></ion-icon>\n    </ion-buttons>\n  </ion-toolbar>\n\n</ion-footer>"

/***/ }),

/***/ "./src/app/pages/preferenze/preferenze.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/pages/preferenze/preferenze.module.ts ***!
  \*******************************************************/
/*! exports provided: PreferenzePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreferenzePageModule", function() { return PreferenzePageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _preferenze__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./preferenze */ "./src/app/pages/preferenze/preferenze.ts");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var PreferenzePageModule = /** @class */ (function () {
    function PreferenzePageModule() {
    }
    PreferenzePageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"],
                _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _preferenze__WEBPACK_IMPORTED_MODULE_5__["PreferenzePage"]
                    }
                ])
            ],
            declarations: [_preferenze__WEBPACK_IMPORTED_MODULE_5__["PreferenzePage"]]
        })
    ], PreferenzePageModule);
    return PreferenzePageModule;
}());



/***/ }),

/***/ "./src/app/pages/preferenze/preferenze.ts":
/*!************************************************!*\
  !*** ./src/app/pages/preferenze/preferenze.ts ***!
  \************************************************/
/*! exports provided: PreferenzePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreferenzePage", function() { return PreferenzePage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _services_sync_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/sync.service */ "./src/app/services/sync.service.ts");
/* harmony import */ var _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/global-data.service */ "./src/app/services/global-data.service.ts");
/* harmony import */ var _services_notifiche_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/notifiche.service */ "./src/app/services/notifiche.service.ts");
/* harmony import */ var _services_account_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/account.service */ "./src/app/services/account.service.ts");
/* harmony import */ var _services_http_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/http.service */ "./src/app/services/http.service.ts");
/* harmony import */ var _ionic_native_app_version_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/app-version/ngx */ "./node_modules/@ionic-native/app-version/ngx/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var PreferenzePage = /** @class */ (function () {
    function PreferenzePage(sync, http, storage, appVersionProvider, globalData, notificheService, account, alertCtrl) {
        this.sync = sync;
        this.http = http;
        this.storage = storage;
        this.appVersionProvider = appVersionProvider;
        this.globalData = globalData;
        this.notificheService = notificheService;
        this.account = account;
        this.alertCtrl = alertCtrl;
        this.currentPage = '/preferenze';
        this.newsDipartimento = true;
        this.newsCds = true;
        this.newsAteneo = true;
        this.esamiVerbalizzati = true;
        this.aggiornamentiApp = true;
        this.graficoLegacy = true;
        this.includiNoMedia = false;
        this.connessioneLenta = true;
        this.httpNativo = true;
        this.carriera = true;
        this.appVersionNum = '';
        this.step = 20;
        this.android = false;
    }
    // CONTROLLA TUTTE LE IMPOSTAZIONI PRIMA DEL CARICAMENTO DELLA PAGINA
    PreferenzePage.prototype.ngOnInit = function () {
        var _this = this;
        this.globalData.srcPage = '/preferenze';
        this.account.controllaAccount().then(function (ok) {
            _this.http.getConnected();
            _this.android = _this.globalData.android;
            _this.storage.get('token').then(function (value) {
                _this.token = value;
            });
            // Prende la versione dell'app settata nel file config.xml
            _this.appVersionProvider.getVersionNumber().then(function (value) {
                _this.appVersionNum = value;
            });
            // CONTROLLO IMPOSTAZIONI PER NEWS DIPARTIMENTO
            _this.storage.get('aggiornamentiApp').then(function (value) {
                if (value != null) {
                    _this.aggiornamentiApp = value;
                }
                else {
                    _this.aggiornamentiApp = true;
                }
            });
            // Usa una versione del grafico differente per evitare problemi con Android 8
            _this.storage.get('graficoLegacy').then(function (value) {
                if (value != null) {
                    _this.graficoLegacy = value;
                }
                else {
                    _this.graficoLegacy = false;
                }
            });
            // Usa una versione del grafico differente per evitare problemi con Android 8
            _this.storage.get('includiNoMedia').then(function (value) {
                if (value != null) {
                    _this.includiNoMedia = value;
                }
                else {
                    _this.includiNoMedia = true;
                }
            });
            // Consente di visualizzate o nascondere gli avvisi di connessione lenta
            _this.storage.get('connessioneLenta').then(function (value) {
                if (value != null) {
                    _this.connessioneLenta = value;
                }
                else {
                    _this.connessioneLenta = true;
                }
            });
            // Consente di scegliere tra chiamate http con plugin nativo o tramite Angular
            _this.storage.get('httpNativo').then(function (value) {
                if (value != null) {
                    _this.httpNativo = value;
                }
                else {
                    _this.httpNativo = true;
                }
            });
            // CONTROLLO IMPOSTAZIONI PER NEWS DIPARTIMENTO
            _this.storage.get('newsDipartimento').then(function (value) {
                if (value != null) {
                    _this.newsDipartimento = value;
                }
                else {
                    _this.newsDipartimento = true;
                }
            });
            // CONTROLLO IMPOSTAZIONI PER NEWS CDS
            _this.storage.get('newsCds').then(function (value) {
                if (value != null) {
                    _this.newsCds = value;
                }
                else {
                    _this.newsCds = true;
                }
            });
            // CONTROLLO IMPOSTAZIONI PER NEWS ANNO CORSO
            _this.storage.get('newsAteneo').then(function (value) {
                if (value != null) {
                    _this.newsAteneo = value;
                }
                else {
                    _this.newsAteneo = true;
                }
            });
            // CONTROLLO IMPOSTAZIONI PER ESAMI APPELLI
            _this.storage.get('carriera').then(function (value) {
                if (value != null) {
                    _this.carriera = value;
                }
                else {
                    _this.carriera = true;
                }
            });
            // CONTROLLO IMPOSTAZIONI PER ESAMI VERBALIZZATI
            _this.storage.get('esamiVerbalizzati').then(function (value) {
                if (value != null) {
                    _this.esamiVerbalizzati = value;
                }
                else {
                    _this.esamiVerbalizzati = true;
                }
            });
            // INCREMENTO NR ELEMENTI VISUALIZZATI SU UNA SCHEDA
            _this.storage.get('step').then(function (value) {
                if (value != null) {
                    _this.step = value;
                }
                else {
                    _this.step = 20;
                }
            });
        }, function (err) {
            _this.globalData.goTo(_this.currentPage, '/login', 'root', false);
        });
    };
    PreferenzePage.prototype.ionViewWillLeave = function () {
        var _this = this;
        var storedNewsAteneo = this.storage.get('newsAteneo');
        var storedNewsDipartimento = this.storage.get('newsDipartimento');
        var storedNewsCds = this.storage.get('newsCds');
        var storedCarriera = this.storage.get('carriera');
        Promise.all([storedNewsAteneo, storedNewsDipartimento, storedNewsCds, storedCarriera]).then(function (data) {
            //  console.log('Stored New ' + data[0] + ' ' + data[1]);
            if ((_this.newsAteneo !== data[0]) ||
                (_this.newsCds !== data[1]) ||
                (_this.newsDipartimento !== data[2]) ||
                (_this.carriera !== data[3])) {
                _this.salvaPreferenze();
            }
        });
    };
    PreferenzePage.prototype.salvaPreferenze = function () {
        var _this = this;
        this.salvaPreferenzeLocali();
        var url = this.sync.getUrlPreferenzeNotifiche();
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
        var body = {
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
        this.http.post(url, body).then(function (data) {
            // SALVA LE PREFERENZE IN LOCALE
            _this.storage.set('newsDipartimento', _this.newsDipartimento);
            _this.storage.set('newsCds', _this.newsCds);
            _this.storage.set('newsAteneo', _this.newsAteneo);
            _this.storage.set('carriera', _this.carriera);
            _this.storage.get('tokenNotifiche').then(function (val) {
                if ((val != null) && (val !== '')) {
                    _this.tokenNotifiche = val;
                    _this.sync.aggiornaTokenNotifiche(_this.tokenNotifiche);
                }
            });
        }, function (reject) {
            _this.alertCtrl.create({
                header: 'ERRORE!',
                subHeader: 'Impossibile salvare le impostazioni',
                buttons: ['OK']
            }).then(function (alert) { return alert.present(); });
        }).catch(function (exception) {
            _this.alertCtrl.create({
                header: 'ERRORE!',
                subHeader: 'Impossibile salvare le impostazioni',
                buttons: ['OK']
            }).then(function (alert) { return alert.present(); });
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
    };
    PreferenzePage.prototype.salvaPreferenzeLocali = function () {
        this.storage.set('aggiornamentiApp', this.aggiornamentiApp);
        this.storage.set('graficoLegacy', this.graficoLegacy);
        this.storage.set('includiNoMedia', this.includiNoMedia);
        this.storage.set('connessioneLenta', this.connessioneLenta);
        this.storage.set('httpNativo', this.httpNativo);
        this.http.httpNativo = this.httpNativo;
    };
    PreferenzePage.prototype.showAccounts = function () {
        this.globalData.goTo(this.currentPage, '/accounts', 'forward', false);
    };
    PreferenzePage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-preferenze',
            template: __webpack_require__(/*! ./preferenze.html */ "./src/app/pages/preferenze/preferenze.html"),
        }),
        __metadata("design:paramtypes", [_services_sync_service__WEBPACK_IMPORTED_MODULE_3__["SyncService"],
            _services_http_service__WEBPACK_IMPORTED_MODULE_7__["HttpService"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_1__["Storage"],
            _ionic_native_app_version_ngx__WEBPACK_IMPORTED_MODULE_8__["AppVersion"],
            _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"],
            _services_notifiche_service__WEBPACK_IMPORTED_MODULE_5__["NotificheService"],
            _services_account_service__WEBPACK_IMPORTED_MODULE_6__["AccountService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"]])
    ], PreferenzePage);
    return PreferenzePage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-preferenze-preferenze-module.js.map