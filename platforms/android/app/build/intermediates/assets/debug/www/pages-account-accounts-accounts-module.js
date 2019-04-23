(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-account-accounts-accounts-module"],{

/***/ "./src/app/pages/account/accounts/accounts.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/pages/account/accounts/accounts.module.ts ***!
  \***********************************************************/
/*! exports provided: AccountsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountsPageModule", function() { return AccountsPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _accounts_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./accounts.page */ "./src/app/pages/account/accounts/accounts.page.ts");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AccountsPageModule = /** @class */ (function () {
    function AccountsPageModule() {
    }
    AccountsPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
                _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _accounts_page__WEBPACK_IMPORTED_MODULE_5__["AccountsPage"]
                    }
                ])
            ],
            declarations: [_accounts_page__WEBPACK_IMPORTED_MODULE_5__["AccountsPage"]]
        })
    ], AccountsPageModule);
    return AccountsPageModule;
}());



/***/ }),

/***/ "./src/app/pages/account/accounts/accounts.page.html":
/*!***********************************************************!*\
  !*** ./src/app/pages/account/accounts/accounts.page.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-grid no-padding>\n    <ion-row *ngIf=\"!globalData.landscape && globalData.iPhoneX\">\n      <ion-col>\n        <ion-label> </ion-label>\n      </ion-col>\n    </ion-row>\n    <ion-row no-padding>\n      <ion-col no-padding>\n        <ion-toolbar>\n          <ion-buttons slot=\"start\">\n            <ion-menu-button></ion-menu-button>\n          </ion-buttons>\n          <ion-title>\n            Accounts {{nrAccounts}}\n          </ion-title>\n          <ion-buttons slot=\"end\">\n            <ion-back-button defaultHref=\"/preferenze\" text=\"Indietro\"></ion-back-button>\n          </ion-buttons>\n        </ion-toolbar>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-header>\n\n\n<ion-content>\n  <ion-refresher slot=\"fixed\" [disabled]=\"false\" (ionRefresh)=\"doRefresh($event)\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <ion-grid *ngIf=\"!accounts || accounts?.length == 0 && rinvioAggiornamento\" text-center>\n    <ion-row>\n      <ion-col text-center>\n        <img class=\"progress\" src=\"assets/img/progress.gif\" />\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col text-center>\n        <ion-title><strong>Aggiornamento in corso</strong></ion-title>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col text-center>\n        <ion-label>un attimo di pazienza</ion-label>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-item *ngIf=\"!rinvioAggiornamento && accounts?.length == 0\" text-center>\n    <h3>Dati non disponibili</h3>\n  </ion-item>\n\n  <ion-list *ngIf=\"accounts?.length > 0\" >\n    <ion-item-sliding no-padding  *ngFor=\"let account of accounts\">\n\n      <ion-item (click)=\"onPress(account)\" [ngClass]=\"{'locale' : account.token == tokenLocale}\">\n\n        <ion-grid no-padding fixed>\n          <ion-row>\n            <ion-col size=\"2\" align-items-start=\"true\" align-self-center=\"true\">\n              <img class=\"logo-mini\" src=\"./assets/img/{{this.selezionaIcona(account)}}\" />\n            </ion-col>\n            <ion-col size=\"10\">\n              <ion-grid no-padding>\n                <ion-row>\n                  <ion-col size=\"4\">Data</ion-col>\n                  <ion-col text-wrap>{{this.timestamp2string(account.ultimo_accesso)}}</ion-col>\n                </ion-row>\n                <ion-row>\n                  <ion-col size=\"4\">Matr.</ion-col>\n                  <ion-col text-wrap>{{account.matricola}}</ion-col>\n                </ion-row>\n                <ion-row *ngIf=\"account.virtual\">\n                  <ion-col >Dispositivo virtuale</ion-col>\n                </ion-row>\n                <ion-row *ngIf=\"account.manufacturer\">\n                  <ion-col size=\"4\">Device</ion-col>\n                  <ion-col text-wrap>{{account.manufacturer}} {{account.model}}</ion-col>\n                </ion-row>\n                <ion-row *ngIf=\"account.platform\">\n                  <ion-col size=\"4\">S.O.</ion-col>\n                  <ion-col text-wrap>{{account.platform}} {{account.os_version}}</ion-col>\n                </ion-row>\n                <ion-row *ngIf=\"account.app_version\">\n                  <ion-col size=\"4\">Ver. App</ion-col>\n                  <ion-col text-wrap>{{account.app_version}}</ion-col>\n                </ion-row>\n              </ion-grid>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-item>\n\n\n      <!--<ion-list [hidden]=\"accounts?.length == 0\"  *ngFor=\"let account of accounts\">\n        <ion-item (press)=\"onPress(account)\" [ngClass]=\"{'locale' : account.token == tokenLocale}\">\n          <ion-grid>\n            <ion-row>\n              <ion-col>Ultimo Accesso:</ion-col>\n              <ion-col text-wrap>{{this.timestamp2string(account.ultimo_accesso)}}</ion-col>\n            </ion-row>\n            <ion-row>\n              <ion-col>Matricola:</ion-col>\n              <ion-col text-wrap>{{account.matricola}}</ion-col>\n            </ion-row>\n            <ion-row *ngIf=\"!account.virtual\">\n              <ion-col>Dispositivo virtuale</ion-col>\n            </ion-row>\n            <ion-row *ngIf=\"account.manufacturer\">\n              <ion-col>Produttore:</ion-col>\n              <ion-col text-wrap>{{account.manufacturer}}</ion-col>\n            </ion-row>\n            <ion-row *ngIf=\"account.model\">\n              <ion-col>Modello:</ion-col>\n              <ion-col text-wrap>{{account.model}}</ion-col>\n            </ion-row>\n            <ion-row *ngIf=\"account.platform\">\n              <ion-col>SO:</ion-col>\n              <ion-col text-wrap>{{account.platform}} {{account.os_version}}</ion-col>\n            </ion-row>\n            <ion-row *ngIf=\"account.app_version\">\n              <ion-col>Versione App:</ion-col>\n              <ion-col text-wrap>{{account.app_version}}</ion-col>\n            </ion-row>\n          </ion-grid>\n\n        </ion-item>\n      <!--</ion-list>-->\n\n      <ion-item-options side=\"end\" slot=\"top\">\n        <ion-item-option *ngIf=\"account.token != tokenLocale\" (click)=\"disconnetti(account)\">\n          <ion-icon slot=\"icon-only\" name=\"trash\"></ion-icon>\n        </ion-item-option>\n      </ion-item-options>\n    </ion-item-sliding>\n\n  </ion-list>\n\n</ion-content>\n\n<ion-footer  no-padding>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-spinner [hidden]=\"!isLoading() || !http.getConnected()\"></ion-spinner>\n      <fa-icon [hidden]=\"isLoading() || !http.getConnected()\" [icon]=\"globalData.faLink\"></fa-icon>\n      <fa-icon [hidden]=\"isLoading() || http.getConnected()\"  [icon]=\"globalData.faUnlink\"></fa-icon>\n    </ion-buttons>\n\n    <div class=\"testo-footer\">\n      Aggiornato al: {{dataAggiornamento}}\n    </div>\n\n    <ion-buttons slot=\"end\" no-padding>\n      <ion-icon slot=\"icon-only\" src=\"assets/icon/blank.png\"></ion-icon>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-footer>"

/***/ }),

