(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-servizi-rubrica-rubrica-module"],{

/***/ "./src/app/pages/servizi/rubrica/rubrica.html":
/*!****************************************************!*\
  !*** ./src/app/pages/servizi/rubrica/rubrica.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-grid no-padding>\n    <ion-row *ngIf=\"!globalData.landscape && globalData.iPhoneX\">\n      <ion-col>\n        <ion-label> </ion-label>\n      </ion-col>\n    </ion-row>\n    <ion-row no-padding>\n      <ion-col no-padding>\n        <ion-toolbar>\n          <ion-buttons slot=\"start\">\n            <ion-menu-button></ion-menu-button>\n          </ion-buttons>\n          <ion-title *ngIf='!showSearchBar'>\n            Rubrica ({{nrElementiFiltrati}}/{{nrElementi}})\n          </ion-title>\n          <ion-searchbar *ngIf='showSearchBar'\n                         [@flyInOut]=\"flyInOutState\"\n                         [(ngModel)]=\"searchTerm\"\n                         (click)=\"setFiltro()\"\n                         (ionChange)=\"setFiltro()\"\n                         (ionCancel)=\"onSearchCancel()\"\n                         (ionClear)=\"onSearchCancel()\">\n          </ion-searchbar>\n          <ion-buttons slot=\"end\">\n            <ion-button icon-only (click)=\"toggleInOut()\">\n              <ion-icon name=\"search\" color=\"primary\" style=\"font-size: 1.5em;\"></ion-icon>\n            </ion-button>\n          </ion-buttons>\n        </ion-toolbar>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-header>\n\n<ion-content>\n\n  <ion-refresher slot=\"fixed\" [disabled]=\"false\" (ionRefresh)=\"doRefresh($event)\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <ion-grid *ngIf=\"!rubrica || rubrica?.length == 0 && rinvioAggiornamento\" text-center>\n    <ion-row>\n      <ion-col text-center>\n        <img class=\"progress\" src=\"assets/img/progress.gif\" />\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col text-center>\n        <ion-title><strong>Aggiornamento in corso</strong></ion-title>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col text-center>\n        <ion-label>un attimo di pazienza</ion-label>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-list [hidden]=\"troppi() || rinvioAggiornamento || rubricaFiltrata?.length > 0\"  >\n    <ion-item text-center>\n      <ion-title text-center>Nessun Contatto</ion-title>\n    </ion-item>\n  </ion-list>\n\n  <ion-card (click)=\"showDetails(contatto)\" *ngFor=\"let contatto of rubricaFiltrata\">\n    <ion-card-content no-padding>\n      <ion-grid fixed>\n        <ion-row >\n          <ion-col>\n            <ion-label color=\"primary\"><h1>{{contatto.cognome}} {{contatto.nome}}</h1></ion-label>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col size=\"1\" align-self-center=\"true\"><ion-icon name=\"at\" color=\"primary\"></ion-icon></ion-col>\n          <ion-col size=\"11\"><div text-wrap>{{contatto.email_utente}}</div></ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col size=\"1\" align-self-center=\"true\"><ion-icon name=\"call\" item-start color=\"primary\"></ion-icon></ion-col>\n          <ion-col size=\"11\"><div text-wrap>{{contatto.tel1}}</div></ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-card-content>\n  </ion-card>\n\n  <ion-infinite-scroll threshold=\"100px\" (ionInfinite)=\"loadData($event)\">\n    <ion-infinite-scroll-content\n            loadingSpinner=\"bubbles\"\n            loadingText=\"Caricamento dati...\">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n\n  <!--\n  <ion-grid *ngIf=\"mostraPrimi && nrElementiNascosti\">\n\n    <ion-row>\n      <ion-col text-center>\n        <ion-button (click)=\"onMostraTutti()\">Tutti</ion-button>\n        <ion-button (click)=\"onMostraProssimi()\">Prossimi {{step}}</ion-button>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col text-center>\n        <ion-label>Visualizzati {{nrElementiDaMostrare}} contatti su {{nrElementiFiltrati}}</ion-label>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  -->\n\n</ion-content>\n\n\n<ion-footer  no-padding>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-spinner [hidden]=\"!isLoading() || !http.getConnected()\"></ion-spinner>\n      <fa-icon [hidden]=\"isLoading() || !http.getConnected()\" [icon]=\"globalData.faLink\"></fa-icon>\n      <fa-icon [hidden]=\"isLoading() || http.getConnected()\"  [icon]=\"globalData.faUnlink\"></fa-icon>\n    </ion-buttons>\n\n    <div class=\"testo-footer\">\n      Aggiornato al: {{dataAggiornamento}}\n    </div>\n\n    <ion-buttons slot=\"end\" no-padding>\n      <ion-icon slot=\"icon-only\" src=\"assets/icon/blank.png\"></ion-icon>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-footer>\n"

/***/ }),

