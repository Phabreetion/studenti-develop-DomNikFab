(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~pages-carriera-tabs-carriera-carriera-module~piano-di-studi-piano-di-studi-module"],{

/***/ "./src/app/pages/carriera/piano-di-studi/piano-di-studi.module.ts":
/*!************************************************************************!*\
  !*** ./src/app/pages/carriera/piano-di-studi/piano-di-studi.module.ts ***!
  \************************************************************************/
/*! exports provided: PianoDiStudiPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PianoDiStudiPageModule", function() { return PianoDiStudiPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _piano_di_studi_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./piano-di-studi.page */ "./src/app/pages/carriera/piano-di-studi/piano-di-studi.page.ts");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var PianoDiStudiPageModule = /** @class */ (function () {
    function PianoDiStudiPageModule() {
    }
    PianoDiStudiPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"],
                _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _piano_di_studi_page__WEBPACK_IMPORTED_MODULE_5__["PianoDiStudiPage"]
                    }
                ])
            ],
            declarations: [_piano_di_studi_page__WEBPACK_IMPORTED_MODULE_5__["PianoDiStudiPage"]]
        })
    ], PianoDiStudiPageModule);
    return PianoDiStudiPageModule;
}());



/***/ }),

/***/ "./src/app/pages/carriera/piano-di-studi/piano-di-studi.page.html":
/*!************************************************************************!*\
  !*** ./src/app/pages/carriera/piano-di-studi/piano-di-studi.page.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n    <ion-grid no-padding>\n        <ion-row *ngIf=\"!globalData.landscape && globalData.iPhoneX\">\n            <ion-col>\n                <ion-label> </ion-label>\n            </ion-col>\n        </ion-row>\n        <ion-row no-padding>\n            <ion-col no-padding>\n                <ion-toolbar>\n                    <ion-buttons slot=\"start\">\n                        <ion-menu-button></ion-menu-button>\n                    </ion-buttons>\n                    <ion-title>\n                        Piano di Studi\n                    </ion-title>\n                    <ion-buttons slot=\"end\">\n                        <ion-back-button *ngIf=\"srcPage\" defaultHref=\"{{srcPage}}\" text=\"Indietro\"></ion-back-button>\n                    </ion-buttons>\n                </ion-toolbar>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-header>\n\n<ion-content>\n    <!--\n    Lo commmento perchè al momento il refresher impedisce il corretto funzionamento\n    di ion-sliding quando ci troviamo all'inizio della lista!\n    <ion-refresher slot=\"fixed\" [disabled]=\"false\" (ionRefresh)=\"doRefresh($event)\">\n      <ion-refresher-content></ion-refresher-content>\n    </ion-refresher>\n      -->\n\n    <ion-grid *ngIf=\"rinvioAggiornamento && !anni\" text-center>\n        <ion-row>\n            <ion-col>\n                <img class=\"progress\" src=\"assets/img/progress.gif\" />\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col text-center>\n                <ion-title><strong>Aggiornamento in corso</strong></ion-title>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col text-center>\n                <ion-label>un attimo di pazienza</ion-label>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n\n    <ion-grid no-padding *ngIf=\"anni\">\n        <ion-row>\n            <ion-col no-padding>\n                <ion-list>\n                    <div *ngFor=\"let anno of anni; let i=index\">\n                        <div *ngIf=\"anno.length>0\">\n                            <ion-item>\n                                <ion-title text-center>{{i+1}}° ANNO</ion-title>\n                            </ion-item>\n\n                            <ion-item-sliding *ngFor=\"let item of anno\">\n                                <!-- (press)=\"onPress(item)\" -->\n                                <ion-item (click)=\"mostraOpzioni(item)\">\n                                    <ion-grid fixed no-padding >\n                                        <ion-row [ngClass]=\"{'superato' : item.VOTO && item.LODE==0, 'superato-lode' : item.VOTO && item.LODE==1, 'da-sostenere' : !item.VOTO && item.VALUTAZIONE!='G' , 'idoneo' : item.GIUDIZIO}\">\n                                            <ion-col size=\"10\">\n                                                <ion-grid>\n                                                    <ion-row class=\"nome-esame\">\n                                                        <ion-col>\n                                                            <div class=\"nome-esame\" text-wrap>{{ item.DESCRIZIONE }}\n                                                                <ion-icon *ngIf=\"item.SOTTOSCRITTO\" name=\"checkmark-circle-outline\"></ion-icon>\n                                                            </div>\n                                                        </ion-col>\n                                                    </ion-row>\n                                                    <ion-row class=\"dati-esame\">\n                                                        <ion-col size=\"4\"  >\n                                                            <div>CFU: {{ item.CFU }}</div>\n                                                        </ion-col>\n                                                        <ion-col *ngIf=\"item.DATA_ESAME\" size=\"1\" >\n                                                            <ion-icon name=\"calendar\"></ion-icon>\n                                                        </ion-col>\n                                                        <ion-col *ngIf=\"item.DATA_ESAME\" size=\"5\" >\n                                                            <div>{{item.DATA_ESAME | slice:0:10}}</div>\n                                                        </ion-col>\n                                                        <ion-col *ngIf=\"!item.DATA_ESAME\" size=\"1\" >\n                                                            <ion-icon name=\"information-circle\"></ion-icon>\n                                                        </ion-col>\n                                                        <ion-col *ngIf=\"!item.DATA_ESAME\" size=\"5\"  >\n                                                            <div>{{item.CODICE}}</div>\n                                                        </ion-col>\n                                                    </ion-row>\n                                                </ion-grid>\n                                            </ion-col>\n\n                                            <ion-col size=\"2\" *ngIf=\"item.VOTO || item.VALUTAZIONE=='G'\" align-self-center=\"true\">\n                                                <div *ngIf=\"item.VOTO && item.LODE==0\" class=\"voto\">{{item.VOTO | slice:0:3}}</div>\n                                                <div *ngIf=\"item.VOTO && item.LODE==1\" class=\"voto\">30L</div>\n                                                <div *ngIf=\"!item.VOTO\" class=\"voto\">{{item.GIUDIZIO | slice:0:3}}</div>\n                                            </ion-col>\n                                        </ion-row>\n\n                                    </ion-grid>\n                                </ion-item>\n\n                                <ion-item-options side=\"end\" slot=\"top\">\n                                    <ion-item-option *ngIf=\"item.VOTO || item.GIUDIZIO\" (click)=\"dettagliEsame(item)\">\n                                        Dettagli esame\n                                    </ion-item-option>\n                                    <ion-item-option *ngIf=\"!item.VOTO && !item.GIUDIZIO\" (click)=\"appelliEsame(item)\">\n                                        Appelli\n                                    </ion-item-option>\n                                    <ion-item-option color=\"light\" (click)=\"apriMaterialeDidattico(item.AD_ID)\">\n                                        Materiale<br/>Didattico\n                                    </ion-item-option>\n                                </ion-item-options>\n                                <!--\n                                <ion-item-options side=\"start\">\n                                    <ion-item-option color=\"secondary\" *ngIf=\"!item.SOTTOSCRITTO\" (click)=\"inviaACalendario(item)\">\n                                        Aggiungi al<br/>Calendario Lezioni\n                                    </ion-item-option>\n                                    <ion-item-option color=\"danger\" *ngIf=\"item.SOTTOSCRITTO\" (click)=\"inviaACalendario(item)\">\n                                        Rimuovi dal<br/>Calendario Lezioni\n                                    </ion-item-option>\n                                </ion-item-options>\n                                -->\n                            </ion-item-sliding>\n                        </div>\n                    </div>\n                </ion-list>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>\n\n<ion-footer>\n    <ion-toolbar>\n        <ion-buttons slot=\"start\">\n            <ion-spinner [hidden]=\"!isLoading() || !http.getConnected()\"></ion-spinner>\n            <fa-icon [hidden]=\"isLoading() || !http.getConnected()\" [icon]=\"globalData.faLink\"></fa-icon>\n            <fa-icon [hidden]=\"isLoading() || http.getConnected()\"  [icon]=\"globalData.faUnlink\"></fa-icon>\n        </ion-buttons>\n\n        <div class=\"testo-footer\">\n            Aggiornato al: {{dataAggiornamento}}\n        </div>\n\n        <ion-buttons slot=\"end\">\n            <ion-button icon-only (click)=\"selezionaTab()\"><ion-icon name=\"more\"></ion-icon></ion-button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-footer>\n"

/***/ }),