/***/ "./src/app/pages/account/accounts/accounts.page.scss":
/*!***********************************************************!*\
  !*** ./src/app/pages/account/accounts/accounts.page.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".locale {\n  background-color: #9eeeb6 !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbnRvbmlvX21hc3Ryb3Bhb2xvL0Rlc2t0b3AvbW9kaWZpY2hlQVBQL3N0dWRlbnRpLW1hc3Rlci9zcmMvYXBwL3BhZ2VzL2FjY291bnQvYWNjb3VudHMvYWNjb3VudHMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usb0NBQW9DLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9hY2NvdW50L2FjY291bnRzL2FjY291bnRzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5sb2NhbGUge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOWVlZWI2ICFpbXBvcnRhbnQ7XG59Il19 */"

/***/ }),

/***/ "./src/app/pages/account/accounts/accounts.page.ts":
/*!*********************************************************!*\
  !*** ./src/app/pages/account/accounts/accounts.page.ts ***!
  \*********************************************************/
/*! exports provided: AccountsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountsPage", function() { return AccountsPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _services_sync_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/sync.service */ "./src/app/services/sync.service.ts");
/* harmony import */ var _services_global_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/global-data.service */ "./src/app/services/global-data.service.ts");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _services_account_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/account.service */ "./src/app/services/account.service.ts");
/* harmony import */ var _services_http_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/http.service */ "./src/app/services/http.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import {Http} from '@angular/http';