/***/ "./src/app/pages/servizi/rubrica/rubrica.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/pages/servizi/rubrica/rubrica.module.ts ***!
  \*********************************************************/
/*! exports provided: RubricaPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RubricaPageModule", function() { return RubricaPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _rubrica__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rubrica */ "./src/app/pages/servizi/rubrica/rubrica.ts");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var RubricaPageModule = /** @class */ (function () {
    function RubricaPageModule() {
    }
    RubricaPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"],
                _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _rubrica__WEBPACK_IMPORTED_MODULE_5__["RubricaPage"]
                    }
                ])
            ],
            declarations: [_rubrica__WEBPACK_IMPORTED_MODULE_5__["RubricaPage"]]
        })
    ], RubricaPageModule);
    return RubricaPageModule;
}());



/***/ }),

/***/ "./src/app/pages/servizi/rubrica/rubrica.scss":
/*!****************************************************!*\
  !*** ./src/app/pages/servizi/rubrica/rubrica.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".ion-item {\n  margin: 0 !important; }\n\n.ic {\n  font-size: 2em !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbnRvbmlvX21hc3Ryb3Bhb2xvL0Rlc2t0b3AvbW9kaWZpY2hlQVBQL3N0dWRlbnRpLW1hc3Rlci9zcmMvYXBwL3BhZ2VzL3NlcnZpemkvcnVicmljYS9ydWJyaWNhLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDSSxvQkFBb0IsRUFBQTs7QUFHeEI7RUFDSSx5QkFBeUIsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3NlcnZpemkvcnVicmljYS9ydWJyaWNhLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcbi5pb24taXRlbSB7XG4gICAgbWFyZ2luOiAwICFpbXBvcnRhbnQ7XG59XG5cbi5pYyB7XG4gICAgZm9udC1zaXplOiAyZW0gIWltcG9ydGFudDtcbn1cblxuIl19 */"

/***/ }),

/***/ "./src/app/pages/servizi/rubrica/rubrica.ts":
/*!**************************************************!*\
  !*** ./src/app/pages/servizi/rubrica/rubrica.ts ***!
  \**************************************************/
/*! exports provided: RubricaPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RubricaPage", function() { return RubricaPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");
/* harmony import */ var _services_sync_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/sync.service */ "./src/app/services/sync.service.ts");
/* harmony import */ var _services_global_data_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/global-data.service */ "./src/app/services/global-data.service.ts");
/* harmony import */ var _services_account_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/account.service */ "./src/app/services/account.service.ts");
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








