(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-account-login-carriere-carriere-module"],{

/***/ "./src/app/pages/account/login/carriere/carriere-page.html":
/*!*****************************************************************!*\
  !*** ./src/app/pages/account/login/carriere/carriere-page.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-grid no-padding>\n    <ion-row *ngIf=\"!globalData.landscape && globalData.iPhoneX\">\n      <ion-col>\n        <ion-label> </ion-label>\n      </ion-col>\n    </ion-row>\n    <ion-row no-padding>\n      <ion-col no-padding>\n        <ion-toolbar>\n          <ion-buttons slot=\"start\">\n            <ion-menu-button></ion-menu-button>\n          </ion-buttons>\n          <ion-title>\n            Scelta carriera\n          </ion-title>\n        </ion-toolbar>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-header>\n\n<ion-content padding-top>\n\n  <div *ngIf=\"!carriere\" padding >\n    <ion-label text-center text-wrap>Nessuna carriera selezionata. Prova ad effettuare una disconnessione ed un nuovo accesso!</ion-label>\n    <ion-button expand=\"block\" (click)=\"disconnetti()\">Disconnetti</ion-button>\n  </div>\n\n  <ion-card *ngFor=\"let carriera of carriere\"\n            (click)=\"seleziona(carriera)\">\n    <ion-card-content\n            [ngClass]=\"{'carriera-attiva' : carriera.sta_stu_cod == 'A', 'carriera-cessata' : carriera.sta_stu_cod == 'X'}\">\n      <ion-card-subtitle>{{ carriera.cds_nome }}</ion-card-subtitle>\n      <ion-label text-wrap>Matricola: <b>{{ carriera.matricola }}</b></ion-label>\n      <ion-label text-wrap>Stato: <b>{{ carriera.sta_stu_cod }} ({{ carriera.stato }})</b></ion-label>\n      <ion-label text-wrap>Anno: <b>{{ carriera.AA_ISCR_ID }}</b></ion-label>\n      <ion-label text-wrap>Dipartimento: <b>{{ carriera.dip_nome}}</b></ion-label>\n    </ion-card-content>\n  </ion-card>\n\n</ion-content>\n"

/***/ }),

/***/ "./src/app/pages/account/login/carriere/carriere-page.scss":
/*!*****************************************************************!*\
  !*** ./src/app/pages/account/login/carriere/carriere-page.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".carriera-attiva {\n  background-color: #C8E6C9 !important; }\n\n.carriera-cessata {\n  background-color: #f7f7f7 !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbnRvbmlvX21hc3Ryb3Bhb2xvL0Rlc2t0b3AvbW9kaWZpY2hlQVBQL3N0dWRlbnRpLW1hc3Rlci9zcmMvYXBwL3BhZ2VzL2FjY291bnQvbG9naW4vY2FycmllcmUvY2FycmllcmUtcGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0Usb0NBQW9DLEVBQUE7O0FBR3RDO0VBQ0Usb0NBQW9DLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9hY2NvdW50L2xvZ2luL2NhcnJpZXJlL2NhcnJpZXJlLXBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLmNhcnJpZXJhLWF0dGl2YSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNDOEU2QzkgIWltcG9ydGFudDtcbn1cblxuLmNhcnJpZXJhLWNlc3NhdGEge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjdmN2Y3ICFpbXBvcnRhbnQ7XG59XG5cbiJdfQ== */"

/***/ }),

/***/ "./src/app/pages/account/login/carriere/carriere-page.ts":
/*!***************************************************************!*\
  !*** ./src/app/pages/account/login/carriere/carriere-page.ts ***!
  \***************************************************************/
/*! exports provided: CarrierePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarrierePage", function() { return CarrierePage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var rxjs_internal_util_isArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/internal/util/isArray */ "./node_modules/rxjs/internal/util/isArray.js");
/* harmony import */ var rxjs_internal_util_isArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rxjs_internal_util_isArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _services_sync_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../services/sync.service */ "./src/app/services/sync.service.ts");
/* harmony import */ var _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../services/global-data.service */ "./src/app/services/global-data.service.ts");
/* harmony import */ var _services_account_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../services/account.service */ "./src/app/services/account.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CarrierePage = /** @class */ (function () {
    function CarrierePage(providers, globalData, account, loadingCtrl) {
        this.providers = providers;
        this.globalData = globalData;
        this.account = account;
        this.loadingCtrl = loadingCtrl;
        this.currentPage = '/carriere';
    }
    CarrierePage.prototype.ngOnInit = function () {
        this.carriere = this.globalData.carriere;
        this.username = this.globalData.username;
        this.password = this.globalData.password;
    };
    CarrierePage.prototype.seleziona = function (item) {
        var _this = this;
        this.loadingCtrl.create().then(function (loading) {
            loading.present();
            console.log('[+] log -> seleziona carriera');
            _this.account.login(_this.username, _this.password, item.matricola, item.cds_id, item.dip_id).then(function (risultato) {
                loading.dismiss();
                if (Object(rxjs_internal_util_isArray__WEBPACK_IMPORTED_MODULE_2__["isArray"])(risultato)) {
                    _this.carriere = risultato;
                }
                else {
                    switch (risultato) {
                        case 'unlocked': {
                            _this.globalData.goTo(_this.currentPage, '/home', 'root', false);
                            break;
                        }
                        case 'logged': {
                            _this.globalData.goTo(_this.currentPage, '/tutorial', 'root', false);
                            break;
                        }
                        default: {
                            _this.globalData.goTo(_this.currentPage, '/login', 'root', false);
                        }
                    }
                }
            }, function (err) {
                loading.dismiss();
                _this.globalData.goTo(_this.currentPage, '/login', 'root', false);
            }).catch(function () {
                loading.dismiss();
            });
        });
    };
    CarrierePage.prototype.disconnetti = function () {
        this.globalData.goTo(this.currentPage, '/disconnetti', 'root', false);
    };
    CarrierePage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-carriere',
            template: __webpack_require__(/*! ./carriere-page.html */ "./src/app/pages/account/login/carriere/carriere-page.html"),
            styles: [__webpack_require__(/*! ./carriere-page.scss */ "./src/app/pages/account/login/carriere/carriere-page.scss")]
        }),
        __metadata("design:paramtypes", [_services_sync_service__WEBPACK_IMPORTED_MODULE_3__["SyncService"],
            _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"],
            _services_account_service__WEBPACK_IMPORTED_MODULE_5__["AccountService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["LoadingController"]])
    ], CarrierePage);
    return CarrierePage;
}());



/***/ }),

/***/ "./src/app/pages/account/login/carriere/carriere.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/pages/account/login/carriere/carriere.module.ts ***!
  \*****************************************************************/
/*! exports provided: CarrierePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarrierePageModule", function() { return CarrierePageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _carriere_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./carriere-page */ "./src/app/pages/account/login/carriere/carriere-page.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var CarrierePageModule = /** @class */ (function () {
    function CarrierePageModule() {
    }
    CarrierePageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _carriere_page__WEBPACK_IMPORTED_MODULE_5__["CarrierePage"]
                    }
                ])
            ],
            declarations: [_carriere_page__WEBPACK_IMPORTED_MODULE_5__["CarrierePage"]]
        })
    ], CarrierePageModule);
    return CarrierePageModule;
}());



/***/ })

}]);
//# sourceMappingURL=pages-account-login-carriere-carriere-module.js.map