/***/ "./src/app/pages/carriera/piano-di-studi/piano-di-studi.page.scss":
/*!************************************************************************!*\
  !*** ./src/app/pages/carriera/piano-di-studi/piano-di-studi.page.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-item {\n  --padding-start:0px;\n  --inner-padding-end:0px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbnRvbmlvX21hc3Ryb3Bhb2xvL0Rlc2t0b3AvbW9kaWZpY2hlQVBQL3N0dWRlbnRpLW1hc3Rlci9zcmMvYXBwL3BhZ2VzL2NhcnJpZXJhL3BpYW5vLWRpLXN0dWRpL3BpYW5vLWRpLXN0dWRpLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG1CQUFnQjtFQUNoQix1QkFBb0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2NhcnJpZXJhL3BpYW5vLWRpLXN0dWRpL3BpYW5vLWRpLXN0dWRpLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1pdGVtIHtcbiAgLS1wYWRkaW5nLXN0YXJ0OjBweDtcbiAgLS1pbm5lci1wYWRkaW5nLWVuZDowcHg7XG59Il19 */"

/***/ }),

/***/ "./src/app/pages/carriera/piano-di-studi/piano-di-studi.page.ts":
/*!**********************************************************************!*\
  !*** ./src/app/pages/carriera/piano-di-studi/piano-di-studi.page.ts ***!
  \**********************************************************************/
