(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-servizi-rubrica-contatto-contatto-module"],{

/***/ "./src/app/pages/servizi/rubrica/contatto/contatto.html":
/*!**************************************************************!*\
  !*** ./src/app/pages/servizi/rubrica/contatto/contatto.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-grid no-padding>\n    <ion-row *ngIf=\"!globalData.landscape && globalData.iPhoneX\">\n      <ion-col>\n        <ion-label> </ion-label>\n      </ion-col>\n    </ion-row>\n    <ion-row no-padding>\n      <ion-col no-padding>\n        <ion-toolbar>\n          <ion-buttons slot=\"start\">\n            <ion-menu-button></ion-menu-button>\n          </ion-buttons>\n          <ion-title>\n            Contatto\n          </ion-title>\n          <ion-buttons slot=\"end\">\n            <ion-back-button defaultHref=\"/rubrica\" text=\"Indietro\"></ion-back-button>\n          </ion-buttons>\n        </ion-toolbar>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-header>\n\n<ion-content>\n\n  <ion-card *ngIf=\"contatto\">\n    <ion-card-content>\n      <ion-card-title>\n        {{ contatto.nome }} {{ contatto.cognome }}\n      </ion-card-title>\n      <ion-label text-wrap>\n        {{ contatto.struttura }}\n      </ion-label>\n      <ion-label text-wrap>\n        {{ contatto.edificio }}\n      </ion-label>\n      <ion-label text-wrap>\n        {{ contatto.indirizzo}} {{ contatto.citta}}\n      </ion-label>\n    </ion-card-content>\n\n    <ion-list>\n      <ion-item *ngIf=\"contatto.email_utente\">\n        <ion-icon name='at' item-start style=\"color: #266acb\"></ion-icon>\n        <ion-label><a href=\"mailto:{{ contatto.email_utente}}\">{{ contatto.email_utente }}</a></ion-label>\n      </ion-item>\n\n      <ion-item>\n        <ion-icon name='call' item-start style=\"color: #266acb\"></ion-icon>\n        <ion-label><a href=\"tel:{{ contatto.tel1 }}\">{{ contatto.tel1 }}</a></ion-label>\n      </ion-item>\n\n      <ion-item *ngIf=\"contatto.tel2\">\n        <ion-icon name='call' item-start style=\"color: #479e2f\"></ion-icon>\n        <ion-label><a href=\"tel:{{ contatto.tel2 }}\">{{ contatto.tel2 }}</a></ion-label>\n      </ion-item>\n\n      <ion-item *ngIf=\"contatto.tel3\">\n        <ion-icon name='call' item-start style=\"color: #d62f26\"></ion-icon>\n        <ion-label><a href=\"tel:{{ contatto.tel3 }}\">{{ contatto.tel3 }}</a></ion-label>\n      </ion-item>\n\n      <ion-item *ngIf=\"contatto.tel4\">\n        <ion-icon name='call' item-start></ion-icon>\n        <ion-label><a href=\"tel:{{ contatto.tel4 }}\">{{ contatto.tel4 }}</a></ion-label>\n      </ion-item>\n    </ion-list>\n  </ion-card>\n\n  <ion-card text-wrap *ngIf=\"!contatto\">\n    <ion-card-header text-center text-wrap ng-bind-html=\"snippet\">\n      <ion-label color=\"primary\"><h1>Ops!</h1></ion-label>\n    </ion-card-header>\n    <ion-card-content>\n      <ion-label text-center text-wrap>\n        Si è verificato un problema durante l'accesso all'archivio contatti.\n      </ion-label>\n      <ion-label text-center text-wrap>\n        Utilizza il tasto Back in alto per selezionare nuovamente l'elemento da visualizzare.\n      </ion-label>\n    </ion-card-content>\n  </ion-card>\n\n</ion-content>\n"

/***/ }),

/***/ "./src/app/pages/servizi/rubrica/contatto/contatto.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/pages/servizi/rubrica/contatto/contatto.module.ts ***!
  \*******************************************************************/
/*! exports provided: ContattoPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContattoPageModule", function() { return ContattoPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _contatto__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./contatto */ "./src/app/pages/servizi/rubrica/contatto/contatto.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var ContattoPageModule = /** @class */ (function () {
    function ContattoPageModule() {
    }
    ContattoPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _contatto__WEBPACK_IMPORTED_MODULE_5__["ContattoPage"]
                    }
                ])
            ],
            declarations: [_contatto__WEBPACK_IMPORTED_MODULE_5__["ContattoPage"]]
        })
    ], ContattoPageModule);
    return ContattoPageModule;
}());



/***/ }),

/***/ "./src/app/pages/servizi/rubrica/contatto/contatto.ts":
/*!************************************************************!*\
  !*** ./src/app/pages/servizi/rubrica/contatto/contatto.ts ***!
  \************************************************************/
/*! exports provided: ContattoPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContattoPage", function() { return ContattoPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_global_data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../services/global-data.service */ "./src/app/services/global-data.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContattoPage = /** @class */ (function () {
    function ContattoPage(globalData) {
        this.globalData = globalData;
    }
    ContattoPage.prototype.ngOnInit = function () {
        this.contatto = this.globalData.contatto;
        if ((this.contatto.tel1 != null) && (this.contatto.tel1 !== '')) {
            if (this.contatto.tel1.indexOf('+39') !== 0) {
                this.contatto.tel1 = '+39 0874 404' + this.contatto.tel1;
            }
        }
        else {
            this.contatto.tel1 = 'Numero non presente!';
        }
        if ((this.contatto.tel2 != null)
            && (this.contatto.tel2 !== '')
            && (this.contatto.tel2.indexOf('+39') !== 0)
            && (this.contatto.tel2.indexOf('0') !== 0)) {
            this.contatto.tel2 = '+39 0874 404' + this.contatto.tel2.slice(1);
        }
        if ((this.contatto.tel3 != null) &&
            (this.contatto.tel3 !== '') &&
            (this.contatto.tel3.indexOf('+39') !== 0)
            && (this.contatto.tel3.indexOf('0') !== 0)) {
            this.contatto.tel3 = '+39 0874 404' + this.contatto.tel3.slice(1);
        }
        if ((this.contatto.tel4 != null) &&
            (this.contatto.tel4 !== '') &&
            (this.contatto.tel4.indexOf('+39') !== 0) &&
            (this.contatto.tel4.indexOf('0') !== 0)) {
            this.contatto.tel4 = '+39 0874 404' + this.contatto.tel4.slice(1);
        }
    };
    ContattoPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-contatto',
            template: __webpack_require__(/*! ./contatto.html */ "./src/app/pages/servizi/rubrica/contatto/contatto.html"),
        }),
        __metadata("design:paramtypes", [_services_global_data_service__WEBPACK_IMPORTED_MODULE_1__["GlobalDataService"]])
    ], ContattoPage);
    return ContattoPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-servizi-rubrica-contatto-contatto-module.js.map