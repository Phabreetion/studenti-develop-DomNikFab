(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-carriera-materiale-didattico-allegato-allegato-module"],{

/***/ "./src/app/pages/carriera/materiale-didattico/allegato/allegato.html":
/*!***************************************************************************!*\
  !*** ./src/app/pages/carriera/materiale-didattico/allegato/allegato.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-grid no-padding>\n    <ion-row *ngIf=\"!globalData.landscape && globalData.iPhoneX\">\n      <ion-col>\n        <ion-label> </ion-label>\n      </ion-col>\n    </ion-row>\n    <ion-row no-padding>\n      <ion-col no-padding>\n        <ion-toolbar>\n          <ion-buttons slot=\"start\">\n            <ion-menu-button></ion-menu-button>\n          </ion-buttons>\n          <ion-title>\n            File\n          </ion-title>\n          <ion-buttons slot=\"end\">\n            <ion-back-button defaultHref=\"/materiale-didattico/{{ad_id}}\" text=\"Indietro\"></ion-back-button>\n          </ion-buttons>\n        </ion-toolbar>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-header>\n<ion-content no-padding>\n\n  <ion-card text-wrap *ngIf=\"!allegato\">\n    <ion-card-header text-center text-wrap ng-bind-html=\"snippet\">\n      <ion-label color=\"primary\"><h1>Ops!</h1></ion-label>\n    </ion-card-header>\n    <ion-card-content>\n      <ion-label text-center text-wrap>\n        Si è verificato un problema durante l'accesso al materiale didattico per questo insegnamento.\n      </ion-label>\n      <ion-label text-center text-wrap>\n        Utilizza il tasto Back in alto per selezionare nuovamente l'elemento da visualizzare.\n      </ion-label>\n    </ion-card-content>\n  </ion-card>\n\n  <ion-card text-wrap *ngIf=\"allegato\">\n\n    <ion-card-title>\n      <ion-label text-center text-wrap>\n        {{ this.pulisciAllegato(allegato.TITOLO) }}\n      </ion-label>\n    </ion-card-title>\n    <ion-card-subtitle text-center text-wrap>\n      {{ allegato.AUTORE }}\n    </ion-card-subtitle>\n    <ion-card-content text-wrap>\n      <ion-label text-wrap>Data: {{ allegato.DATA_INS }}</ion-label>\n      <ion-label text-wrap>File:{{ this.pulisciAllegato(allegato.FILENAME) }}</ion-label>\n      <div *ngIf=\"allegato.TESTO\">\n       Note:<p [innerHtml]=\"this.pulisciAllegato(allegato.TESTO)\"></p>\n      </div>\n\n    </ion-card-content>\n\n    <ion-grid>\n      <ion-row>\n        <ion-col text-center>\n          <ion-button icon-left color=\"light\" (click)=\"apriFile()\">\n            <ion-icon name=\"easel\" color=\"primary\"></ion-icon>\n            Apri\n          </ion-button>\n        </ion-col>\n        <ion-col text-center>\n          <ion-button icon-left color=\"danger\" (click)=\"eliminaFile()\">\n            <ion-icon name=\"trash\"></ion-icon>\n            Elimina\n          </ion-button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n  </ion-card>\n\n</ion-content>\n"

/***/ }),

/***/ "./src/app/pages/carriera/materiale-didattico/allegato/allegato.module.ts":
/*!********************************************************************************!*\
  !*** ./src/app/pages/carriera/materiale-didattico/allegato/allegato.module.ts ***!
  \********************************************************************************/
/*! exports provided: AllegatoPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AllegatoPageModule", function() { return AllegatoPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _allegato__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./allegato */ "./src/app/pages/carriera/materiale-didattico/allegato/allegato.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var AllegatoPageModule = /** @class */ (function () {
    function AllegatoPageModule() {
    }
    AllegatoPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _allegato__WEBPACK_IMPORTED_MODULE_5__["AllegatoPage"]
                    }
                ])
            ],
            declarations: [_allegato__WEBPACK_IMPORTED_MODULE_5__["AllegatoPage"]]
        })
    ], AllegatoPageModule);
    return AllegatoPageModule;
}());



/***/ }),

/***/ "./src/app/pages/carriera/materiale-didattico/allegato/allegato.ts":
/*!*************************************************************************!*\
  !*** ./src/app/pages/carriera/materiale-didattico/allegato/allegato.ts ***!
  \*************************************************************************/
/*! exports provided: AllegatoPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AllegatoPage", function() { return AllegatoPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_global_data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../services/global-data.service */ "./src/app/services/global-data.service.ts");
/* harmony import */ var _services_db_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../services/db-service */ "./src/app/services/db-service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AllegatoPage = /** @class */ (function () {
    function AllegatoPage(globalData, localdb) {
        this.globalData = globalData;
        this.localdb = localdb;
        this.currentPage = '/allegato';
    }
    AllegatoPage.prototype.ngOnInit = function () {
        this.allegato = this.globalData.allegato;
        if (this.allegato) {
            this.ad_id = this.allegato.AD_ID;
        }
        // Se non è presente l'id dell'attività didattica (nessun allegato)
        // Lo recuperiamo dai dati globali
        if (!this.ad_id) {
            this.ad_id = this.globalData.ad_id;
        }
    };
    AllegatoPage.prototype.onGoBack = function () {
        this.globalData.goTo(this.currentPage, '/materiale-didattico' + this.ad_id, 'backward', false);
    };
    AllegatoPage.prototype.formatStringDate = function (stringDate) {
        return stringDate;
        // if (this.allegato)
        //     return this.allegato.data;
        // else
        //     return this.providers.formatStringDate(stringDate);
    };
    AllegatoPage.prototype.pulisciAllegato = function (item) {
        if (item) {
            return item.replace(/\\r\\n|\\r|\\n/g, '<br>');
        }
        else {
            return '';
        }
    };
    AllegatoPage.prototype.download = function () {
        this.localdb.download(this.allegato);
    };
    AllegatoPage.prototype.apriFile = function () {
        this.localdb.apriFile(this.allegato);
    };
    AllegatoPage.prototype.eliminaFile = function () {
        this.localdb.eliminaFile(this.allegato);
    };
    AllegatoPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-allegato',
            template: __webpack_require__(/*! ./allegato.html */ "./src/app/pages/carriera/materiale-didattico/allegato/allegato.html")
        }),
        __metadata("design:paramtypes", [_services_global_data_service__WEBPACK_IMPORTED_MODULE_1__["GlobalDataService"],
            _services_db_service__WEBPACK_IMPORTED_MODULE_2__["DBService"]])
    ], AllegatoPage);
    return AllegatoPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-carriera-materiale-didattico-allegato-allegato-module.js.map