(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-carriera-appelli-appelli-module"],{

/***/ "./src/app/pages/carriera/appelli/appelli.html":
/*!*****************************************************!*\
  !*** ./src/app/pages/carriera/appelli/appelli.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-grid no-padding>\n    <ion-row *ngIf=\"!globalData.landscape && globalData.iPhoneX\">\n      <ion-col>\n        <ion-label> </ion-label>\n      </ion-col>\n    </ion-row>\n    <ion-row no-padding>\n      <ion-col no-padding>\n        <ion-toolbar>\n          <ion-buttons slot=\"start\">\n            <ion-menu-button></ion-menu-button>\n          </ion-buttons>\n          <ion-title>\n            Appelli\n          </ion-title>\n          <ion-buttons slot=\"end\">\n            <ion-back-button *ngIf=\"insegnamento\" defaultHref=\"/carriera\" text=\"Indietro\"></ion-back-button>\n          </ion-buttons>\n        </ion-toolbar>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-header>\n\n<ion-content [ngSwitch]=\"sezioni\">\n\n  <ion-refresher *ngIf=\"!insegnamento\" (ionRefresh)=\"doRefresh($event)\" slot=\"fixed\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <ion-toolbar>\n    <ion-segment [(ngModel)]=\"sezioni\" (ionChange)=\"ngOnInit()\">\n      <ion-segment-button value=\"disponibili\">Disponibili {{nrAppelli}}</ion-segment-button>\n      <ion-segment-button value=\"prenotati\">Prenotati {{nrPrenotazioni}}</ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n\n  <ion-list *ngSwitchCase=\"'disponibili'\" >\n    <ion-grid *ngIf=\"rinvioAggiornamento && appelli?.length == 0\" text-center>\n      <ion-row>\n        <ion-col>\n          <img class=\"progress\" src=\"assets/img/progress.gif\" />\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col text-center>\n          <ion-title><strong>Aggiornamento in corso</strong></ion-title>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col text-center>\n          <ion-label>un attimo di pazienza</ion-label>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n    <ion-item *ngIf=\"!rinvioAggiornamento && appelli?.length == 0\" text-center>\n      <ion-grid>\n        <ion-row>\n          <ion-col text-center>\n            <h2>Non sono disponibili appelli</h2>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col>\n            <img src=\"assets/img/sad.png\" />\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-item>\n\n    <ion-grid *ngIf=\"appelli?.length > 0\" text-center>\n      <ion-row>\n        <ion-col>\n          <ion-item-sliding #slItem *ngFor=\"let item of appelli\">\n\n            <ion-item>\n              <ion-grid fixed>\n                <ion-row>\n                  <ion-col text-wrap>\n                    <div><b>{{ pulisciTesto(item.descrizione) }}</b></div>\n                  </ion-col>\n                </ion-row>\n                <ion-row *ngIf=\"item.p10_app_des && item.p10_app_des != item.descrizione\">\n                  <ion-col text-wrap>\n                    <div>{{ item.p10_app_des }}</div>\n                  </ion-col>\n                </ion-row>\n\n                <ion-row>\n                  <ion-col size=\"1\">\n                    <ion-icon name=\"time\"></ion-icon>\n                  </ion-col>\n                  <ion-col size=\"9\">\n                    <div>{{item.data_ora_app | slice:0:16}}</div>\n                  </ion-col>\n                </ion-row>\n\n                <ion-row>\n                  <ion-col size=\"1\">\n                    <ion-icon name=\"calendar\"></ion-icon>\n                  </ion-col>\n                  <ion-col size=\"9\">\n                    <div>{{item.p10_app_data_inizio_iscr | slice:0:10}} - {{item.p10_app_data_fine_iscr | slice:0:10}}</div>\n                  </ion-col>\n                </ion-row>\n\n                <ion-row>\n                  <ion-col size=\"1\">\n                    <ion-icon name=\"settings\"></ion-icon>\n                  </ion-col>\n                  <ion-col size=\"3\">\n                    <div>{{item.tipo_iscr_des}}</div>\n                  </ion-col>\n                  <ion-col size=\"1\">\n                    <ion-icon name=\"information-circle\"></ion-icon>\n                  </ion-col>\n                  <ion-col size=\"4\">\n                    <div>{{item.codice}}</div>\n                  </ion-col>\n                  <ion-col *ngIf=\"item.prenotabile_flg==0\" size=\"1\">\n                    <ion-icon style=\"color:red\" name=\"people\"></ion-icon>\n                  </ion-col>\n                  <ion-col *ngIf=\"item.prenotabile_flg!=0\" size=\"1\">\n                    <ion-icon style=\"color:green\" name=\"person-add\"></ion-icon>\n                  </ion-col>\n                  <ion-col size=\"2\">\n                    <div>{{item.tot_iscritti}}</div>\n                  </ion-col>\n                </ion-row>\n\n              </ion-grid>\n            </ion-item>\n\n            <ion-item-options side=\"end\" slot=\"top\">\n              <ion-item-option (click)=\"prenotaAppello(slItem, item)\">\n                Prenota\n              </ion-item-option>\n            </ion-item-options>\n          </ion-item-sliding>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-list>\n\n\n  <ion-list *ngSwitchCase=\"'prenotati'\" >\n\n    <ion-grid *ngIf=\"rinvioAggiornamento && prenotazioni?.length == 0\" text-center>\n      <ion-row>\n        <ion-col>\n          <img class=\"progress\" src=\"assets/img/progress.gif\" />\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col text-center>\n          <ion-title><strong>Aggiornamento in corso</strong></ion-title>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col text-center>\n          <ion-label>un attimo di pazienza</ion-label>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n    <ion-item *ngIf=\"!rinvioAggiornamento && prenotazioni?.length == 0\" text-center>\n      <ion-grid>\n        <ion-row>\n          <ion-col text-center>\n            <h2>Non sono state effettuate prenotazioni</h2>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-item>\n\n    <ion-grid *ngIf=\"prenotazioni?.length > 0\" text-center>\n      <ion-row>\n        <ion-col>\n          <ion-item-sliding #slItem *ngFor=\"let prenotazione of prenotazioni\">\n            <ion-item>\n              <ion-grid fixed>\n                <ion-row>\n                  <ion-col text-wrap>\n                    <div><b>{{ pulisciTesto(prenotazione.ad_des) }}</b></div>\n                  </ion-col>\n                </ion-row>\n                <ion-row *ngIf=\"prenotazione.app_des && prenotazione.app_des != prenotazione.ad_des\">\n                  <ion-col text-wrap>\n                    <div>{{ prenotazione.app_des }}</div>\n                  </ion-col>\n                </ion-row>\n\n                <ion-row>\n                  <ion-col size=\"1\">\n                    <ion-icon name=\"person\"></ion-icon>\n                  </ion-col>\n                  <ion-col size=\"11\">\n                    <div>{{ prenotazione.presidente }}</div>\n                  </ion-col>\n                </ion-row>\n\n                <ion-row>\n                  <ion-col size=\"1\">\n                    <ion-icon name=\"time\"></ion-icon>\n                  </ion-col>\n                  <ion-col size=\"11\">\n                    <div>{{prenotazione.data_ora_app  | slice:0:16}}</div>\n                  </ion-col>\n                </ion-row>\n\n                <ion-row>\n                  <ion-col size=\"1\">\n                    <ion-icon name=\"settings\"></ion-icon>\n                  </ion-col>\n                  <ion-col size=\"3\">\n                    <div>{{prenotazione.tipo_iscr}}</div>\n                  </ion-col>\n                  <ion-col size=\"1\">\n                    <ion-icon name=\"information-circle\"></ion-icon>\n                  </ion-col>\n                  <ion-col size=\"4\">\n                    <div>{{prenotazione.ad_cod}}</div>\n                  </ion-col>\n                  <ion-col size=\"1\">\n                    <ion-icon name=\"list\"></ion-icon>\n                  </ion-col>\n                  <ion-col size=\"2\">\n                    <div>{{prenotazione.posiz}}</div>\n                  </ion-col>\n                </ion-row>\n              </ion-grid>\n            </ion-item>\n\n            <!--\n            <ion-item-options side=\"end\" slot=\"top\">\n              <ion-button (click)=\"cancellaPrenotazione(slItem, prenotazione)\" color=\"danger\">\n                <ion-icon name=\"trash\"></ion-icon>\n                Cancella\n              </ion-button>\n            </ion-item-options>\n            -->\n            <ion-item-options side=\"end\" slot=\"top\">\n              <ion-item-option color=\"danger\" (click)=\"cancellaPrenotazione(slItem, prenotazione)\">\n                <ion-icon slot=\"icon-only\" name=\"trash\"></ion-icon>\n              </ion-item-option>\n            </ion-item-options>\n          </ion-item-sliding>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-list>\n\n</ion-content>\n\n<ion-footer  no-padding>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-spinner [hidden]=\"!isLoading() || !http.getConnected()\"></ion-spinner>\n      <fa-icon [hidden]=\"isLoading() || !http.getConnected()\" [icon]=\"globalData.faLink\"></fa-icon>\n      <fa-icon [hidden]=\"isLoading() || http.getConnected()\"  [icon]=\"globalData.faUnlink\"></fa-icon>\n    </ion-buttons>\n    <div class=\"testo-footer\" *ngIf=\"sezioni=='disponibili'\">\n      Aggiornato al: {{dataAggiornamentoDisponibili}}\n    </div>\n    <div class=\"testo-footer\" *ngIf=\"sezioni=='prenotati'\">\n      Aggiornato al: {{dataAggiornamentoPrenotati}}\n    </div>\n    <ion-buttons slot=\"end\" no-padding>\n      <ion-icon slot=\"icon-only\" src=\"assets/icon/blank.png\"></ion-icon>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-footer>\n\n"

/***/ }),

