(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~libretto-libretto-module~pages-carriera-tabs-carriera-carriera-module"],{

/***/ "./src/app/pages/carriera/libretto/libretto.module.ts":
/*!************************************************************!*\
  !*** ./src/app/pages/carriera/libretto/libretto.module.ts ***!
  \************************************************************/
/*! exports provided: LibrettoPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LibrettoPageModule", function() { return LibrettoPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _libretto_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./libretto.page */ "./src/app/pages/carriera/libretto/libretto.page.ts");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var LibrettoPageModule = /** @class */ (function () {
    function LibrettoPageModule() {
    }
    LibrettoPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"],
                _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _libretto_page__WEBPACK_IMPORTED_MODULE_5__["LibrettoPage"]
                    }
                ])
            ],
            declarations: [_libretto_page__WEBPACK_IMPORTED_MODULE_5__["LibrettoPage"]]
        })
    ], LibrettoPageModule);
    return LibrettoPageModule;
}());



/***/ }),

/***/ "./src/app/pages/carriera/libretto/libretto.page.html":
/*!************************************************************!*\
  !*** ./src/app/pages/carriera/libretto/libretto.page.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-grid no-padding>\n    <ion-row *ngIf=\"!globalData.landscape && globalData.iPhoneX\">\n      <ion-col>\n        <ion-label> </ion-label>\n      </ion-col>\n    </ion-row>\n    <ion-row no-padding>\n      <ion-col no-padding>\n        <ion-toolbar>\n          <ion-buttons slot=\"start\">\n            <ion-menu-button></ion-menu-button>\n          </ion-buttons>\n          <ion-title>\n            Libretto\n          </ion-title>\n          <ion-buttons slot=\"end\">\n            <ion-back-button *ngIf=\"srcPage\" defaultHref=\"{{srcPage}}\" text=\"Indietro\"></ion-back-button>\n          </ion-buttons>\n        </ion-toolbar>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-header>\n<ion-content>\n  <!--\n  <ion-refresher slot=\"fixed\" [disabled]=\"false\" (ionRefresh)=\"doRefresh($event)\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n  -->\n  <ion-grid *ngIf=\"!libretto || libretto?.length == 0 && rinvioAggiornamento\" text-center>\n    <ion-row>\n      <ion-col text-center>\n        <img class=\"progress\" src=\"assets/img/progress.gif\" />\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col text-center>\n        <ion-title><strong>Aggiornamento in corso</strong></ion-title>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col text-center>\n        <ion-label>un attimo di pazienza</ion-label>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-grid>\n    <ion-row>\n      <ion-col>\n        <ion-list no-lines>\n          <div *ngIf=\"!libretto && !rinvioAggiornamento\">\n            <ion-list>\n              <ion-item text-center>Nessun dato da visualizzare</ion-item>\n            </ion-list>\n          </div>\n\n          <ion-item-sliding *ngFor=\"let item of libretto\">\n            <ion-item [ngClass]=\"{'superato' : item.voto, 'da-sostenere' : !item.voto}\">\n              <ion-grid fixed no-padding>\n                <ion-row>\n                  <ion-col size=\"10\">\n                    <ion-grid no-padding>\n                      <ion-row no-padding>\n                        <ion-col>\n                          <div text-wrap class=\"nome-esame\">{{ item.descrizione }}</div>\n                        </ion-col>\n                      </ion-row>\n                      <ion-row no-padding class=\"dati-esame\">\n                        <ion-col size=\"1\">\n                          <ion-icon name=\"create\"></ion-icon>\n                        </ion-col>\n                        <ion-col size=\"4\">\n                          <div>{{ item.peso }} CFU</div>\n                        </ion-col>\n                        <ion-col *ngIf=\"item.voto\" size=\"1\">\n                          <ion-icon name=\"calendar\"></ion-icon>\n                        </ion-col>\n                        <ion-col *ngIf=\"item.voto\" size=\"4\">\n                          <div>{{item.data_sup | slice:0:10}}</div>\n                        </ion-col>\n                        <ion-col *ngIf=\"!item.voto\" size=\"1\">\n                          <ion-icon name=\"information-circle\"></ion-icon>\n                        </ion-col>\n                        <ion-col *ngIf=\"!item.voto\" size=\"4\">\n                          <div>{{item.codice}}</div>\n                        </ion-col>\n                        <ion-col *ngIf=\"!item.voto\" size=\"1\">\n                          <ion-icon name=\"bookmark\"></ion-icon>\n                        </ion-col>\n                        <ion-col *ngIf=\"!item.voto\" size=\"1\">\n                          <div>{{item.num_app_futuri}}</div>\n                        </ion-col>\n                      </ion-row>\n                    </ion-grid>\n                  </ion-col>\n                  <ion-col size=\"2\" no-padding *ngIf=\"item.voto\" class=\"voto\" align-self-center=\"true\">\n                    <ion-label *ngIf=\"item.voto!='30 e lode'\">\n                      {{item.voto | slice:0:3}}\n                    </ion-label>\n                    <ion-label *ngIf=\"item.voto=='30 e lode'\">\n                      30L\n                    </ion-label>\n                    <ion-label *ngIf=\"!item.voto\" size=\"2\">\n                      {{item.sta_sce_cod | slice:0:3}}\n                    </ion-label>\n                  </ion-col>\n\n                </ion-row>\n\n              </ion-grid>\n\n            </ion-item>\n\n            <ion-item-options *ngIf=\"!item.voto\">\n              <ion-item-option *ngIf=\"item.num_app_futuri!=0\" (click)=\"cercaAppello(slItem, item)\">\n                Appelli\n              </ion-item-option>\n            </ion-item-options>\n\n          </ion-item-sliding>\n\n        </ion-list>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n</ion-content>\n\n<ion-footer  no-padding>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-spinner [hidden]=\"!isLoading() || !http.getConnected()\"></ion-spinner>\n      <fa-icon [hidden]=\"isLoading() || !http.getConnected()\" [icon]=\"globalData.faLink\"></fa-icon>\n      <fa-icon [hidden]=\"isLoading() || http.getConnected()\"  [icon]=\"globalData.faUnlink\"></fa-icon>\n    </ion-buttons>\n\n    <div class=\"testo-footer\">\n      Aggiornato al: {{dataAggiornamento}}\n    </div>\n\n    <ion-buttons slot=\"end\">\n      <ion-button icon-only (click)=\"selezionaTab()\"><ion-icon name=\"more\"></ion-icon></ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-footer>\n"

/***/ }),

