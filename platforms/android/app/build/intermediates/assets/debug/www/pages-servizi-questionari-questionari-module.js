(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-servizi-questionari-questionari-module"],{

/***/ "./src/app/pages/servizi/questionari/questionari.html":
/*!************************************************************!*\
  !*** ./src/app/pages/servizi/questionari/questionari.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-grid no-padding>\n    <ion-row *ngIf=\"!globalData.landscape && globalData.iPhoneX\">\n      <ion-col>\n        <ion-label> </ion-label>\n      </ion-col>\n    </ion-row>\n    <ion-row no-padding>\n      <ion-col no-padding>\n        <ion-toolbar>\n          <ion-buttons slot=\"start\">\n            <ion-menu-button></ion-menu-button>\n          </ion-buttons>\n          <ion-title>\n            Questionari di valutazione\n          </ion-title>\n        </ion-toolbar>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-header>\n\n\n<ion-content>\n  <ion-refresher slot=\"fixed\" [disabled]=\"false\" (ionRefresh)=\"doRefresh($event)\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <ion-grid *ngIf=\"!questionari || questionari?.length == 0 && rinvioAggiornamento\" text-center>\n    <ion-row>\n      <ion-col text-center>\n        <img class=\"progress\" src=\"assets/img/progress.gif\" />\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col text-center>\n        <ion-title><strong>Aggiornamento in corso</strong></ion-title>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col text-center>\n        <ion-label>un attimo di pazienza</ion-label>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-list *ngIf=\"questionariCompilati && questionariCompilati?.length > 0 && !rinvioAggiornamento\">\n    <ion-list-header>\n      COMPILATI\n    </ion-list-header>\n    <ion-item ion-item *ngFor=\"let item of questionariCompilati\">\n      <ion-grid fixed no-padding>\n        <ion-row>\n          <ion-col size=\"1\" align-self-center=\"true\">\n            <ion-icon name=\"radio-button-on\" color=\"secondary\"></ion-icon>\n          </ion-col>\n          <ion-col align-self-center=\"true\">\n            <ion-label text-wrap>{{ item }}</ion-label>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-item>\n    <ion-item *ngIf=\"questionariCompilati?.length==0\">\n      <ion-label text-wrap>Nessun questionario compilato</ion-label>\n    </ion-item>\n  </ion-list>\n\n  <ion-list *ngIf=\"questionariDaCompilare && questionariDaCompilare?.length > 0 && !rinvioAggiornamento\">\n    <ion-list-header>\n      DA COMPILARE\n    </ion-list-header>\n    <ion-item *ngIf=\"questionariDaCompilare?.length==0\">\n      <ion-label text-wrap>Nessun questionario da compilare</ion-label>\n    </ion-item>\n\n    <ion-item ion-item *ngFor=\"let item of questionariDaCompilare\">\n      <ion-grid fixed no-padding>\n        <ion-row>\n          <ion-col size=\"1\" align-self-center=\"true\">\n            <ion-icon name=\"radio-button-on\" color=\"primary\"></ion-icon>\n          </ion-col>\n          <ion-col align-self-center=\"true\">\n            <ion-label text-wrap=\"\">{{ item }}</ion-label>\n          </ion-col>\n        </ion-row>\n      </ion-grid>s\n    </ion-item>\n\n  </ion-list>\n\n  <ion-list *ngIf=\"!rinvioAggiornamento\" >\n    <ion-list-header>\n      NON DISPONIBILI\n    </ion-list-header>\n    <ion-item ion-item *ngFor=\"let item of questionariNonDisponibili\">\n      <ion-grid fixed no-padding>\n        <ion-row>\n          <ion-col size=\"1\" align-self-center=\"true\">\n            <ion-icon name=\"radio-button-on\" color=\"danger\"></ion-icon>\n          </ion-col>\n          <ion-col align-self-center=\"true\">\n            <ion-label text-wrap=\"\">{{ item }}</ion-label>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-item>\n    <ion-item *ngIf=\"questionariNonDisponibili?.length==0\">\n      <ion-label text-wrap>Nessun questionario disponibile</ion-label>\n    </ion-item>\n  </ion-list>\n\n</ion-content>\n\n<ion-footer  no-padding>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-spinner [hidden]=\"!isLoading() || !http.getConnected()\"></ion-spinner>\n      <fa-icon [hidden]=\"isLoading() || !http.getConnected()\" [icon]=\"globalData.faLink\"></fa-icon>\n      <fa-icon [hidden]=\"isLoading() || http.getConnected()\"  [icon]=\"globalData.faUnlink\"></fa-icon>\n    </ion-buttons>\n\n    <div class=\"testo-footer\">\n      Aggiornato al: {{dataAggiornamento}}\n    </div>\n\n    <ion-buttons slot=\"end\" no-padding>\n      <ion-icon slot=\"icon-only\" src=\"assets/icon/blank.png\"></ion-icon>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-footer>"

/***/ }),