/***/ "./src/app/pages/carriera/appelli/appelli.module.ts":
/*!**********************************************************!*\
  !*** ./src/app/pages/carriera/appelli/appelli.module.ts ***!
  \**********************************************************/
/*! exports provided: AppelliPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppelliPageModule", function() { return AppelliPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _appelli__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./appelli */ "./src/app/pages/carriera/appelli/appelli.ts");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AppelliPageModule = /** @class */ (function () {
    function AppelliPageModule() {
    }
    AppelliPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"],
                _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _appelli__WEBPACK_IMPORTED_MODULE_5__["AppelliPage"]
                    }
                ])
            ],
            declarations: [_appelli__WEBPACK_IMPORTED_MODULE_5__["AppelliPage"]]
        })
    ], AppelliPageModule);
    return AppelliPageModule;
}());



/***/ }),

/***/ "./src/app/pages/carriera/appelli/appelli.ts":
/*!***************************************************!*\
  !*** ./src/app/pages/carriera/appelli/appelli.ts ***!
  \***************************************************/
/*! exports provided: AppelliPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppelliPage", function() { return AppelliPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_sync_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/sync.service */ "./src/app/services/sync.service.ts");
/* harmony import */ var _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/global-data.service */ "./src/app/services/global-data.service.ts");
/* harmony import */ var _services_account_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/account.service */ "./src/app/services/account.service.ts");
/* harmony import */ var _services_esse3_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/esse3.service */ "./src/app/services/esse3.service.ts");
/* harmony import */ var _services_http_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/http.service */ "./src/app/services/http.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