var RubricaPage = /** @class */ (function () {
    function RubricaPage(toastCtrl, storage, sync, http, alertCtrl, globalData, account) {
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.sync = sync;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.globalData = globalData;
        this.account = account;
        this.currentPage = '/rubrica';
        this.idServizio = 7;
        this.rubrica = [];
        this.rubricaFiltrata = [];
        this.searchTerm = '';
        this.flyInOutState = 'in';
        this.showSearchBar = false;
        this.aggiornamentoVerificato = false;
        this.rinvioAggiornamento = false;
        this.nrRinvii = 0;
        this.maxNrRinvii = 5;
        this.step = 10;
        this.mostraTutti = false;
        this.mostraPrimi = true;
        this.nrElementi = 0;
        this.nrElementiFiltrati = 0;
        this.nrElementiDaMostrare = this.step;
        this.nrElementiNascosti = 0;
    }
    RubricaPage.prototype.ngOnInit = function () {
        var _this = this;
        this.globalData.srcPage = this.currentPage;
        this.account.controllaAccount().then(function (ok) {
            _this.http.getConnected();
            _this.storage.get('step').then(function (value) {
                if (value != null) {
                    _this.step = parseInt(value, 10);
                    _this.nrElementiDaMostrare = _this.step;
                }
            });
            _this.aggiorna(false, true);
            if (!_this.troppi()) {
                _this.flyInOutState = 'in';
                _this.showSearchBar = true;
            }
        }, function (err) {
            _this.globalData.goTo(_this.currentPage, '/login', 'root', false);
        });
    };
    RubricaPage.prototype.loadData = function (event) {
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
    RubricaPage.prototype.troppi = function () {
        return (!this.mostraTutti && this.rubricaFiltrata && this.rubricaFiltrata.length > 100);
    };
    RubricaPage.prototype.onMostraProssimi = function () {
        this.nrElementiDaMostrare += this.step;
        this.setFiltro();
    };
    RubricaPage.prototype.onMostraTutti = function () {
        var _this = this;
        this.mostraPrimi = false;
        this.setFiltro();
        if (this.troppi()) {
            this.alertCtrl.create({
                header: 'Sei sicuro?',
                message: 'Vuoi visualizzare tutti i ' + this.rubricaFiltrata.length + ' contatti individuati?',
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
    RubricaPage.prototype.onSearchCancel = function () {
        console.log('Cancellato');
        this.searchTerm = '';
        this.setFiltro();
    };
    RubricaPage.prototype.setFiltro = function () {
        this.rubricaFiltrata = this.filtra(this.searchTerm);
        this.nrElementiFiltrati = this.rubricaFiltrata.length;
        this.nrElementiNascosti = this.nrElementiFiltrati - this.nrElementiDaMostrare;
        if (this.nrElementiNascosti < 0) {
            this.nrElementiNascosti = 0;
        }
        if (this.mostraPrimi && this.rubricaFiltrata.length > this.nrElementiDaMostrare) {
            this.rubricaFiltrata = this.rubricaFiltrata.slice(0, this.nrElementiDaMostrare - 1);
            this.mostraTutti = false;
        }
    };
    RubricaPage.prototype.filtra = function (searchTerm) {
        if (searchTerm == null || searchTerm === undefined) {
            return this.rubrica;
        }
        return this.rubrica.filter(function (item) {
            try {
                return (item.nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                    (item.cognome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                    (item.email_utente.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                    (item.tel1.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
            }
            catch (err) {
                console.log(err);
            }
        });
    };
    // Restituisce lo stato di eventuali richieste di sincronizzazione per il JSON associato al servizio
    RubricaPage.prototype.isLoading = function () {
        return this.sync.loading[this.idServizio];
    };
    // Recupera i dati tramite il sincronizzatore
    RubricaPage.prototype.aggiorna = function (interattivo, sync) {
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
                    }).then(function (toast) { toast.present(); }, function (err) { _services_global_data_service__WEBPACK_IMPORTED_MODULE_5__["GlobalDataService"].log(2, 'Toast fallito!', err); });
                }
            }
        }
        this.rinvioAggiornamento = false;
        this.nrRinvii = 0;
        this.sync.getJson(this.idServizio, sync).then(function (data) {
            if (_this.sync.dataIsChanged(_this.rubrica, data[0])) {
                _this.rubrica = data[0];
                if (_this.rubrica) {
                    _this.nrElementi = _this.rubrica.length;
                }
                for (var _i = 0, _a = _this.rubrica; _i < _a.length; _i++) {
                    var contatto = _a[_i];
                    if (contatto.nome != null) {
                        contatto.nome = _services_global_data_service__WEBPACK_IMPORTED_MODULE_5__["GlobalDataService"].toTitleCase(contatto.nome);
                    }
                    else {
                        contatto.nome = '';
                    }
                    if (contatto.cognome != null) {
                        contatto.cognome = _services_global_data_service__WEBPACK_IMPORTED_MODULE_5__["GlobalDataService"].toTitleCase(contatto.cognome);
                    }
                    else {
                        contatto.cognome = '';
                    }
                    if ((contatto.tel1 != null) && (contatto.tel1 !== '')) {
                        if ((contatto.tel1.indexOf('+39') !== 0) && (contatto.tel1.indexOf('0') !== 0)) {
                            contatto.tel1 = '+39 0874 404' + contatto.tel1.slice(1);
                        }
                    }
                    else {
                        contatto.tel1 = 'Numero non presente!';
                    }
                }
                _this.setFiltro();
                setTimeout(function () {
                    _this.controllaAggiornamento();
                }, 1000);
            }
            _this.dataAggiornamento = _services_sync_service__WEBPACK_IMPORTED_MODULE_4__["SyncService"].dataAggiornamento(data);
        }, function (err) {
            _services_global_data_service__WEBPACK_IMPORTED_MODULE_5__["GlobalDataService"].log(2, 'Errore nella chiamata a getJson(' + _this.idServizio + ',' + sync + ')', err);
            if (interattivo) {
                _this.toastCtrl.create({
                    message: 'Non è stato possibile recuparate i dati dal server. Riprovare più tardi.',
                    duration: 3000
                }).then(function (toast) { toast.present(); }, function (toastErr) { _services_global_data_service__WEBPACK_IMPORTED_MODULE_5__["GlobalDataService"].log(2, 'Toast fallito!', toastErr); });
            }
        }).catch(function (ex) {
            _services_global_data_service__WEBPACK_IMPORTED_MODULE_5__["GlobalDataService"].log(2, 'Eccezione nella chiamata a getJson(' + _this.idServizio + ',' + sync + ')', ex);
        });
    };
    RubricaPage.prototype.controllaAggiornamento = function () {
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
    RubricaPage.prototype.showDetails = function (contatto) {
        this.globalData.contatto = contatto;
        this.globalData.goTo(this.currentPage, '/contatto', 'forward', false);
    };
    // getItems(ev: any) {
    //     this.storage.get(this.idServizio.toString()).then((data) => {
    //         const val = ev.target.value;
    //         if (val && val.trim() !== '') {
    //             this.rubrica = data[0].filter((item) => {
    //                 if (item.nome == null) {
    //                     item.nome = '';
    //                 }
    //                 if (item.cognome == null) {
    //                     item.cognome = '';
    //                 }
    //                 if (item.tel1 == null) {
    //                     item.tel1 = '';
    //                 }
    //                 if (item.tel12 == null) {
    //                     item.tel2 = '';
    //                 }
    //                 if (item.tel3 == null) {
    //                     item.tel3 = '';
    //                 }
    //                 if (item.tel4 == null) {
    //                     item.tel4 = '';
    //                 }
    //
    //
    //                 return (
    //                     (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
    //                     (item.cognome.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
    //                     (item.tel1.indexOf(val) > -1) ||
    //                     (item.tel2.indexOf(val) > -1) ||
    //                     (item.tel3.indexOf(val) > -1) ||
    //                     (item.tel4.indexOf(val) > -1) );
    //             });
    //         } else {
    //             this.rubrica = data[0];
    //         }
    //     });
    // }
    RubricaPage.prototype.doRefresh = function (refresher) {
        if (refresher) {
            refresher.target.complete();
        }
        this.aggiorna(true, true);
    };
    RubricaPage.prototype.toggleInOut = function () {
        this.flyInOutState === 'out' ? this.flyInOutState = 'in' : this.flyInOutState = 'out';
        this.showSearchBar = !this.showSearchBar;
    };
    RubricaPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-rubrica',
            template: __webpack_require__(/*! ./rubrica.html */ "./src/app/pages/servizi/rubrica/rubrica.html"),
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["trigger"])('flyInOut', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["state"])('in', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({ transform: 'translateX(0)' })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["transition"])('void => *', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({ transform: 'translateX(100%)' }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["animate"])(300)
                    ])
                ])
            ],
            styles: [__webpack_require__(/*! ./rubrica.scss */ "./src/app/pages/servizi/rubrica/rubrica.scss")]
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ToastController"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"],
            _services_sync_service__WEBPACK_IMPORTED_MODULE_4__["SyncService"],
            _services_http_service__WEBPACK_IMPORTED_MODULE_7__["HttpService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["AlertController"],
            _services_global_data_service__WEBPACK_IMPORTED_MODULE_5__["GlobalDataService"],
            _services_account_service__WEBPACK_IMPORTED_MODULE_6__["AccountService"]])
    ], RubricaPage);
    return RubricaPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-servizi-rubrica-rubrica-module.js.map