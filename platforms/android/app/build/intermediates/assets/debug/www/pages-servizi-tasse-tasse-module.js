(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-servizi-tasse-tasse-module"],{

/***/ "./src/app/pages/servizi/tasse/tasse.html":
/*!************************************************!*\
  !*** ./src/app/pages/servizi/tasse/tasse.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n    <ion-grid no-padding>\n        <ion-row *ngIf=\"!globalData.landscape && globalData.iPhoneX\">\n            <ion-col>\n                <ion-label> </ion-label>\n            </ion-col>\n        </ion-row>\n        <ion-row no-padding>\n            <ion-col no-padding>\n                <ion-toolbar>\n                    <ion-buttons slot=\"start\">\n                        <ion-menu-button></ion-menu-button>\n                    </ion-buttons>\n                    <ion-title>\n                        Tasse\n                    </ion-title>\n                </ion-toolbar>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-header>\n\n<ion-content [ngSwitch]=\"sezioni\">\n\n    <ion-refresher slot=\"fixed\" [disabled]=\"false\" (ionRefresh)=\"doRefresh($event)\">\n        <ion-refresher-content></ion-refresher-content>\n    </ion-refresher>\n\n    <ion-toolbar>\n        <ion-segment [(ngModel)]=\"sezioni\">\n            <ion-segment-button value=\"da-pagare\">Da Pagare</ion-segment-button>\n            <ion-segment-button value=\"pagate\">Pagate</ion-segment-button>\n        </ion-segment>\n    </ion-toolbar>\n    <ion-list *ngSwitchCase=\"'da-pagare'\">\n        <ion-grid *ngIf=\"rinvioAggiornamento && !tasseDaPagare\" text-center>\n            <ion-row>\n                <ion-col text-center >\n                    <img class=\"progress\" src=\"assets/img/progress.gif\" />\n                </ion-col>\n            </ion-row>\n            <ion-row>\n                <ion-col text-center>\n                    <ion-title><strong>Aggiornamento in corso</strong></ion-title>\n                </ion-col>\n            </ion-row>\n            <ion-row>\n                <ion-col text-center>\n                    <ion-label>un attimo di pazienza</ion-label>\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n\n        <ion-grid *ngIf=\"!rinvioAggiornamento && tasseDaPagare?.length == 0\">\n            <ion-row>\n                <ion-col>\n                    <ion-label text-center text-wrap>\n                        <strong>Sembra non ci sia nulla da pagare</strong>\n                    </ion-label>\n                </ion-col>\n            </ion-row>\n            <ion-row>\n                <ion-col>\n                    <ion-label text-wrap>\n                        <strong>Ricorda che questa scheda non ha valore ufficiale</strong>\n                    </ion-label>\n                    <ion-label text-wrap>Controlla sempre le scadenze sul Portale dello Studente!</ion-label>\n                </ion-col>\n            </ion-row>\n            <ion-row>\n                <ion-col text-center>\n                    <img class=\"logo\" src=\"assets/img/ok.png\" />\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n\n        <ion-card *ngFor=\"let tax of tasseDaPagare\">\n            <ion-card-content *ngIf=\"tax.IMPORTO  != '0'\">\n                <ion-grid>\n                    <ion-row>\n                        <ion-col>\n                            <ion-text color=\"primary\">\n                                <ion-label><strong>{{this.getDescription(tax)}}</strong></ion-label>\n                            </ion-text>\n                        </ion-col>\n                    </ion-row>\n                    <ion-row>\n                        <ion-col>\n                            <ion-label>Importo: <strong>€ {{ tax.IMPORTO }}</strong></ion-label>\n                        </ion-col>\n                    </ion-row>\n                    <ion-row>\n                        <ion-col>\n                            <ion-label>Anno accademico: <strong>{{ tax.AA}}</strong></ion-label>\n                        </ion-col>\n                    </ion-row>\n                    <ion-row>\n                        <ion-col>\n                            <ion-label>Data addebito: <strong>{{tax.DATA_ADDEBITO}}</strong></ion-label>\n                        </ion-col>\n                    </ion-row>\n                    <ion-row>\n                        <ion-col>\n                            <ion-label *ngIf=\"tax.DATA_SCADENZA\">Data scadenza: <strong>{{tax.DATA_SCADENZA}}</strong></ion-label>\n                        </ion-col>\n                    </ion-row>\n                    <ion-row>\n                        <ion-col>\n                            <ion-label *ngIf=\"tax.NUMERO_MAV\">MAV: {{tax.NUMERO_MAV}}</ion-label>\n                        </ion-col>\n                    </ion-row>\n                </ion-grid>\n            </ion-card-content>\n        </ion-card>\n    </ion-list>\n\n    <ion-list *ngSwitchCase=\"'pagate'\">\n        <ion-grid *ngIf=\"nrTassePagate==0\">\n            <ion-row>\n                <ion-col>\n                    <ion-label text-center text-wrap>\n                        <strong>Sembra non ci sia nulla qui</strong>\n                    </ion-label>\n                </ion-col>\n            </ion-row>\n            <ion-row>\n                <ion-col>\n                    <ion-label text-wrap>\n                        <strong>Ricorda che questa scheda non ha valore ufficiale</strong>\n                    </ion-label>\n                    <ion-label text-wrap>Controlla sempre le scadenze sul Portale dello Studente!</ion-label>\n                </ion-col>\n            </ion-row>\n            <ion-row>\n                <ion-col text-center>\n                    <img class=\"logo\" src=\"assets/img/ok.png\" />\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n\n        <ion-card *ngFor=\"let tax of tassePagate\">\n            <ion-card-content *ngIf=\"tax.IMPORTO != '0'\">\n                <ion-grid>\n                    <ion-row>\n                        <ion-col>\n                            <ion-text color=\"primary\">\n                                <ion-label><strong>{{this.getDescription(tax)}}</strong></ion-label>\n                            </ion-text>\n                        </ion-col>\n                    </ion-row>\n                    <ion-row>\n                        <ion-col>\n                            <ion-label>Importo: <strong>€ {{ tax.IMPORTO }}</strong></ion-label>\n                        </ion-col>\n                    </ion-row>\n                    <ion-row>\n                        <ion-col>\n                            <ion-label>Anno accademico: <strong>{{ tax.AA}}</strong></ion-label>\n                        </ion-col>\n                    </ion-row>\n                    <ion-row>\n                        <ion-col>\n                            <ion-label>Data addebito: <strong>{{tax.DATA_ADDEBITO}}</strong></ion-label>\n                        </ion-col>\n                    </ion-row>\n                    <ion-row>\n                        <ion-col>\n                            <ion-label *ngIf=\"tax.DATA_SCADENZA\">Data scadenza: <strong>{{tax.DATA_SCADENZA}}</strong></ion-label>\n                        </ion-col>\n                    </ion-row>\n                    <ion-row>\n                        <ion-col>\n                            <ion-label *ngIf=\"tax.DATA_PAGAMENTO\">Data pagamento: <strong>{{tax.DATA_PAGAMENTO}}</strong></ion-label>\n                        </ion-col>\n                    </ion-row>\n                    <ion-row>\n                        <ion-col>\n                            <ion-label *ngIf=\"tax.NUMERO_MAV\">MAV: {{tax.NUMERO_MAV}}</ion-label>\n                        </ion-col>\n                    </ion-row>\n                </ion-grid>\n            </ion-card-content>\n        </ion-card>\n    </ion-list>\n\n</ion-content>\n\n<ion-footer  no-padding>\n    <ion-toolbar>\n        <ion-buttons slot=\"start\">\n            <ion-spinner [hidden]=\"!isLoading() || !http.getConnected()\"></ion-spinner>\n            <fa-icon [hidden]=\"isLoading() || !http.getConnected()\" [icon]=\"globalData.faLink\"></fa-icon>\n            <fa-icon [hidden]=\"isLoading() || http.getConnected()\"  [icon]=\"globalData.faUnlink\"></fa-icon>\n        </ion-buttons>\n\n        <div class=\"testo-footer\">\n            Aggiornato al: {{dataAggiornamento}}\n        </div>\n\n        <ion-buttons slot=\"end\" no-padding>\n            <ion-icon slot=\"icon-only\" src=\"assets/icon/blank.png\"></ion-icon>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-footer>\n"

/***/ }),