/*! exports provided: PianoDiStudiPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PianoDiStudiPage", function() { return PianoDiStudiPage; });
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
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






var PianoDiStudiPage = /** @class */ (function () {
    // lastItem: any;
    // threeDeeTouchEnabled = false;
    // actions: Array<ThreeDeeTouchQuickAction> = [
    //     {
    //         type: 'checkin',
    //         title: 'Check in',
    //         subtitle: 'Quickly check in',
    //         iconType: 'Compose'
    //     },
    //     {
    //         type: 'share',
    //         title: 'Share',
    //         subtitle: 'Share like you care',
    //         iconType: 'Share'
    //     },
    //     {
    //         type: 'search',
    //         title: 'Search',
    //         iconType: 'Search'
    //     },
    //     {
    //         title: 'Show favorites',
    //         iconTemplate: 'HeartTemplate'
    //     }
    // ];
    function PianoDiStudiPage(ngZone, sync, http, globalData, toastCtrl, actionSheetCtrl, account) {
        this.ngZone = ngZone;
        this.sync = sync;
        this.http = http;
        this.globalData = globalData;
        this.toastCtrl = toastCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.account = account;
        this.currentPage = '/carriera/tab/piano-di-studi';
        this.idServizio = 12;
        this.nrPrimoAnno = 0;
        this.nrSecondoAnno = 0;
        this.nrTerzoAnno = 0;
        this.nrQuartoAnno = 0;
        this.nrQuintoAnno = 0;
        this.nrSestoAnno = 0;
        this.nrSuccessiviAnno = 0;
        this.aggiornamentoVerificato = false;
        this.rinvioAggiornamento = false;
        this.nrRinvii = 0;
        this.maxNrRinvii = 5;
    }
    PianoDiStudiPage.prototype.ngOnInit = function () {
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
        // this.threeDeeTouch.isAvailable().then(isAvailable => {
        //     if (isAvailable) {
        //         this.threeDeeTouchEnabled = true;
        //         this.threeDeeTouch.watchForceTouches()
        //             .subscribe(
        //                 (data: ThreeDeeTouchForceTouch) => {
        //                     console.dir(data);
        //                     console.log('Force touch %' + data.force);
        //                     console.log('Force touch timestamp: ' + data.timestamp);
        //                     console.log('Force touch x: ' + data.x);
        //                     console.log('Force touch y: ' + data.y);
        //                     console.dir(this.lastItem);
        //                 }
        //             );
        //         this.threeDeeTouch.configureQuickActions(this.actions);
        //         this.threeDeeTouch.onHomeIconPressed().subscribe(
        //             (payload) => {
        //                 // returns an object that is the button you presed
        //                 console.log('Pressed the ${payload.title} button')
        //                 console.log(payload.type)
        //
        //             });
        //     } else {
        //         this.threeDeeTouchEnabled = true;
        //     }
        // }, (err) => {
        //     this.threeDeeTouchEnabled = false;
        // });
    };
    PianoDiStudiPage.prototype.swipeEvent = function (event) {
        // console.log('Swiped');
        // if (event.direction === 2) {
        //     console.dir('Next');
        // } else {
        //     console.log('Previous');
        // }
        //
        // console.dir(event);
    };
    // select(item) {
    //     this.lastItem = item;
    // }
    PianoDiStudiPage.prototype.aggiorna = function (interattivo, sync) {
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
        this.sync.getJson(this.idServizio, true).then(function (data) {
            if (_this.sync.dataIsChanged(_this.libretto, data[0])) {
                _this.libretto = data[0];
                _this.caricaAnni();
                setTimeout(function () {
                    _this.controllaAggiornamento();
                }, 1000);
            }
            _this.dataAggiornamento = _services_sync_service__WEBPACK_IMPORTED_MODULE_2__["SyncService"].dataAggiornamento(data);
        }, function (err) {
        }).catch(function (err) {
        });
    };
    // listaFile(interattivo:boolean, sync:boolean) {
    //     if (this.sync.loading[18])
    //         return;
    //
    //     this.sync.getJson(18, true).then(
    //         (data) => {
    //             let dati = data[0];
    //             //console.dir(dati);
    //         },
    //         (err) => {
    //         }).catch(err => {
    //         }
    //     );
    // }
    PianoDiStudiPage.prototype.controllaAggiornamento = function () {
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
    PianoDiStudiPage.prototype.isLoading = function () {
        return this.sync.loading[this.idServizio];
    };
    PianoDiStudiPage.prototype.doRefresh = function (refresher) {
        refresher.target.complete();
        if (this.sync.loading[this.idServizio]) {
            return;
        }
        this.aggiorna(true, true);
    };
    PianoDiStudiPage.prototype.onPress = function (item) {
        var _this = this;
        var stato = 'true';
        var etichettaSottoscrizione = 'Aggiungi al Calendario delle Lezioni';
        if (item.SOTTOSCRITTO) {
            stato = 'false';
            etichettaSottoscrizione = 'Rimuovi dal Calendario delle Lezioni';
        }
        this.actionSheetCtrl.create({
            header: item.DESCRIZIONE,
            buttons: [
                {
                    text: 'Appelli',
                    icon: 'book',
                    handler: function () {
                        _this.globalData.goTo(_this.currentPage, '/appelli/' + item.CODICE, 'forward', false);
                    }
                }, {
                    text: etichettaSottoscrizione,
                    icon: 'calendar',
                    handler: function () {
                        _this.inviaACalendario(item);
                    }
                }, {
                    text: 'Materiale didattico',
                    icon: 'archive',
                    handler: function () {
                        console.dir('File per ' + item.AD_ID);
                        _this.apriMaterialeDidattico(item.AD_ID);
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
    PianoDiStudiPage.prototype.caricaAnni = function () {
        this.anni = Array();
        this.primoAnno = Array();
        this.primoAnno = Array();
        this.secondoAnno = Array();
        this.terzoAnno = Array();
        this.primoAnno = Array();
        this.quartoAnno = Array();
        this.quintoAnno = Array();
        this.sestoAnno = Array();
        this.anniSuccessivi = Array();
        this.nrPrimoAnno = 0;
        this.nrSecondoAnno = 0;
        this.nrTerzoAnno = 0;
        this.nrQuartoAnno = 0;
        this.nrQuintoAnno = 0;
        this.nrSestoAnno = 0;
        this.nrSuccessiviAnno = 0;
        for (var _i = 0, _a = this.libretto; _i < _a.length; _i++) {
            var riga = _a[_i];
            switch (riga.ANNO) {
                case '1':
                    this.primoAnno[this.nrPrimoAnno] = riga;
                    this.nrPrimoAnno++;
                    break;
                case '2':
                    this.secondoAnno[this.nrSecondoAnno] = riga;
                    this.nrSecondoAnno++;
                    break;
                case '3':
                    this.terzoAnno[this.nrTerzoAnno] = riga;
                    this.nrTerzoAnno++;
                    break;
                case '4':
                    this.quartoAnno[this.nrQuartoAnno] = riga;
                    this.nrQuartoAnno++;
                    break;
                case '5':
                    this.quintoAnno[this.nrQuintoAnno] = riga;
                    this.nrQuintoAnno++;
                    break;
                case '6':
                    this.sestoAnno[this.nrSestoAnno] = riga;
                    this.nrSestoAnno++;
                    break;
                default:
                    this.anniSuccessivi[this.nrSuccessiviAnno] = riga;
                    this.nrSuccessiviAnno++;
                    break;
            }
        }
        for (var i = 0; i <= 6; i++) {
            this.anni[i] = Array();
        }
        if (this.nrPrimoAnno > 0) {
            this.anni[0] = this.primoAnno;
        }
        if (this.nrSecondoAnno > 0) {
            this.anni[1] = this.secondoAnno;
        }
        if (this.nrTerzoAnno > 0) {
            this.anni[2] = this.terzoAnno;
        }
        if (this.nrQuartoAnno > 0) {
            this.anni[3] = this.quartoAnno;
        }
        if (this.nrQuintoAnno > 0) {
            this.anni[4] = this.quintoAnno;
        }
        if (this.nrSestoAnno > 0) {
            this.anni[5] = this.sestoAnno;
        }
        if (this.nrSuccessiviAnno > 0) {
            this.anni[6] = this.anniSuccessivi;
        }
    };
    PianoDiStudiPage.prototype.selezionaTab = function () {
        var _this = this;
        this.actionSheetCtrl.create({
            header: 'Mostra',
            buttons: [
                {
                    text: 'Libretto',
                    icon: 'list-box',
                    handler: function () {
                        _this.globalData.goTo(_this.currentPage, '/carriera/tab/libretto', 'forward', false);
                    }
                }, {
                    text: 'Esami da sostenere',
                    icon: 'list',
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
    PianoDiStudiPage.prototype.appelliEsame = function (esame) {
        this.globalData.goTo(this.currentPage, '/appelli/' + esame.CODICE, 'forward', false);
    };
    PianoDiStudiPage.prototype.dettagliEsame = function (esame) {
        // console.dir(esame);
        this.globalData.esame = esame;
        this.globalData.goTo(this.currentPage, '/esame', 'forward', false);
    };
    PianoDiStudiPage.prototype.apriMaterialeDidattico = function (ad_id) {
        this.globalData.ad_id = ad_id;
        this.globalData.goTo(this.currentPage, '/materiale-didattico/' + ad_id, 'forward', false);
    };
    PianoDiStudiPage.prototype.inviaACalendario = function (item) {
        var _this = this;
        var stato = 'true';
        if (item.SOTTOSCRITTO) {
            stato = 'false';
        }
        this.sync.sottoscriviCalendario(item.CODICE, stato).then(function (data) {
            var esito = JSON.parse(data['_body']);
            var msg = esito ? esito['msg'] : null;
            var codice = esito ? esito['codice'] : -1;
            if (msg) {
                _this.toastCtrl.create({
                    message: msg,
                    duration: 3000
                }).then(function (toast) { toast.present(); }, function (toastErr) { _services_global_data_service__WEBPACK_IMPORTED_MODULE_3__["GlobalDataService"].log(2, 'Toast fallito!', toastErr); });
            }
            if (codice === 0) {
                item.SOTTOSCRITTO = item.SOTTOSCRITTO === 0 ? 1 : 0;
            }
        }, function (err) {
            console.dir(err);
        }).catch(function (reason) {
            console.dir(reason);
        });
    };
    PianoDiStudiPage.prototype.mostraOpzioni = function (esame) {
        return __awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetCtrl.create({
                            header: esame.DESCRIZIONE,
                            buttons: [{
                                    text: 'Dettali esame',
                                    icon: 'information-circle',
                                    handler: function () {
                                        _this.dettagliEsame(esame);
                                    }
                                }, {
                                    text: 'Appelli',
                                    icon: 'book',
                                    handler: function () {
                                        _this.appelliEsame(esame);
                                    }
                                }, {
                                    text: 'Materiale didattico',
                                    icon: 'archive',
                                    handler: function () {
                                        _this.apriMaterialeDidattico(esame.AD_ID);
                                    }
                                }, {
                                    text: 'Chiudi',
                                    icon: 'close',
                                    role: 'cancel',
                                    handler: function () {
                                    }
                                }]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PianoDiStudiPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-piano-di-studi',
            template: __webpack_require__(/*! ./piano-di-studi.page.html */ "./src/app/pages/carriera/piano-di-studi/piano-di-studi.page.html"),
            styles: [__webpack_require__(/*! ./piano-di-studi.page.scss */ "./src/app/pages/carriera/piano-di-studi/piano-di-studi.page.scss")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"],
            _services_sync_service__WEBPACK_IMPORTED_MODULE_2__["SyncService"],
            _services_http_service__WEBPACK_IMPORTED_MODULE_5__["HttpService"],
            _services_global_data_service__WEBPACK_IMPORTED_MODULE_3__["GlobalDataService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ToastController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ActionSheetController"],
            _services_account_service__WEBPACK_IMPORTED_MODULE_4__["AccountService"]])
    ], PianoDiStudiPage);
    return PianoDiStudiPage;
}());



/***/ })

}]);
//# sourceMappingURL=default~pages-carriera-tabs-carriera-carriera-module~piano-di-studi-piano-di-studi-module.js.map