/***/ "./src/app/pages/servizi/questionari/questionari.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/pages/servizi/questionari/questionari.module.ts ***!
  \*****************************************************************/
/*! exports provided: QuestionariPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionariPageModule", function() { return QuestionariPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _questionari__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./questionari */ "./src/app/pages/servizi/questionari/questionari.ts");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var QuestionariPageModule = /** @class */ (function () {
    function QuestionariPageModule() {
    }
    QuestionariPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"],
                _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _questionari__WEBPACK_IMPORTED_MODULE_5__["QuestionariPage"]
                    }
                ])
            ],
            declarations: [_questionari__WEBPACK_IMPORTED_MODULE_5__["QuestionariPage"]]
        })
    ], QuestionariPageModule);
    return QuestionariPageModule;
}());



/***/ }),

/***/ "./src/app/pages/servizi/questionari/questionari.ts":
/*!**********************************************************!*\
  !*** ./src/app/pages/servizi/questionari/questionari.ts ***!
  \**********************************************************/
/*! exports provided: QuestionariPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionariPage", function() { return QuestionariPage; });
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







var QuestionariPage = /** @class */ (function () {
    function QuestionariPage(toastCtrl, sync, http, storage, globalData, account) {
        this.toastCtrl = toastCtrl;
        this.sync = sync;
        this.http = http;
        this.storage = storage;
        this.globalData = globalData;
        this.account = account;
        this.currentPage = '/questionari';
        this.idServizio = 8;
        this.questionariInizializzati = false;
        this.aggiornamentoVerificato = false;
        this.rinvioAggiornamento = false;
        this.nrRinvii = 0;
        this.maxNrRinvii = 5;
    }
    QuestionariPage.prototype.ngOnInit = function () {
        var _this = this;
        this.globalData.srcPage = '/questionari';
        this.account.controllaAccount().then(function (ok) {
            _this.http.getConnected();
            _this.aggiorna(false, true);
        }, function (err) {
            _this.globalData.goTo(_this.currentPage, '/login', 'root', false);
        });
    };
    QuestionariPage.prototype.aggiorna = function (interattivo, sync) {
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
            _this.parseQuestionari(data);
            _this.dataAggiornamento = _services_sync_service__WEBPACK_IMPORTED_MODULE_3__["SyncService"].dataAggiornamento(data);
            setTimeout(function () {
                _this.controllaAggiornamento();
            }, 1000);
        }, function (err) {
        }).catch(function (err) {
        });
    };
    QuestionariPage.prototype.controllaAggiornamento = function () {
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
    QuestionariPage.prototype.isLoading = function () {
        return this.sync.loading[this.idServizio];
    };
    QuestionariPage.prototype.doRefresh = function (refresher) {
        if (refresher) {
            refresher.target.complete();
        }
        this.aggiorna(true, true);
    };
    QuestionariPage.prototype.parseQuestionari = function (listaQuestionari) {
        // console.dir(listaQuestionari);
        if (!this.questionariInizializzati || JSON.stringify(this.questionari) !== JSON.stringify(listaQuestionari)) {
            this.questionariInizializzati = true;
            this.questionari = listaQuestionari;
            this.questionariNonDisponibili = [];
            this.questionariCompilati = [];
            this.questionariDaCompilare = [];
            var contNonDisponibili = 0;
            var contCompilati = 0;
            var contDaCompilare = 0;
            var iter = Object.keys(listaQuestionari).length;
            for (var i = 0; i < iter - 2; i++) {
                if (listaQuestionari[i].adsce_id && listaQuestionari[i].stato === 0) {
                    this.questionariNonDisponibili[contNonDisponibili] = listaQuestionari[i].des;
                    contNonDisponibili++;
                }
                else if (listaQuestionari[i].adsce_id && listaQuestionari[i].stato === 1) {
                    this.questionariCompilati[contCompilati] = listaQuestionari[i].des;
                    contCompilati++;
                }
                else if (listaQuestionari[i].adsce_id) {
                    this.questionariDaCompilare[contDaCompilare] = listaQuestionari[i].des;
                    contDaCompilare++;
                }
            }
        }
    };
    QuestionariPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-questionari',
            template: __webpack_require__(/*! ./questionari.html */ "./src/app/pages/servizi/questionari/questionari.html"),
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ToastController"],
            _services_sync_service__WEBPACK_IMPORTED_MODULE_3__["SyncService"],
            _services_http_service__WEBPACK_IMPORTED_MODULE_6__["HttpService"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"],
            _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"],
            _services_account_service__WEBPACK_IMPORTED_MODULE_5__["AccountService"]])
    ], QuestionariPage);
    return QuestionariPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-servizi-questionari-questionari-module.js.map