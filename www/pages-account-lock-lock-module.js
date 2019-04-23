(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-account-lock-lock-module"],{

/***/ "./src/app/pages/account/lock/lock.html":
/*!**********************************************!*\
  !*** ./src/app/pages/account/lock/lock.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-grid no-padding>\n    <ion-row *ngIf=\"!globalData.landscape && globalData.iPhoneX\">\n      <ion-col>\n        <ion-label> </ion-label>\n      </ion-col>\n    </ion-row>\n    <ion-row no-padding>\n      <ion-col no-padding>\n        <ion-toolbar>\n          <ion-buttons slot=\"start\">\n            <ion-menu-button></ion-menu-button>\n          </ion-buttons>\n          <ion-title>\n            Lock\n          </ion-title>\n        </ion-toolbar>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-header>\n\n<ion-content padding>\n\n  <!--\n    <ion-grid>\n      <ion-row>\n        <ion-col text-center>\n          <ion-title>Sicuro di voler bloccare il dispositivo?</ion-title>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col text-center>\n          <ion-button icon-left color=\"light\" (click)=\"logout()\">\n            <ion-icon name=\"log-out\" color=\"primary\"></ion-icon>\n            Si\n          </ion-button>\n        </ion-col>\n        <ion-col text-center>\n          <ion-button expand=\"block\" fill=\"clear\" icon-left color=\"secondary\" (click)=\"continua()\">\n            <ion-icon name=\"back\"></ion-icon>\n            No\n          </ion-button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n-->\n</ion-content>"

/***/ }),

/***/ "./src/app/pages/account/lock/lock.module.ts":
/*!***************************************************!*\
  !*** ./src/app/pages/account/lock/lock.module.ts ***!
  \***************************************************/
/*! exports provided: LockPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LockPageModule", function() { return LockPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _lock__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lock */ "./src/app/pages/account/lock/lock.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var LockPageModule = /** @class */ (function () {
    function LockPageModule() {
    }
    LockPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _lock__WEBPACK_IMPORTED_MODULE_5__["LockPage"]
                    }
                ])
            ],
            declarations: [_lock__WEBPACK_IMPORTED_MODULE_5__["LockPage"]]
        })
    ], LockPageModule);
    return LockPageModule;
}());



/***/ }),

/***/ "./src/app/pages/account/lock/lock.ts":
/*!********************************************!*\
  !*** ./src/app/pages/account/lock/lock.ts ***!
  \********************************************/
/*! exports provided: LockPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LockPage", function() { return LockPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _services_global_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/global-data.service */ "./src/app/services/global-data.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LockPage = /** @class */ (function () {
    // token: string;
    function LockPage(alertCtrl, storage, globalData) {
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.globalData = globalData;
    }
    LockPage.prototype.ngOnInit = function () {
        // this.url = this.syn.getUrlDisconnetti();
        //
        // this.storage.get('token').then(
        //     (val) => {
        //         this.token = val;
        //         this.logout();
        //     },
        //     () => {
        //         this.logout();
        //     });
        var _this = this;
        this.alertCtrl.create({
            header: 'Log out',
            message: 'Sicuro di voler bloccare il dispositivo?',
            buttons: [
                {
                    text: 'Si',
                    role: 'cancel',
                    handler: function () {
                        _this.logout();
                    }
                },
                {
                    text: 'No',
                    handler: function () {
                        _this.continua();
                    }
                }
            ]
        }).then(function (confirm) { return confirm.present(); });
    };
    LockPage.prototype.logout = function () {
        // console.log('Torniamo al Login');
        this.storage.set('logged', false);
        this.globalData.goTo(this.globalData.srcPage, '/login', 'root', false);
    };
    LockPage.prototype.continua = function () {
        this.storage.set('logged', true);
        if (this.globalData.srcPage) {
            this.globalData.goTo(this.globalData.srcPage, this.globalData.srcPage, 'root', false);
        }
        else {
            this.globalData.goTo('/home', '/home', 'root', false);
        }
    };
    LockPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-lock',
            template: __webpack_require__(/*! ./lock.html */ "./src/app/pages/account/lock/lock.html")
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["AlertController"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"],
            _services_global_data_service__WEBPACK_IMPORTED_MODULE_3__["GlobalDataService"]])
    ], LockPage);
    return LockPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-account-lock-lock-module.js.map