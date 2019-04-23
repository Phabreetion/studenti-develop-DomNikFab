(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-notifiche-notifiche-module"],{

/***/ "./src/app/pages/notifiche/notifiche.html":
/*!************************************************!*\
  !*** ./src/app/pages/notifiche/notifiche.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-grid no-padding>\n    <ion-row *ngIf=\"!globalData.landscape && globalData.iPhoneX\">\n      <ion-col>\n        <ion-label> </ion-label>\n      </ion-col>\n    </ion-row>\n    <ion-row no-padding>\n      <ion-col no-padding>\n        <ion-toolbar>\n          <ion-buttons slot=\"start\">\n            <ion-menu-button></ion-menu-button>\n          </ion-buttons>\n          <ion-title *ngIf='!showSearchBar'>\n            Notifiche ({{nrElementiFiltrati}}/{{nrElementi}})\n          </ion-title>\n          <ion-searchbar *ngIf='showSearchBar'\n                         [@flyInOut]=\"flyInOutState\"\n                         [(ngModel)]=\"searchTerm\"\n                         (click)=\"setFiltro()\"\n                         (ionChange)=\"setFiltro()\"\n                         (ionCancel)=\"onSearchCancel()\"\n                         (ionClear)=\"onSearchCancel()\">\n          </ion-searchbar>\n          <ion-buttons slot=\"end\">\n            <ion-button icon-only (click)=\"toggleInOut()\">\n              <ion-icon name=\"search\" color=\"primary\" style=\"font-size: 1.5em;\"></ion-icon>\n            </ion-button>\n          </ion-buttons>\n        </ion-toolbar>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-header>\n\n<ion-content>\n\n  <!--\n  <ion-refresher (ionRefresh)=\"doRefresh($event)\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  -->\n\n  <ion-grid *ngIf=\"rinvioAggiornamento && !notificheFiltrate\" text-center no-padding>\n    <ion-row>\n      <ion-col text-center>\n        <img class=\"progress\" src=\"assets/img/progress.gif\" />\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col text-center>\n        <ion-title><strong>Aggiornamento in corso</strong></ion-title>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col text-center>\n        <ion-label>un attimo di pazienza</ion-label>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-grid>\n    <ion-row *ngIf=\"!rinvioAggiornamento && notificheFiltrate?.length == 0\">\n      <ion-col>\n        <ion-list>\n          <ion-item text-center>\n            <ion-grid no-padding>\n              <ion-row>\n                <ion-col>\n                  <h2>Nessuna notifica presente</h2>\n                </ion-col>\n              </ion-row>\n              <ion-row>\n                <ion-col>\n                  <img class=\"logo\" src=\"assets/img/sad.png\" />\n                </ion-col>\n              </ion-row>\n            </ion-grid>\n          </ion-item>\n        </ion-list>\n      </ion-col>\n    </ion-row>\n    <ion-row [hidden]=\"notificheFiltrate?.length == 0\">\n      <ion-col no-padding>\n        <ion-list>\n          <ion-item-sliding *ngFor=\"let item of notificheFiltrate\">\n            <ion-item (click)=\"showDetails(item)\">\n              <ion-grid fixed no-padding>\n                <ion-row>\n                  <ion-col size=\"1\" align-self-center=\"true\">\n                    <ion-icon style=\"font-size: 1.5em;\" name={{icons[item.tipo]}} color={{colors[item.tipo]}}></ion-icon>\n                  </ion-col>\n                  <ion-col size=\"11\">\n                    <ion-grid>\n                      <ion-row>\n                        <ion-col>\n                          <div class=\"news-date\">{{ date2string(item.data) }}</div>\n                        </ion-col>\n                      </ion-row>\n                      <ion-row>\n                        <ion-col>\n                          <ion-text color={{colors[item.tipo]}}><b>{{ item.titolo }}</b></ion-text>\n                        </ion-col>\n                      </ion-row>\n                      <ion-row>\n                        <ion-col>\n                          <div class=\"ellipsis\" text-wrap>{{ pulisciTesto(item.messaggio)}}</div>\n                        </ion-col>\n                      </ion-row>\n                    </ion-grid>\n                  </ion-col>\n                </ion-row>\n              </ion-grid>\n\n            </ion-item>\n\n            <ion-item-options side=\"end\">\n              <ion-item-option (click)=\"showDetails(item)\" color=\"primary\">\n                Mostra\n              </ion-item-option>\n            </ion-item-options>\n          </ion-item-sliding>\n        </ion-list>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-infinite-scroll threshold=\"100px\" (ionInfinite)=\"loadData($event)\">\n    <ion-infinite-scroll-content\n            loadingSpinner=\"bubbles\"\n            loadingText=\"Caricamento dati...\">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n\n</ion-content>\n\n<ion-footer no-padding>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-spinner [hidden]=\"!isLoading() || !http.getConnected()\"></ion-spinner>\n      <fa-icon [hidden]=\"isLoading() || !http.getConnected()\" [icon]=\"globalData.faLink\"></fa-icon>\n      <fa-icon [hidden]=\"isLoading() || http.getConnected()\"  [icon]=\"globalData.faUnlink\"></fa-icon>\n    </ion-buttons>\n\n    <div class=\"testo-footer\">\n      Aggiornato al: {{dataAggiornamento}}\n    </div>\n\n    <ion-buttons slot=\"end\" no-padding>\n      <ion-icon slot=\"icon-only\" src=\"assets/icon/blank.png\"></ion-icon>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-footer>\n\n"

/***/ }),