// import {cursorTo} from "readline";
var AppelliPage = /** @class */ (function () {
    function AppelliPage(route, sync, http, toastCtrl, alertCtrl, loadingCtrl, globalData, account, esse3) {
        var _this = this;
        this.route = route;
        this.sync = sync;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.globalData = globalData;
        this.account = account;
        this.esse3 = esse3;
        this.currentPage = '/appelli';
        this.idServizioDisponibili = 1;
        this.idServizioPrenotati = 10;
        this.nrAppelli = '';
        this.nrPrenotazioni = '';
        this.dataAggiornamentoDisponibili = 'Mai';
        this.dataAggiornamentoPrenotati = 'Mai';
        this.aggiornamentoDisponibiliVerificato = false;
        this.aggiornamentoPrenotatiVerificato = false;
        this.rinvioAggiornamento = false;
        this.nrRinvii = 0;
        this.maxNrRinvii = 5;
        if (this.sezioni == null) {
            this.sezioni = 'disponibili';
        }
        this.route.params.subscribe(function (params) {
            _this.insegnamento = params['insegnamento'];
        });
    }
    AppelliPage.prototype.ngOnChanges = function () {
        this.ngOnInit();
    };
    AppelliPage.prototype.ngOnInit = function () {
        var _this = this;
        this.globalData.srcPage = this.currentPage;
        this.account.controllaAccount().then(function (ok) {
            _this.http.getConnected();
            _this.aggiorna(false, true);
            _this.insegnamento = _this.route.snapshot.paramMap.get('id');
        }, function (err) {
            _this.globalData.goTo(_this.currentPage, '/login', 'root', false);
        });
    };
    AppelliPage.prototype.aggiorna = function (interattivo, sync) {
        var _this = this;
        if (this.sync.loading[this.idServizioDisponibili]) {
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
                    }).then(function (toast) { toast.present(); }, function (toastErr) { _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"].log(2, 'Toast fallito!', toastErr); });
                }
            }
        }
        this.rinvioAggiornamento = false;
        this.nrRinvii = 0;
        this.sync.getJson(this.idServizioDisponibili, sync).then(function (data) {
            var newData = data[0];
            // Ottimizziamo il refresh ignorandolo in caso di dati non modificati
            // TODO: si potrebbe ottimizzare il contronto tra array con qualcosa di più efficiente dello stringify
            if (JSON.stringify(_this.appelli) !== JSON.stringify(newData)) {
                _this.appelli = data[0];
                _this.dataAggiornamentoDisponibili = _services_sync_service__WEBPACK_IMPORTED_MODULE_3__["SyncService"].dataAggiornamento(data);
                if (_this.insegnamento != null) {
                    var val_1 = _this.insegnamento;
                    if (val_1 && val_1.trim() !== '') {
                        _this.appelli = data[0].filter(function (item) {
                            return (item.codice === val_1);
                        });
                    }
                }
                if (_this.appelli.length > 0) {
                    _this.nrAppelli = '(' + _this.appelli.length + ')';
                }
                else {
                    _this.nrAppelli = '';
                }
                setTimeout(function () {
                    _this.controllaAggiornamentoDisponibili();
                }, 1000);
            }
        }, function (err) {
            console.log('Errore in aggiorna: ' + err);
        }).catch(function (err) {
            console.log('Eccezione in aggiorna: ' + err);
        });
        if (this.sync.loading[this.idServizioPrenotati]) {
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
                    }).then(function (toast) { toast.present(); }, function (toastErr) { _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"].log(2, 'Toast fallito!', toastErr); });
                }
            }
        }
        this.rinvioAggiornamento = false;
        this.nrRinvii = 0;
        this.sync.getJson(this.idServizioPrenotati, sync).then(function (data) {
            var newData = data[0];
            // console.dir(newData);
            if (JSON.stringify(_this.prenotazioni) !== JSON.stringify(newData)) {
                _this.prenotazioni = data[0];
                // console.dir(this.prenotazioni);
                _this.dataAggiornamentoPrenotati = _services_sync_service__WEBPACK_IMPORTED_MODULE_3__["SyncService"].dataAggiornamento(data);
                if (_this.prenotazioni.length > 0) {
                    _this.nrPrenotazioni = '(' + _this.prenotazioni.length + ')';
                }
                else {
                    _this.nrPrenotazioni = '';
                }
                setTimeout(function () {
                    _this.controllaAggiornamentoPrenotati();
                }, 1000);
            }
        }, function (err) {
            console.log('Errore in aggiorna: ' + err);
        }).catch(function (err) {
            console.log('Eccezione in aggiorna: ' + err);
        });
    };
    AppelliPage.prototype.controllaAggiornamentoDisponibili = function () {
        var _this = this;
        // La verifica dell'aggiornamento in background la facciamo solo una volta
        if (this.aggiornamentoDisponibiliVerificato) {
            return;
        }
        // Se stiamo caricando dati dal server rimandiamo la verifica
        if (this.sync.loading[this.idServizioDisponibili]) {
            setTimeout(function () {
                _this.controllaAggiornamentoDisponibili();
            }, 1000);
        }
        else {
            this.aggiornamentoDisponibiliVerificato = true;
            this.aggiorna(false, false);
        }
    };
    AppelliPage.prototype.controllaAggiornamentoPrenotati = function () {
        var _this = this;
        // La verifica dell'aggiornamento in background la facciamo solo una volta
        if (this.aggiornamentoPrenotatiVerificato) {
            return;
        }
        // Se stiamo caricando dati dal server rimandiamo la verifica
        if (this.sync.loading[this.idServizioPrenotati]) {
            setTimeout(function () {
                _this.controllaAggiornamentoPrenotati();
            }, 1000);
        }
        else {
            this.aggiornamentoPrenotatiVerificato = true;
            this.aggiorna(false, false);
        }
    };
    AppelliPage.prototype.isLoading = function () {
        switch (this.sezioni) {
            case 'disponibili':
                return this.sync.loading[this.idServizioDisponibili];
            default:
                return this.sync.loading[this.idServizioPrenotati];
        }
    };
    AppelliPage.prototype.doRefresh = function (refresher) {
        refresher.target.complete();
        this.aggiorna(true, true);
    };
    AppelliPage.prototype.onGoBack = function () {
        this.globalData.goTo(this.currentPage, '/libretto', 'backward', false);
    };
    AppelliPage.prototype.prenotaAppello = function (item, appello) {
        var _this = this;
        var data_oggi = new Date();
        var data_inizio_iscrizione = appello.p10_app_data_inizio_iscr;
        data_inizio_iscrizione = data_inizio_iscrizione.split(' ');
        var data_inizio_split = data_inizio_iscrizione[0].split('/');
        var inizio_prenotazione = new Date(data_inizio_split[2], data_inizio_split[1] - 1, data_inizio_split[0]);
        var prima_data = new Date(inizio_prenotazione);
        if (data_oggi >= prima_data) {
            var data_fine_iscrizione = appello.p10_app_data_fine_iscr;
            data_fine_iscrizione = data_fine_iscrizione.split(' ');
            var data_limite_split = data_fine_iscrizione[0].split('/');
            var scadenza_prenotazione = new Date(data_limite_split[2], data_limite_split[1] - 1, data_limite_split[0]);
            var ultima_data = new Date(scadenza_prenotazione);
            if (data_oggi <= ultima_data) {
                this.alertCtrl.create({
                    header: 'Prenotazione',
                    subHeader: 'Vuoi prenotarti all\'appello?',
                    message: 'La richiesta di prenotazione sarà inviata al portale dello studente.',
                    buttons: [
                        {
                            text: 'No',
                            handler: function () {
                                item.close();
                                // console.log('Appello non prenotato!');
                            }
                        },
                        {
                            text: 'Si',
                            handler: function () {
                                _this.loadingCtrl.create().then(function (loading) {
                                    loading.present();
                                    _this.esse3.prenotaAppello(appello.p10_app_app_id, appello.p10_app_ad_id, appello.adsce_id).then(function (data) {
                                        // console.dir(data);
                                        _this.aggiorna(false, true);
                                        // TODO
                                        if (data['_body'] === 'success') {
                                            _this.aggiorna(true, true);
                                            loading.dismiss();
                                            _this.toastCtrl.create({
                                                message: 'Prenotazione inviata! Verifica nella scheda delle ' +
                                                    'prenotazioni l\'esito del\'operazione!',
                                                duration: 3000
                                            }).then(function (toast) { toast.present(); }, function (toastErr) { _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"].log(2, 'Toast fallito!', toastErr); });
                                            setTimeout(function () {
                                                _this.aggiorna(true, true);
                                            }, 1000);
                                        }
                                        else {
                                            loading.dismiss();
                                            _this.toastCtrl.create({
                                                message: 'Errore: ' + data['_body'],
                                                duration: 4000
                                            }).then(function (toast) { toast.present(); }, function (toastErr) { _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"].log(2, 'Toast fallito!', toastErr); });
                                        }
                                    }, function (err) {
                                        loading.dismiss();
                                        _this.toastCtrl.create({
                                            message: 'Si è verificato un problema durante l\'invio della prenotazione. ' +
                                                'Riprova più tardi.',
                                            duration: 3000
                                        }).then(function (toast) { toast.present(); }, function (toastErr) { _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"].log(2, 'Toast fallito!', toastErr); });
                                    });
                                });
                            }
                        }
                    ]
                }).then(function (alert) { return alert.present(); });
            }
            else {
                item.close();
                this.toastCtrl.create({
                    message: 'Il Termine ultimo per prenotarsi è Scaduto',
                    duration: 3000
                }).then(function (toast) { toast.present(); }, function (toastErr) { _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"].log(2, 'Toast fallito!', toastErr); });
            }
        }
        else {
            item.close();
            this.toastCtrl.create({
                message: 'Non è possibile ancora possibile prenotarsi all\'appello.',
                duration: 3000
            }).then(function (toast) { toast.present(); }, function (toastErr) { _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"].log(2, 'Toast fallito!', toastErr); });
        }
    };
    AppelliPage.prototype.cancellaPrenotazione = function (item, prenotazione) {
        var _this = this;
        var data_limite_cancellazione = prenotazione.data_ora_app;
        data_limite_cancellazione = data_limite_cancellazione.split(' ');
        var data_limite_split = data_limite_cancellazione[0].split('/');
        var scadenza_cancellazione = new Date(data_limite_split[2], data_limite_split[1] - 1, data_limite_split[0]);
        var scad_data = scadenza_cancellazione.setDate(scadenza_cancellazione.getDate() - 5);
        var ultima_data = new Date(scad_data);
        var data_oggi = new Date();
        if (data_oggi <= ultima_data) {
            this.alertCtrl.create({
                header: 'Prenotazione',
                subHeader: 'Vuoi cancellare la prenotazione?',
                message: 'Ricorda che se la finestra per la prenotazione è chiusa non sarà più possibile prenotarsi all\'appello!',
                buttons: [
                    {
                        text: 'No',
                        handler: function () {
                            item.close();
                            // console.log('Prenotazione non cancellata!');
                        }
                    },
                    {
                        text: 'Si',
                        handler: function () {
                            _this.loadingCtrl.create().then(function (loading) {
                                loading.present();
                                _this.esse3.cancellaPrenotazione(prenotazione.app_id, prenotazione.ad_id, prenotazione.adsce_id).then(function (data) {
                                    // console.dir(data);
                                    if (data['_body'] === 'success') {
                                        _this.aggiorna(false, true);
                                        loading.dismiss();
                                        _this.toastCtrl.create({
                                            message: 'Cancellazione inviata! Verifica sempre se l\'invio ha avuto successo!',
                                            duration: 3000
                                        }).then(function (toast) { toast.present(); }, function (toastErr) { _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"].log(2, 'Toast fallito!', toastErr); });
                                        setTimeout(function () {
                                            _this.aggiorna(true, true);
                                        }, 1000);
                                    }
                                    else {
                                        loading.dismiss();
                                        _this.toastCtrl.create({
                                            message: 'Errore: ' + data['_body'],
                                            duration: 4000
                                        }).then(function (toast) { toast.present(); }, function (toastErr) { _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"].log(2, 'Toast fallito!', toastErr); });
                                        _this.aggiorna(false, true);
                                    }
                                }, function (err) {
                                    // console.log(err);
                                    loading.dismiss();
                                    _this.toastCtrl.create({
                                        message: 'Si è verificato un problema durante l\'invio della prenotazione. Riprova più tardi.',
                                        duration: 3000
                                    }).then(function (toast) { toast.present(); }, function (toastErr) { _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"].log(2, 'Toast fallito!', toastErr); });
                                });
                            });
                        }
                    }
                ]
            }).then(function (alert) { return alert.present(); });
        }
        else {
            item.close();
            this.toastCtrl.create({
                message: 'Non è possibile cancellare l\'appello.',
                duration: 3000
            }).then(function (toast) { toast.present(); }, function (toastErr) { _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"].log(2, 'Toast fallito!', toastErr); });
        }
    };
    AppelliPage.prototype.pulisciTesto = function (item) {
        return item.replace(/\\r\\n|\\r|\\n/g, '').replace('?', '\'');
    };
    AppelliPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-appelli',
            template: __webpack_require__(/*! ./appelli.html */ "./src/app/pages/carriera/appelli/appelli.html"),
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _services_sync_service__WEBPACK_IMPORTED_MODULE_3__["SyncService"],
            _services_http_service__WEBPACK_IMPORTED_MODULE_7__["HttpService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ToastController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["LoadingController"],
            _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"],
            _services_account_service__WEBPACK_IMPORTED_MODULE_5__["AccountService"],
            _services_esse3_service__WEBPACK_IMPORTED_MODULE_6__["Esse3Service"]])
    ], AppelliPage);
    return AppelliPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-carriera-appelli-appelli-module.js.map