/***/ "./src/app/pages/servizi/tasse/tasse.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/pages/servizi/tasse/tasse.module.ts ***!
  \*****************************************************/
/*! exports provided: TassePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TassePageModule", function() { return TassePageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _tasse__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tasse */ "./src/app/pages/servizi/tasse/tasse.ts");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var TassePageModule = /** @class */ (function () {
    function TassePageModule() {
    }
    TassePageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"],
                _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _tasse__WEBPACK_IMPORTED_MODULE_5__["TassePage"]
                    }
                ])
            ],
            declarations: [_tasse__WEBPACK_IMPORTED_MODULE_5__["TassePage"]]
        })
    ], TassePageModule);
    return TassePageModule;
}());



/***/ }),

/***/ "./src/app/pages/servizi/tasse/tasse.ts":
/*!**********************************************!*\
  !*** ./src/app/pages/servizi/tasse/tasse.ts ***!
  \**********************************************/
/*! exports provided: TassePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TassePage", function() { return TassePage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _services_sync_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/sync.service */ "./src/app/services/sync.service.ts");
/* harmony import */ var _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/global-data.service */ "./src/app/services/global-data.service.ts");
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







var TassePage = /** @class */ (function () {
    function TassePage(toastCtrl, sync, http, storage, globalData, account) {
        this.toastCtrl = toastCtrl;
        this.sync = sync;
        this.http = http;
        this.storage = storage;
        this.globalData = globalData;
        this.account = account;
        this.currentPage = '/tasse';
        this.idServizio = 11;
        this.nrTasseDaPagare = 0;
        this.nrTassePagate = 0;
        this.aggiornamentoVerificato = false;
        this.rinvioAggiornamento = false;
        this.nrRinvii = 0;
        this.maxNrRinvii = 5;
    }
    TassePage.prototype.ngOnInit = function () {
        var _this = this;
        this.globalData.srcPage = this.currentPage;
        this.account.controllaAccount().then(function (ok) {
            if (_this.sezioni == null) {
                _this.sezioni = 'da-pagare';
            }
            _this.http.getConnected();
            _this.aggiorna(false, true);
        }, function (err) {
            _this.globalData.goTo(_this.currentPage, '/login', 'root', false);
        });
    };
    TassePage.prototype.aggiorna = function (interattivo, sync) {
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
                    }).then(function (toast) { toast.present(); }, function (toastErr) { _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"].log(2, 'Toast fallito!', toastErr); });
                }
            }
        }
        this.rinvioAggiornamento = false;
        this.nrRinvii = 0;
        this.sync.getJson(this.idServizio, true).then(function (data) {
            if (_this.sync.dataIsChanged(_this.tasse, data[0])) {
                _this.tasse = data[0];
                _this.caricaTasse();
                setTimeout(function () {
                    _this.controllaAggiornamento();
                }, 1000);
            }
            _this.dataAggiornamento = _services_sync_service__WEBPACK_IMPORTED_MODULE_3__["SyncService"].dataAggiornamento(data);
        }, function (err) {
            console.dir(err);
        }).catch(function (err) {
        });
    };
    TassePage.prototype.controllaAggiornamento = function () {
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
    TassePage.prototype.isLoading = function () {
        return this.sync.loading[this.idServizio];
    };
    TassePage.prototype.doRefresh = function (refresher) {
        if (refresher) {
            refresher.target.complete();
        }
        this.aggiorna(true, true);
    };
    TassePage.prototype.caricaTasse = function () {
        if (this.tasse == null) {
            return;
        }
        this.tasseDaPagare = Array();
        this.tassePagate = Array();
        this.nrTasseDaPagare = 0;
        this.nrTassePagate = 0;
        for (var _i = 0, _a = this.tasse; _i < _a.length; _i++) {
            var riga = _a[_i];
            switch (riga.PAGATO) {
                case '0':
                    this.tasseDaPagare[this.nrTasseDaPagare] = riga;
                    this.nrTasseDaPagare++;
                    break;
                case '1':
                    this.tassePagate[this.nrTassePagate] = riga;
                    this.nrTassePagate++;
                    break;
            }
        }
    };
    TassePage.prototype.getDescription = function (item) {
        if (item.DESCRIZIONE) {
            return item.DESCRIZIONE;
        }
        if (item.IMPORTO.startsWith('-')) {
            return 'RIMBORSO';
        }
        else {
            return 'TASSA';
        }
    };
    TassePage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-tasse',
            template: __webpack_require__(/*! ./tasse.html */ "./src/app/pages/servizi/tasse/tasse.html"),
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ToastController"],
            _services_sync_service__WEBPACK_IMPORTED_MODULE_3__["SyncService"],
            _services_http_service__WEBPACK_IMPORTED_MODULE_6__["HttpService"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"],
            _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"],
            _services_account_service__WEBPACK_IMPORTED_MODULE_5__["AccountService"]])
    ], TassePage);
    return TassePage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-servizi-tasse-tasse-module.js.map