var AccountsPage = /** @class */ (function () {
    function AccountsPage(toastCtrl, ngZone, http, storage, sync, loadingCtrl, actionSheetCtrl, globalData, account) {
        this.toastCtrl = toastCtrl;
        this.ngZone = ngZone;
        this.http = http;
        this.storage = storage;
        this.sync = sync;
        this.loadingCtrl = loadingCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.globalData = globalData;
        this.account = account;
        this.currentPage = '/accounts';
        this.idServizio = 19;
        this.accounts = [];
        this.dataAggiornamento = '';
        this.aggiornamentoVerificato = false;
        this.rinvioAggiornamento = false;
        this.nrRinvii = 0;
        this.maxNrRinvii = 5;
        this.tokenLocale = '';
        this.nrAccounts = '';
    }
    AccountsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.globalData.srcPage = this.currentPage;
        this.account.controllaAccount().then(function (ok) {
            _this.storage.get('token').then(function (val) {
                _this.tokenLocale = val;
            }, function (err) {
                //
            });
            _this.http.getConnected();
            _this.aggiorna(false, true);
        }, function (err) {
            _this.globalData.goTo(_this.currentPage, '/login', 'root', false);
        });
    };
    // Restituisce lo stato di eventuali richieste di sincronizzazione per il JSON associato al servizio
    AccountsPage.prototype.isLoading = function () {
        return this.sync.loading[this.idServizio];
    };
    // Recupera i dati tramite il sincronizzatore
    AccountsPage.prototype.aggiorna = function (interattivo, sync) {
        var _this = this;
        if (this.sync.loading[this.idServizio]) {
            this.rinvioAggiornamento = true;
            this.dataAggiornamento = 'in corso';
            this.nrRinvii++;
            // console.log('Rinvio ' + this.nrRinvii);
            if (this.nrRinvii < this.maxNrRinvii) {
                setTimeout(function () {
                    _this.aggiorna(interattivo, sync);
                }, 2000);
                return;
            }
            else {
                if (this.http.connessioneLenta) {
                    this.toastCtrl.create({
                        message: 'La connessione è assente o troppo lenta. Riprova ad aggiornare i dati più tardi.',
                        duration: 3000,
                        position: 'bottom'
                    }).then(function (toast) { toast.present(); }, function (toastErr) { _services_global_data_service__WEBPACK_IMPORTED_MODULE_3__["GlobalDataService"].log(2, 'Toast fallito!', toastErr); });
                }
            }
        }
        this.rinvioAggiornamento = false;
        this.nrRinvii = 0;
        this.sync.getJson(this.idServizio, sync).then(function (data) {
            // if (this.sync.dataIsChanged(this.accounts, data[0]))
            if (_this.sync.dataIsChanged(_this.accounts, data[0])) {
                // if (JSON.stringify(this.accounts) !== JSON.stringify(data[0])) {
                _this.accounts = data[0];
                if (_this.accounts) {
                    _this.nrAccounts = '(' + _this.accounts.length + ')';
                }
                else {
                    _services_global_data_service__WEBPACK_IMPORTED_MODULE_3__["GlobalDataService"].log(1, 'Nessun account per l\'utente!', null);
                    _this.accounts = [];
                    _this.nrAccounts = '';
                }
                _this.sync.dataIsChanged(_this.accounts, data[0]);
                // if (interattivo) loading.dismiss();
                setTimeout(function () {
                    _this.controllaAggiornamento();
                }, 1000);
            }
            _this.dataAggiornamento = _services_sync_service__WEBPACK_IMPORTED_MODULE_2__["SyncService"].dataAggiornamento(data);
        }, function (err) {
            if (interattivo) {
                _this.toastCtrl.create({
                    message: 'Non è stato possibile recuparate i dati dal server. Riprovare più tardi.',
                    duration: 3000
                }).then(function (toast) { toast.present(); }, function (toastErr) {
                    _services_global_data_service__WEBPACK_IMPORTED_MODULE_3__["GlobalDataService"].log(2, 'Toast fallito!', toastErr);
                });
                // loading.dismiss();
            }
        }).catch(function (err) {
            _services_global_data_service__WEBPACK_IMPORTED_MODULE_3__["GlobalDataService"].log(2, 'Eccezione ', err);
            // if (interattivo) loading.dismiss();
        });
    };
    AccountsPage.prototype.controllaAggiornamento = function () {
        var _this = this;
        // La verifica dell'aggiornamento in background la facciamo solo una volta
        if (this.aggiornamentoVerificato) {
            return;
        }
        // Se stiamo caricando dati dal server rimandiamo la verifica
        if (this.sync.loading[this.idServizio]) {
            setTimeout(function () {
                _this.controllaAggiornamento();
            }, 1000);
        }
        else {
            this.aggiornamentoVerificato = true;
            this.aggiorna(false, false);
        }
    };
    AccountsPage.prototype.doRefresh = function (refresher) {
        this.aggiorna(true, true);
        if (refresher) {
            refresher.target.complete();
        }
    };
    AccountsPage.prototype.selezionaIcona = function (item) {
        var nomeIcona = '';
        switch (item.platform) {
            case 'iOS':
                // nomeIcona = 'apple.svg';
                nomeIcona = 'apple2.svg';
                break;
            case 'Android':
                nomeIcona = 'android2.svg';
                break;
            case 'windows':
                nomeIcona = 'windows2.svg';
                break;
            case 'amazon-fireos':
                nomeIcona = 'amazon2.svg';
                break;
            default:
                nomeIcona = 'unimol2.svg';
                break;
        }
        return nomeIcona;
    };
    AccountsPage.prototype.onPress = function (item) {
        var _this = this;
        this.actionSheetCtrl.create({
            header: 'Disconnessione',
            buttons: [
                {
                    text: 'Disconnetti',
                    icon: 'trash',
                    handler: function () {
                        _this.disconnetti(item);
                    }
                }, {
                    text: 'Chiudi',
                    role: 'cancel',
                    icon: 'close',
                    handler: function () {
                        // console.log('Cancel clicked');
                    }
                }
            ]
        }).then(function (actionSheet) { return actionSheet.present(); });
    };
    AccountsPage.prototype.disconnetti = function (item) {
        var _this = this;
        if (item.token === this.tokenLocale || item.token === 'test') {
            this.toastCtrl.create({
                message: 'Per disconnettere il dispositivo in uso da questa schermata. ' +
                    'Usare la funzione Disconnetti nel menu laterale.',
                duration: 5000
            }).then(function (toast) { toast.present(); }, function (toastErr) { _services_global_data_service__WEBPACK_IMPORTED_MODULE_3__["GlobalDataService"].log(2, 'Toast fallito!', toastErr); });
        }
        else {
            this.account.disconnetti(item.token).then(function () {
                _this.globalData.goTo(_this.currentPage, '/preferenze', 'back', false);
            }, function (err) {
                _this.aggiorna(true, true);
                _services_global_data_service__WEBPACK_IMPORTED_MODULE_3__["GlobalDataService"].log(2, 'Disconnessione fallita!', err);
            });
            //
            // let body;
            //
            // body = JSON.stringify({
            //     token: item.token,
            // });
            //
            // this.loadingCtrl.create({
            //     message: 'Attendere...'
            // }).then(loading => {
            //
            //     loading.present();
            //
            //     this.ngZone.run(() => {
            //
            //         this.http.post(this.sync.getUrlDisconnetti(), body, {})
            //             .pipe(timeout(this.sync.getTimeout()))
            //             .subscribe(
            //                 data => {
            //                     loading.dismiss();
            //                     if (data) {
            //                         this.toastCtrl.create({
            //                             message: 'Il dispositivo è stato disconnesso.',
            //                             duration: 5000
            //                         }).then(
            //                             (toast) => {toast.present(); },
            //                             (toastErr) => {
            //                                 GlobalDataService.log(2, 'Toast fallito!', toastErr);
            //                             });
            //                         // this.navCtrl.pop();
            //                         this.navCtrl.navigateBack('/preferenze').then(
            //                             () => { },
            //                             (errNavigate => {
            //                                 GlobalDataService.log(
            //                                     2,
            //                                     'Errore nella chiamata al NavController ',
            //                                     errNavigate);
            //                             }));
            //                     } else {
            //                         this.toastCtrl.create({
            //                             message: 'Si è verificato un problema durante l\'elaborazione della richiesta.',
            //                             duration: 5000
            //                         }).then(
            //                             (toast) => {toast.present(); },
            //                             (toastErr) => {
            //                                 GlobalDataService.log(2, 'Toast fallito!', toastErr);
            //                             });
            //                         // this.navCtrl.pop();
            //                         this.navCtrl.navigateBack('/preferenze').then(
            //                             () => { },
            //                             (errNavigate => {
            //                                 GlobalDataService.log(
            //                                     2,
            //                                     'Errore nella chiamata al NavController ',
            //                                     errNavigate);
            //                             }));
            //                     }
            //                     this.aggiorna(true, true);
            //                 },
            //                 err => {
            //                     loading.dismiss();
            //                     GlobalDataService.log(
            //                         2,
            //                         'Nessuna connessione ad Internet',
            //                         err);
            //                     this.toastCtrl.create({
            //                         message: 'Nessuna connessione ad Internet. ' +
            //                         'Per poter scollegare un dispoditivo devi essere connesso ad Internet.',
            //                         duration: 10000
            //                     }).then(
            //                         (toast) => {toast.present(); },
            //                         (toastErr) => {
            //                             GlobalDataService.log(2, 'Toast fallito!', toastErr);
            //                         });
            //                 });
            //     });
            // });
        }
    };
    AccountsPage.prototype.timestamp2string = function (date) {
        return _services_global_data_service__WEBPACK_IMPORTED_MODULE_3__["GlobalDataService"].timestamp2string(date);
    };
    AccountsPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-accounts',
            template: __webpack_require__(/*! ./accounts.page.html */ "./src/app/pages/account/accounts/accounts.page.html"),
            styles: [__webpack_require__(/*! ./accounts.page.scss */ "./src/app/pages/account/accounts/accounts.page.scss")]
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ToastController"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"],
            _services_http_service__WEBPACK_IMPORTED_MODULE_6__["HttpService"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_4__["Storage"],
            _services_sync_service__WEBPACK_IMPORTED_MODULE_2__["SyncService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ActionSheetController"],
            _services_global_data_service__WEBPACK_IMPORTED_MODULE_3__["GlobalDataService"],
            _services_account_service__WEBPACK_IMPORTED_MODULE_5__["AccountService"]])
    ], AccountsPage);
    return AccountsPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-account-accounts-accounts-module.js.map