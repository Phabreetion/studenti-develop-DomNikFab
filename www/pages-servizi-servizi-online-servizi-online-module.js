(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-servizi-servizi-online-servizi-online-module"],{

/***/ "./src/app/pages/servizi/servizi-online/servizi-online.html":
/*!******************************************************************!*\
  !*** ./src/app/pages/servizi/servizi-online/servizi-online.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n    <ion-grid no-padding>\n        <ion-row *ngIf=\"!globalData.landscape && globalData.iPhoneX\">\n            <ion-col>\n                <ion-label> </ion-label>\n            </ion-col>\n        </ion-row>\n        <ion-row no-padding>\n            <ion-col no-padding>\n                <ion-toolbar>\n                    <ion-buttons slot=\"start\">\n                        <ion-menu-button></ion-menu-button>\n                    </ion-buttons>\n                    <ion-title>\n                        Servizi\n                    </ion-title>\n                </ion-toolbar>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-header>\n\n<ion-content no-padding>\n\n    <ion-list>\n\n        <ion-item (click)=\"apriLinkBrowser('http://www.unimol.it/')\">\n            <ion-thumbnail item-start>\n                <img src=\"assets/img/unimol.png\" />\n            </ion-thumbnail>\n            <ion-grid fixed>\n                <ion-row>\n                    <ion-col>\n                        <ion-text color=\"primary\"><strong>Portale web di Ateneo</strong></ion-text>\n                    </ion-col>\n                </ion-row>\n                <ion-row>\n                    <ion-col>Accedi al sito web dell'Unimol</ion-col>\n                </ion-row>\n            </ion-grid>\n        </ion-item>\n\n        <ion-item (click)=\"apriLinkTrasporti()\">\n            <ion-thumbnail item-start>\n                <img src=\"assets/img/bus.png\" />\n            </ion-thumbnail>\n            <ion-grid fixed>\n                <ion-row>\n                    <ion-col>\n                        <ion-text color=\"primary\"><strong>Trasporti</strong></ion-text>\n                    </ion-col>\n                </ion-row>\n                <ion-row>\n                    <ion-col>Visualizza lo stato delle tue richieste</ion-col>\n                </ion-row>\n            </ion-grid>\n        </ion-item>\n\n        <ion-item (click)=\"apriLinkBrowser('https://login.microsoftonline.com/login.srf?wa=wsignin1.0&rpsnv=4&ct=1445498283&rver=6.6.6556.0&wp=MBI_SSL&wreply=https%3a%2f%2foutlook.office365.com%2fowa%2f%3fauthRedirect%3dtrue&id=260563&CBCXT=out&msafed=0')\">\n            <ion-thumbnail item-start>\n                <img src=\"assets/img/email.png\" />\n            </ion-thumbnail>\n            <ion-grid fixed>\n                <ion-row>\n                    <ion-col>\n                        <ion-text color=\"primary\"><strong>E-mail Unimol</strong></ion-text>\n                    </ion-col>\n                </ion-row>\n                <ion-row>\n                    <ion-col>Accedi alla tua casella di posta elettronica istituzionale</ion-col>\n                </ion-row>\n            </ion-grid>\n        </ion-item>\n\n        <ion-item (click)=\"apriLinkBrowser('https://unimol.esse3.cineca.it/Home.do')\">\n            <ion-thumbnail item-start>\n                <img src=\"assets/img/esse3.png\" />\n            </ion-thumbnail>\n            <ion-grid fixed>\n                <ion-row>\n                    <ion-col>\n                        <ion-text color=\"primary\"><strong>Portale dello Studente</strong></ion-text>\n                    </ion-col>\n                </ion-row>\n                <ion-row>\n                    <ion-col>Accedi al portale dello Studente</ion-col>\n                </ion-row>\n            </ion-grid>\n        </ion-item>\n\n        <!-- <ion-item (click)=\"apriLinkBrowser('http://docenti.unimol.it/')\"> -->\n        <ion-item (click)=\"apriLinkBrowser('http://docenti.unimol.it/')\">\n            <ion-thumbnail item-start>\n                <img src=\"assets/img/docente.png\" />\n            </ion-thumbnail>\n            <ion-grid fixed>\n                <ion-row>\n                    <ion-col>\n                        <ion-text color=\"primary\"><strong>Docenti</strong></ion-text>\n                    </ion-col>\n                </ion-row>\n                <ion-row>\n                    <ion-col>Accedi alla Pagina Docenti sul sito Unimol</ion-col>\n                </ion-row>\n            </ion-grid>\n        </ion-item>\n\n        <ion-item (click)=\"apriLinkBrowser('http://opac.regione.molise.it/SebinaOpac/Opac?sysb=MOLBU')\">\n            <ion-thumbnail item-start>\n                <img src=\"assets/img/biblioteca.png\" />\n            </ion-thumbnail>\n            <ion-grid fixed>\n                <ion-row>\n                    <ion-col>\n                        <ion-text color=\"primary\"><strong>Biblioteca</strong></ion-text>\n                    </ion-col>\n                </ion-row>\n                <ion-row>\n                    <ion-col>Accedi alla Pagina per la ricerca di libri sul catalogo online</ion-col>\n                </ion-row>\n            </ion-grid>\n        </ion-item>\n\n    </ion-list>\n\n</ion-content>\n\n<ion-toolbar>\n    <ion-buttons slot=\"start\">\n        <fa-icon [hidden]=\"!http.getConnected()\" [icon]=\"globalData.faLink\"></fa-icon>\n        <fa-icon [hidden]=\"http.getConnected()\"  [icon]=\"globalData.faUnlink\"></fa-icon>\n    </ion-buttons>\n\n    <div class=\"testo-footer\">\n    </div>\n\n    <ion-buttons slot=\"end\" no-padding>\n        <ion-icon slot=\"icon-only\" src=\"assets/icon/blank.png\"></ion-icon>\n    </ion-buttons>\n</ion-toolbar>"

/***/ }),