/***/ "./src/app/pages/carriera/libretto/libretto.page.ts":
/*!**********************************************************!*\
  !*** ./src/app/pages/carriera/libretto/libretto.page.ts ***!
  \**********************************************************/
/*! exports provided: LibrettoPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LibrettoPage", function() { return LibrettoPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _services_sync_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/sync.service */ "./src/app/services/sync.service.ts");
/* harmony import */ var _services_global_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/global-data.service */ "./src/app/services/global-data.service.ts");
/* harmony import */ var _services_account_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/account.service */ "./src/app/services/account.service.ts");
/* harmony import */ var _services_http_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/http.service */ "./src/app/services/http.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LibrettoPage = /** @class */ (function () {
    function LibrettoPage(toastCtrl, actionSheetCtrl, ngZone, sync, http, globalData, account) {
        this.toastCtrl = toastCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.ngZone = ngZone;
        this.sync = sync;
        this.http = http;
        this.globalData = globalData;
        this.account = account;
        this.currentPage = '/carriera/tab/libretto';
        this.idServizio = 4;
        this.libretto = [];
        this.aggiornamentoVerificato = false;
        this.rinvioAggiornamento = false;
        this.nrRinvii = 0;
        this.maxNrRinvii = 5;
    }
    LibrettoPage.prototype.ngOnInit = function () {
        var _this = this;
        this.account.controllaAccount().then(function (ok) {
            _this.srcPage = _this.globalData.srcPage;
            _this.globalData.srcPage = _this.currentPage;
            if (_this.srcPage === _this.globalData.srcPage) {
                _this.srcPage = null;
            }
            _this.http.getConnected();
            _this.aggiorna(false, true);
        }, function (err) {
            _this.globalData.goTo(_this.currentPage, '/login', 'root', false);
        });
    };
    LibrettoPage.prototype.aggiorna = function (interattivo, sync) {
        var _this = this;
        if (this.sync.loading[this.idServizio]) {
            this.rinvioAggiornamento = true;
            this.dataAggiornamento = 'in corso';
            this.nrRinvii++;
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
        this.sync.getJson(this.idServizio, true).then(function (data) {
            if (_this.sync.dataIsChanged(_this.libretto, data[0])) {
                _this.libretto = data[0];
                if (!_this.libretto[0]) {
                    _this.libretto = new Array();
                }
                setTimeout(function () {
                    _this.controllaAggiornamento();
                }, 1000);
            }
            _this.dataAggiornamento = _services_sync_service__WEBPACK_IMPORTED_MODULE_2__["SyncService"].dataAggiornamento(data);
        }, function (err) {
        }).catch(function (err) {
        });
    };
    LibrettoPage.prototype.controllaAggiornamento = function () {
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
    LibrettoPage.prototype.isLoading = function () {
        return this.sync.loading[this.idServizio];
    };
    LibrettoPage.prototype.doRefresh = function (refresher) {
        refresher.target.complete();
        if (this.sync.loading[this.idServizio]) {
            return;
        }
        this.aggiorna(true, true);
    };
    LibrettoPage.prototype.cercaAppello = function (item, ins) {
        this.globalData.goTo(this.currentPage, '/appelli/' + ins.codice, 'forward', false);
    };
    LibrettoPage.prototype.selezionaTab = function () {
        var _this = this;
        this.actionSheetCtrl.create({
            header: 'Mostra',
            buttons: [
                {
                    text: 'Piano di studi',
                    icon: 'school',
                    handler: function () {
                        _this.globalData.goTo(_this.currentPage, '/carriera/tab/piano-di-studi', 'forward', false);
                    }
                }, {
                    text: 'Esami di sostenere',
                    icon: 'list-box',
                    handler: function () {
                        _this.globalData.goTo(_this.currentPage, '/carriera/tab/lista-esami', 'forward', false);
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
    LibrettoPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-libretto',
            template: __webpack_require__(/*! ./libretto.page.html */ "./src/app/pages/carriera/libretto/libretto.page.html"),
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ToastController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ActionSheetController"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"],
            _services_sync_service__WEBPACK_IMPORTED_MODULE_2__["SyncService"],
            _services_http_service__WEBPACK_IMPORTED_MODULE_5__["HttpService"],
            _services_global_data_service__WEBPACK_IMPORTED_MODULE_3__["GlobalDataService"],
            _services_account_service__WEBPACK_IMPORTED_MODULE_4__["AccountService"]])
    ], LibrettoPage);
    return LibrettoPage;
}());



/***/ })

}]);
//# sourceMappingURL=default~libretto-libretto-module~pages-carriera-tabs-carriera-carriera-module.js.map