/***/ "./src/app/pages/notifiche/notifiche.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/pages/notifiche/notifiche.module.ts ***!
  \*****************************************************/
/*! exports provided: NotifichePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotifichePageModule", function() { return NotifichePageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _notifiche__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./notifiche */ "./src/app/pages/notifiche/notifiche.ts");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var NotifichePageModule = /** @class */ (function () {
    function NotifichePageModule() {
    }
    NotifichePageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"],
                _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _notifiche__WEBPACK_IMPORTED_MODULE_5__["NotifichePage"]
                    }
                ])
            ],
            declarations: [_notifiche__WEBPACK_IMPORTED_MODULE_5__["NotifichePage"]]
        })
    ], NotifichePageModule);
    return NotifichePageModule;
}());



/***/ }),

/***/ "./src/app/pages/notifiche/notifiche.scss":
/*!************************************************!*\
  !*** ./src/app/pages/notifiche/notifiche.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".ellipsis {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-height: 2em;\n  line-height: 1em;\n  text-overflow-mode: ellipsis;\n  text-overflow-ellipsis: '[...]';\n  padding: 0px 2px; }\n\n.news-date {\n  font-size: 0.9rem;\n  font-weight: bold;\n  padding: 0px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbnRvbmlvX21hc3Ryb3Bhb2xvL0Rlc2t0b3AvbW9kaWZpY2hlQVBQL3N0dWRlbnRpLW1hc3Rlci9zcmMvYXBwL3BhZ2VzL25vdGlmaWNoZS9ub3RpZmljaGUuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG1CQUFtQjtFQUNuQixnQkFBZ0I7RUFDaEIsdUJBQXVCO0VBQ3ZCLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsNEJBQTRCO0VBQzVCLCtCQUErQjtFQUMvQixnQkFBZ0IsRUFBQTs7QUFFbEI7RUFDRSxpQkFBaUI7RUFDakIsaUJBQWlCO0VBQ2pCLFlBQVksRUFBQSIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL25vdGlmaWNoZS9ub3RpZmljaGUuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5lbGxpcHNpcyB7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICBtYXgtaGVpZ2h0OiAyZW07XG4gIGxpbmUtaGVpZ2h0OiAxZW07XG4gIHRleHQtb3ZlcmZsb3ctbW9kZTogZWxsaXBzaXM7XG4gIHRleHQtb3ZlcmZsb3ctZWxsaXBzaXM6ICdbLi4uXSc7XG4gIHBhZGRpbmc6IDBweCAycHg7XG59XG4ubmV3cy1kYXRlIHtcbiAgZm9udC1zaXplOiAwLjlyZW07XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBwYWRkaW5nOiAwcHg7XG59Il19 */"

/***/ }),

/***/ "./src/app/pages/notifiche/notifiche.ts":
/*!**********************************************!*\
  !*** ./src/app/pages/notifiche/notifiche.ts ***!
  \**********************************************/
