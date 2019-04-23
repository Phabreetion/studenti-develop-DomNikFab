(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-carriera-storico-esami-storico-esami-module"],{

/***/ "./src/app/pages/carriera/storico-esami/storico-esami.html":
/*!*****************************************************************!*\
  !*** ./src/app/pages/carriera/storico-esami/storico-esami.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-grid no-padding>\n    <ion-row *ngIf=\"!globalData.landscape && globalData.iPhoneX\">\n      <ion-col>\n        <ion-label> </ion-label>\n      </ion-col>\n    </ion-row>\n    <ion-row no-padding>\n      <ion-col no-padding>\n        <ion-toolbar>\n          <ion-buttons slot=\"start\">\n            <ion-menu-button></ion-menu-button>\n          </ion-buttons>\n          <ion-title>\n            Esami sostenuti\n          </ion-title>\n          <ion-buttons slot=\"end\">\n            <ion-buttons slot=\"end\">\n              <ion-back-button defaultHref=\"/home\" text=\"Indietro\"></ion-back-button>\n            </ion-buttons>\n          </ion-buttons>\n        </ion-toolbar>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-header>\n\n<ion-content>\n  <ion-grid *ngIf=\"rinvioAggiornamento && !storico\" text-center>\n    <ion-row>\n      <ion-col text-center>\n        <img class=\"progress\" src=\"assets/img/progress.gif\" />\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col text-center>\n        <ion-title><strong>Aggiornamento in corso</strong></ion-title>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col text-center>\n        <ion-label>un attimo di pazienza</ion-label>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-list *ngIf=\"!rinvioAggiornamento && storico?.length == 0\">\n    <ion-item text-center>\n      <ion-grid>\n        <ion-row>\n          <ion-col>\n            <h2>Nessun esame presente</h2>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col>\n            <img class=\"logo\" src=\"assets/img/sad.png\" />\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-item>\n  </ion-list>\n\n  <ion-list *ngIf=\"storico?.length > 0\">\n    <ion-item *ngFor=\"let item of storico\">\n      <ion-grid fixed no-padding>\n        <ion-row>\n          <ion-col size=\"10\">\n            <ion-row>\n              <ion-col text-wrap>\n                <div class=\"nome-esame\">{{ item.descrizione }}</div>\n              </ion-col>\n            </ion-row>\n            <ion-row class=\"dati-esame\">\n              <ion-col size=\"1\">\n                <ion-icon name=\"create\"></ion-icon>\n              </ion-col>\n              <ion-col size=\"4\">\n                <div>{{ item.peso }} CFU</div>\n              </ion-col>\n              <ion-col *ngIf=\"item.voto\" size=\"1\">\n                <ion-icon name=\"calendar\"></ion-icon>\n              </ion-col>\n              <ion-col *ngIf=\"item.voto\" size=\"4\">\n                <div>{{item.data_sup | slice:0:10}}</div>\n              </ion-col>\n              <ion-col *ngIf=\"!item.voto\" size=\"1\">\n                <ion-icon name=\"information-circle\"></ion-icon>\n              </ion-col>\n              <ion-col *ngIf=\"!item.voto\" size=\"4\">\n                <div>{{item.codice}}</div>\n              </ion-col>\n              <ion-col *ngIf=\"!item.voto\" size=\"1\">\n                <ion-icon name=\"bookmark\"></ion-icon>\n              </ion-col>\n              <ion-col *ngIf=\"!item.voto\" size=\"1\">\n                <div>{{item.num_app_futuri}}</div>\n              </ion-col>\n            </ion-row>\n          </ion-col>\n\n          <ion-col *ngIf=\"item.voto\" size=\"2\" align-self-center>\n            <div *ngIf=\"item.voto!='30 e lode'\">\n              <ion-col>\n                <div class=\"voto\">{{item.voto | slice:0:3}}</div>\n              </ion-col>\n            </div>\n            <div *ngIf=\"item.voto=='30 e lode'\">\n              <ion-col>\n                <div class=\"voto\">30L</div>\n              </ion-col>\n            </div>\n          </ion-col>\n          <ion-col *ngIf=\"!item.voto\" size=\"2\">\n            <div>\n              <ion-col>\n                <div class=\"voto\">{{item.sta_sce_cod | slice:0:3}}</div>\n              </ion-col>\n            </div>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>\n\n<ion-footer  no-padding>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <fa-icon [hidden]=\"!http.getConnected()\" [icon]=\"globalData.faLink\"></fa-icon>\n      <fa-icon [hidden]=\"http.getConnected()\"  [icon]=\"globalData.faUnlink\"></fa-icon>\n    </ion-buttons>\n\n    <div class=\"testo-footer\">\n      Aggiornato al: {{dataAggiornamento}}\n    </div>\n\n    <ion-buttons slot=\"end\" no-padding>\n      <ion-icon slot=\"icon-only\" src=\"assets/icon/blank.png\"></ion-icon>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-footer>"

/***/ }),

/***/ "./src/app/pages/carriera/storico-esami/storico-esami.module.ts":
/*!**********************************************************************!*\
  !*** ./src/app/pages/carriera/storico-esami/storico-esami.module.ts ***!
  \**********************************************************************/