/***/ "./src/app/pages/servizi/servizi-online/servizi-online.module.ts":
/*!***********************************************************************!*\
  !*** ./src/app/pages/servizi/servizi-online/servizi-online.module.ts ***!
  \***********************************************************************/
/*! exports provided: ServiziOnlinePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiziOnlinePageModule", function() { return ServiziOnlinePageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _servizi_online__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./servizi-online */ "./src/app/pages/servizi/servizi-online/servizi-online.ts");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var ServiziOnlinePageModule = /** @class */ (function () {
    function ServiziOnlinePageModule() {
    }
    ServiziOnlinePageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"],
                _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _servizi_online__WEBPACK_IMPORTED_MODULE_5__["ServiziOnlinPage"]
                    }
                ])
            ],
            declarations: [_servizi_online__WEBPACK_IMPORTED_MODULE_5__["ServiziOnlinPage"]]
        })
    ], ServiziOnlinePageModule);
    return ServiziOnlinePageModule;
}());



/***/ }),

/***/ "./src/app/pages/servizi/servizi-online/servizi-online.ts":
/*!****************************************************************!*\
  !*** ./src/app/pages/servizi/servizi-online/servizi-online.ts ***!
  \****************************************************************/
/*! exports provided: ServiziOnlinPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiziOnlinPage", function() { return ServiziOnlinPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/in-app-browser/ngx */ "./node_modules/@ionic-native/in-app-browser/ngx/index.js");
/* harmony import */ var _services_sync_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/sync.service */ "./src/app/services/sync.service.ts");
/* harmony import */ var _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/global-data.service */ "./src/app/services/global-data.service.ts");
/* harmony import */ var _services_account_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/account.service */ "./src/app/services/account.service.ts");
/* harmony import */ var _services_esse3_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/esse3.service */ "./src/app/services/esse3.service.ts");
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








var ServiziOnlinPage = /** @class */ (function () {
    function ServiziOnlinPage(sync, http, loadingCtrl, inAppBrowser, globalData, esse3, account) {
        this.sync = sync;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.inAppBrowser = inAppBrowser;
        this.globalData = globalData;
        this.esse3 = esse3;
        this.account = account;
        this.currentPage = '/servizi-online';
        this.options = {
            location: 'yes',
            hidden: 'no',
            clearcache: 'yes',
            clearsessioncache: 'yes',
            zoom: 'yes',
            hardwareback: 'yes',
            mediaPlaybackRequiresUserAction: 'no',
            shouldPauseOnSuspend: 'no',
            closebuttoncaption: 'Close',
            disallowoverscroll: 'no',
            toolbar: 'yes',
            enableViewportScale: 'no',
            allowInlineMediaPlayback: 'no',
            presentationstyle: 'pagesheet',
            fullscreen: 'yes',
        };
    }
    ServiziOnlinPage.prototype.ngOnInit = function () {
        var _this = this;
        this.globalData.srcPage = this.currentPage;
        this.account.controllaAccount().then(function (ok) {
            _this.http.getConnected();
        }, function (err) {
            _this.globalData.goTo(_this.currentPage, '/login', 'root', false);
        });
    };
    ServiziOnlinPage.prototype.apriLinkTrasporti = function () {
        var _this = this;
        this.loadingCtrl.create().then(function (loading) {
            loading.present();
            _this.esse3.queryStringTrasporti().then(function (query) {
                var urlTrasporti = 'http://trasporti.unimol.it/home.php' + query;
                loading.dismiss();
                _this.apriLinkBrowser(urlTrasporti);
            }, function (err) {
                console.log(err);
                loading.dismiss();
            });
        });
    };
    ServiziOnlinPage.prototype.apriLinkBrowser = function (url) {
        var target = '_system';
        this.browser = this.inAppBrowser.create(url, target, this.options);
    };
    ServiziOnlinPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-servizi-online',
            template: __webpack_require__(/*! ./servizi-online.html */ "./src/app/pages/servizi/servizi-online/servizi-online.html"),
        }),
        __metadata("design:paramtypes", [_services_sync_service__WEBPACK_IMPORTED_MODULE_3__["SyncService"],
            _services_http_service__WEBPACK_IMPORTED_MODULE_7__["HttpService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["LoadingController"],
            _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_2__["InAppBrowser"],
            _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"],
            _services_esse3_service__WEBPACK_IMPORTED_MODULE_6__["Esse3Service"],
            _services_account_service__WEBPACK_IMPORTED_MODULE_5__["AccountService"]])
    ], ServiziOnlinPage);
    return ServiziOnlinPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-servizi-servizi-online-servizi-online-module.js.map