/*! exports provided: NotifichePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotifichePage", function() { return NotifichePage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/global-data.service */ "./src/app/services/global-data.service.ts");
/* harmony import */ var _services_sync_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/sync.service */ "./src/app/services/sync.service.ts");
/* harmony import */ var _services_account_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/account.service */ "./src/app/services/account.service.ts");
/* harmony import */ var _services_http_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/http.service */ "./src/app/services/http.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var NotifichePage = /** @class */ (function () {
    function NotifichePage(toastCtrl, http, storage, globalData, account, sync, modalCtrl, alertCtrl) {
        this.toastCtrl = toastCtrl;
        this.http = http;
        this.storage = storage;
        this.globalData = globalData;
        this.account = account;
        this.sync = sync;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.currentPage = '/notifiche';
        this.idServizio = 13;
        this.notifiche = [];
        this.notificheFiltrate = [];
        this.color = 'primary';
        this.searchTerm = '';
        this.flyInOutState = 'in';
        this.showSearchBar = false;
        this.aggiornamentoVerificato = false;
        this.rinvioAggiornamento = false;
        this.nrRinvii = 0;
        this.maxNrRinvii = 5;
        this.colors = { 1: 'primary', 2: 'secondary', 3: 'danger', 4: 'primary', 5: 'primary' };
        this.icons = { 1: 'information-circle', 2: 'information-circle', 3: 'information-circle', 4: 'bookmark', 5: 'ribbon' };
        this.step = 20;
        this.mostraTutti = false;
        this.mostraPrimi = true;
        this.nrElementi = 0;
        this.nrElementiFiltrati = 0;
        this.nrElementiDaMostrare = this.step;
        this.nrElementiNascosti = 0;
    }
    NotifichePage.prototype.ngOnInit = function () {
        var _this = this;
        this.globalData.srcPage = '/notifiche';
        this.account.controllaAccount().then(function () {
            _this.storage.get('step').then(function (value) {
                if (value != null) {
                    _this.step = parseInt(value, 10);
                    _this.nrElementiDaMostrare = _this.step;
                }
            });
            _this.notificheFiltrate = [];
            _this.aggiorna(false, true);
        }, function () {
            _this.globalData.goTo(_this.currentPage, '/login', 'root', false);
        });
    };
    NotifichePage.prototype.loadData = function (event) {
        var _this = this;
        setTimeout(function () {
            _this.nrElementiDaMostrare += _this.step;
            _this.setFiltro();
            event.target.complete();
            // Se non ci sono ulteriori elementi, disabilitiamo lo scroll
            if (_this.nrElementiDaMostrare >= _this.nrElementi) {
                event.target.disabled = true;
            }
        }, 500);
    };
    NotifichePage.prototype.troppi = function () {
        return (!this.mostraTutti && this.notificheFiltrate && this.notificheFiltrate.length > 100);
    };
    NotifichePage.prototype.onMostraProssimi = function () {
        this.nrElementiDaMostrare += this.step;
        this.setFiltro();
    };
    NotifichePage.prototype.onMostraTutti = function () {
        var _this = this;
        this.mostraPrimi = false;
        this.setFiltro();
        if (this.troppi()) {
            this.alertCtrl.create({
                header: 'Sei sicuro?',
                message: 'Vuoi visualizzare tutte le ' + this.notificheFiltrate.length + ' notifiche?',
                buttons: [
                    {
                        text: 'No',
                        handler: function () {
                            _this.mostraPrimi = true;
                            _this.mostraTutti = false;
                            _this.setFiltro();
                        }
                    },
                    {
                        text: 'Sì',
                        handler: function () {
                            _this.mostraTutti = true;
                        }
                    }
                ]
            }).then(function (alert) { return alert.present(); });
        }
        else {
            this.mostraTutti = true;
        }
    };
    NotifichePage.prototype.setFiltro = function () {
        this.notificheFiltrate = this.filtra(this.searchTerm);
        this.nrElementiFiltrati = this.notificheFiltrate.length;
        this.nrElementiNascosti = this.nrElementiFiltrati - this.nrElementiDaMostrare;
        if (this.nrElementiNascosti < 0) {
            this.nrElementiNascosti = 0;
        }
        if (this.mostraPrimi && this.notificheFiltrate.length > this.nrElementiDaMostrare) {
            this.notificheFiltrate = this.notificheFiltrate.slice(0, this.nrElementiDaMostrare - 1);
            this.mostraTutti = false;
        }
        if (this.nrElementiFiltrati === this.nrElementi) {
            this.color = 'primary';
        }
        else {
            this.color = 'danger';
        }
    };
    NotifichePage.prototype.onSearchCancel = function () {
        this.searchTerm = '';
        this.setFiltro();
    };
    NotifichePage.prototype.filtra = function (searchTerm) {
        if (searchTerm == null || searchTerm === undefined) {
            return this.notifiche;
        }
        return this.notifiche.filter(function (item) {
            try {
                return (item.data.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                    (item.titolo.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                    (item.messaggio.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
            }
            catch (err) {
                console.log(err);
            }
        });
    };
    NotifichePage.prototype.itemSelected = function (item) {
        this.alertCtrl.create({
            header: item.title,
            message: item.messaggio,
            buttons: [{
                    text: 'Chiudi',
                    role: 'cancel'
                }]
        }).then(function (alert) { return alert.present(); });
    };
    // Restituisce lo stato di eventuali richieste di sincronizzazione per il JSON associato al servizio
    NotifichePage.prototype.isLoading = function () {
        return this.sync.loading[this.idServizio];
    };
    // Recupera i dati tramite il sincronizzatore
    // il parametro interattivo indica se mostrare il refresher durante il recupero dei dati dal server
    NotifichePage.prototype.aggiorna = function (interattivo, sync) {
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
                    }).then(function (toast) { toast.present(); }, function (err) { _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"].log(2, 'Toast fallito!', err); });
                }
            }
        }
        this.rinvioAggiornamento = false;
        this.nrRinvii = 0;
        this.sync.getJson(this.idServizio, sync).then(function (data) {
            if (_this.sync.dataIsChanged(_this.notifiche, data['notifiche'])) {
                _this.notifiche = data['notifiche'];
                if (_this.notifiche) {
                    _this.nrElementi = _this.notifiche.length;
                }
                _this.globalData.nrNotifiche = _this.notifiche.length;
                _this.setFiltro();
                setTimeout(function () {
                    _this.controllaAggiornamento();
                }, 1000);
            }
            _this.dataAggiornamento = _services_sync_service__WEBPACK_IMPORTED_MODULE_5__["SyncService"].dataAggiornamento(data);
        }, function (err) {
            if (interattivo) {
                _this.toastCtrl.create({
                    message: 'Non è stato possibile recuparate i dati dal server. Riprovare più tardi.',
                    duration: 3000
                }).then(function (toast) { toast.present(); }, function (error) { });
            }
        }).catch(function (err) {
        });
    };
    NotifichePage.prototype.controllaAggiornamento = function () {
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
    NotifichePage.prototype.pulisciTesto = function (testo) {
        try {
            return decodeURIComponent(escape(testo));
        }
        catch (e) {
            return testo;
        }
    };
    NotifichePage.prototype.showDetails = function (item) {
        var _this = this;
        var notifica = item;
        notifica.messaggio = this.pulisciTesto(notifica.messaggio);
        switch (notifica.tipo) {
            case 1:
            case 2:
            case 3: {
                this.globalData.notizia = {
                    'data': notifica.data,
                    'titolo': notifica.titolo,
                    'contenuto': notifica.messaggio,
                    'link': notifica.chiave,
                    'notifica': 'true'
                };
                this.globalData.srcPage = '/notifiche';
                this.globalData.goTo(this.currentPage, '/notizia', 'forward', false);
                break;
            }
            case 4: {
                this.alertCtrl.create({
                    header: notifica.titolo,
                    message: notifica.messaggio,
                    buttons: [{
                            text: 'Visualizza',
                            handler: function () {
                                _this.globalData.goTo(_this.currentPage, '/appelli', 'forward', false);
                            }
                        }, {
                            text: 'Chiudi',
                            role: 'cancel'
                        }]
                }).then(function (alert) { return alert.present(); });
                break;
            }
            case 5: {
                this.alertCtrl.create({
                    header: notifica.titolo,
                    message: notifica.messaggio,
                    buttons: [{
                            text: 'Visualizza',
                            handler: function () {
                                _this.globalData.goTo(_this.currentPage, '/carriera', 'forward', false);
                            }
                        }, {
                            text: 'Chiudi',
                            role: 'cancel'
                        }]
                }).then(function (alert) { return alert.present(); });
                break;
            }
            default: {
                this.alertCtrl.create({
                    header: notifica.titolo,
                    message: notifica.messaggio,
                    buttons: [{
                            text: 'Visualizza',
                            handler: function () {
                                // console.log(' clicked');
                            }
                        }, {
                            text: 'Chiudi',
                            role: 'cancel'
                        }]
                }).then(function (alert) { return alert.present(); });
            }
        }
    };
    NotifichePage.prototype.doRefresh = function (refresher) {
        this.aggiorna(true, true);
        if (refresher) {
            refresher.complete();
        }
    };
    NotifichePage.prototype.toggleInOut = function () {
        this.showSearchBar = !this.showSearchBar;
        this.flyInOutState === 'out' ? this.flyInOutState = 'in' : this.flyInOutState = 'out';
    };
    NotifichePage.prototype.date2string = function (stringDate) {
        return _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"].formatStringDateTime(stringDate, '-', ':');
    };
    NotifichePage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-notifiche',
            template: __webpack_require__(/*! ./notifiche.html */ "./src/app/pages/notifiche/notifiche.html"),
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["trigger"])('flyInOut', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["state"])('in', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'translateX(0)' })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('void => *', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({ transform: 'translateX(100%)' }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])(300)
                    ])
                ])
            ],
            styles: [__webpack_require__(/*! ./notifiche.scss */ "./src/app/pages/notifiche/notifiche.scss")]
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ToastController"],
            _services_http_service__WEBPACK_IMPORTED_MODULE_7__["HttpService"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_3__["Storage"],
            _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"],
            _services_account_service__WEBPACK_IMPORTED_MODULE_6__["AccountService"],
            _services_sync_service__WEBPACK_IMPORTED_MODULE_5__["SyncService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["AlertController"]])
    ], NotifichePage);
    return NotifichePage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-notifiche-notifiche-module.js.map