/*! exports provided: StoricoEsamiPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StoricoEsamiPageModule", function() { return StoricoEsamiPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _storico_esami__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./storico-esami */ "./src/app/pages/carriera/storico-esami/storico-esami.ts");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var StoricoEsamiPageModule = /** @class */ (function () {
    function StoricoEsamiPageModule() {
    }
    StoricoEsamiPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"],
                _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _storico_esami__WEBPACK_IMPORTED_MODULE_5__["StoricoEsamiPage"]
                    }
                ])
            ],
            declarations: [_storico_esami__WEBPACK_IMPORTED_MODULE_5__["StoricoEsamiPage"]]
        })
    ], StoricoEsamiPageModule);
    return StoricoEsamiPageModule;
}());



/***/ }),

/***/ "./src/app/pages/carriera/storico-esami/storico-esami.scss":
/*!*****************************************************************!*\
  !*** ./src/app/pages/carriera/storico-esami/storico-esami.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "page-storico-esami .superato {\n  border-left: 4px solid green; }\n\npage-storico-esami .da-sostenere {\n  border-left: 4px solid red; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbnRvbmlvX21hc3Ryb3Bhb2xvL0Rlc2t0b3AvbW9kaWZpY2hlQVBQL3N0dWRlbnRpLW1hc3Rlci9zcmMvYXBwL3BhZ2VzL2NhcnJpZXJhL3N0b3JpY28tZXNhbWkvc3Rvcmljby1lc2FtaS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBR1EsNEJBQTRCLEVBQUE7O0FBSHBDO0VBT1EsMEJBQ0osRUFBQSIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2NhcnJpZXJhL3N0b3JpY28tZXNhbWkvc3Rvcmljby1lc2FtaS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsicGFnZS1zdG9yaWNvLWVzYW1pIHtcblxuICAgIC5zdXBlcmF0byB7XG4gICAgICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgZ3JlZW47XG4gICAgfVxuXG4gICAgLmRhLXNvc3RlbmVyZSB7XG4gICAgICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgcmVkXG4gICAgfVxufVxuIl19 */"

/***/ }),

/***/ "./src/app/pages/carriera/storico-esami/storico-esami.ts":
/*!***************************************************************!*\
  !*** ./src/app/pages/carriera/storico-esami/storico-esami.ts ***!
  \***************************************************************/
/*! exports provided: StoricoEsamiPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StoricoEsamiPage", function() { return StoricoEsamiPage; });
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






var StoricoEsamiPage = /** @class */ (function () {
    function StoricoEsamiPage(toastCtrl, sync, http, globalData, account) {
        this.toastCtrl = toastCtrl;
        this.sync = sync;
        this.http = http;
        this.globalData = globalData;
        this.account = account;
        this.currentPage = '/storico-esami';
        this.idServizio = 9;
        this.aggiornamentoVerificato = false;
        this.rinvioAggiornamento = false;
        this.nrRinvii = 0;
        this.maxNrRinvii = 5;
    }
    StoricoEsamiPage.prototype.ngOnInit = function () {
        var _this = this;
        this.globalData.srcPage = this.currentPage;
        this.account.controllaAccount().then(function () {
            _this.http.getConnected();
            _this.aggiorna(false, true);
        }, function (err) {
            _this.globalData.goTo(_this.currentPage, '/login', 'root', err);
        });
    };
    // onGoBack()  {
    //     this.navCtrl.navigateBack('/home').then(
    //         () => { },
    //         (errNavigate => {
    //             GlobalDataService.log(
    //                 2,
    //                 'Errore nella chiamata al NavController ',
    //                 errNavigate);
    //         }));
    // }
    StoricoEsamiPage.prototype.aggiorna = function (interattivo, sync) {
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
        this.sync.getJson(this.idServizio, sync).then(function (data) {
            if (_this.sync.dataIsChanged(_this.storico, _this.carriera[0]['storico_esami'])) {
                _this.carriera = data;
                _this.storico = _this.carriera[0]['storico_esami'];
                setTimeout(function () {
                    _this.controllaAggiornamento();
                }, 1000);
            }
            _this.dataAggiornamento = _services_sync_service__WEBPACK_IMPORTED_MODULE_2__["SyncService"].dataAggiornamento(data);
        }, function (err) {
            console.log('Errore in aggiorna: ' + err);
        }).catch(function (err) {
            console.log('Eccezione in aggiorna: ' + err);
            setTimeout(function () {
                _this.controllaAggiornamento();
            }, 1000);
        });
    };
    StoricoEsamiPage.prototype.controllaAggiornamento = function () {
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
    StoricoEsamiPage.prototype.isLoading = function () {
        return this.sync.loading[this.idServizio];
    };
    StoricoEsamiPage.prototype.doRefresh = function (refresher) {
        if (refresher) {
            refresher.complete();
        }
        if (this.sync.loading[this.idServizio]) {
            return;
        }
        this.aggiorna(true, true);
    };
    StoricoEsamiPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-storico-esami',
            template: __webpack_require__(/*! ./storico-esami.html */ "./src/app/pages/carriera/storico-esami/storico-esami.html"),
            styles: [__webpack_require__(/*! ./storico-esami.scss */ "./src/app/pages/carriera/storico-esami/storico-esami.scss")]
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ToastController"],
            _services_sync_service__WEBPACK_IMPORTED_MODULE_2__["SyncService"],
            _services_http_service__WEBPACK_IMPORTED_MODULE_5__["HttpService"],
            _services_global_data_service__WEBPACK_IMPORTED_MODULE_3__["GlobalDataService"],
            _services_account_service__WEBPACK_IMPORTED_MODULE_4__["AccountService"]])
    ], StoricoEsamiPage);
    return StoricoEsamiPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-carriera-storico-esami-storico-esami-module.js.map