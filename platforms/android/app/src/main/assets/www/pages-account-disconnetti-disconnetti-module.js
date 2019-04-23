(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-account-disconnetti-disconnetti-module"],{

/***/ "./src/app/pages/account/disconnetti/disconnetti.html":
/*!************************************************************!*\
  !*** ./src/app/pages/account/disconnetti/disconnetti.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-grid no-padding>\n    <ion-row *ngIf=\"!globalData.landscape && globalData.iPhoneX\">\n      <ion-col>\n        <ion-label> </ion-label>\n      </ion-col>\n    </ion-row>\n    <ion-row no-padding>\n      <ion-col no-padding>\n        <ion-toolbar>\n          <ion-buttons slot=\"start\">\n            <ion-menu-button></ion-menu-button>\n          </ion-buttons>\n          <ion-title>\n            Disconnessione\n          </ion-title>\n        </ion-toolbar>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-header>\n\n<ion-content padding>\n</ion-content>"

/***/ }),

/***/ "./src/app/pages/account/disconnetti/disconnetti.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/pages/account/disconnetti/disconnetti.module.ts ***!
  \*****************************************************************/
/*! exports provided: DisconnettiPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DisconnettiPageModule", function() { return DisconnettiPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _disconnetti__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./disconnetti */ "./src/app/pages/account/disconnetti/disconnetti.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var DisconnettiPageModule = /** @class */ (function () {
    function DisconnettiPageModule() {
    }
    DisconnettiPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _disconnetti__WEBPACK_IMPORTED_MODULE_5__["DisconnettiPage"]
                    }
                ])
            ],
            declarations: [_disconnetti__WEBPACK_IMPORTED_MODULE_5__["DisconnettiPage"]]
        })
    ], DisconnettiPageModule);
    return DisconnettiPageModule;
}());



/***/ }),

/***/ "./src/app/pages/account/disconnetti/disconnetti.ts":
/*!**********************************************************!*\
  !*** ./src/app/pages/account/disconnetti/disconnetti.ts ***!
  \**********************************************************/
/*! exports provided: DisconnettiPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DisconnettiPage", function() { return DisconnettiPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _services_sync_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/sync.service */ "./src/app/services/sync.service.ts");
/* harmony import */ var _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../services/global-data.service */ "./src/app/services/global-data.service.ts");
/* harmony import */ var _services_notifiche_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/notifiche.service */ "./src/app/services/notifiche.service.ts");
/* harmony import */ var _services_account_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/account.service */ "./src/app/services/account.service.ts");
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








var DisconnettiPage = /** @class */ (function () {
    function DisconnettiPage(sync, globalData, http, notificheService, account, loadingCtrl, alertCtrl, toastCtrl, storage) {
        this.sync = sync;
        this.globalData = globalData;
        this.http = http;
        this.notificheService = notificheService;
        this.account = account;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
    }
    DisconnettiPage.prototype.ngOnInit = function () {
        var _this = this;
        this.url = this.account.getUrlDisconnetti();
        this.storage.get('token').then(function (val) {
            _this.token = val;
            _this.alertCtrl.create({
                header: 'Log out',
                message: 'Sicuro di voler eliminare l\'account dal dispositivo?',
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
        });
    };
    DisconnettiPage.prototype.logout = function () {
        var _this = this;
        this.storage.get('tokenNotifiche').then(function (val) {
            // salviamo il tokenNotifiche e lo reinseriamo nel nuovo storage
            _this.tokenNotifiche = val;
            var body;
            body = {
                token: _this.token,
            };
            _this.loadingCtrl.create({
                message: 'Attendere...'
            }).then(function (loading) {
                loading.present();
                _this.http.post(_this.url, body).then(function (response) {
                    loading.dismiss();
                    if (response) {
                        _this.notificheService.rimuoviSottoscrizioni();
                        _this.storage.clear();
                        _this.storage.set('logged', false);
                        _this.storage.set('tokenNotifiche', _this.tokenNotifiche);
                        _this.globalData.goTo(_this.globalData.srcPage, '/login', 'root', false);
                        _this.toastCtrl.create({
                            message: response.toString(),
                            duration: 3000
                        }).then(function (toast) { toast.present(); }, function (errToast) { _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"].log(2, 'Errore Toast', errToast); });
                    }
                    else {
                        _this.globalData.goTo(_this.globalData.srcPage, '/home', 'root', false);
                    }
                }, function (reject) {
                    _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"].log(2, _this.url, reject);
                    loading.dismiss();
                    _this.presentConfirm();
                });
            });
        });
    };
    DisconnettiPage.prototype.continua = function () {
        this.storage.set('logged', true);
        if (this.globalData.srcPage) {
            this.globalData.goTo(this.globalData.srcPage, this.globalData.srcPage, 'root', false);
        }
        else {
            this.globalData.goTo('/home', '/home', 'root', false);
        }
    };
    DisconnettiPage.prototype.presentConfirm = function () {
        var _this = this;
        this.alertCtrl.create({
            header: 'Errore',
            subHeader: 'Server non raggiungibile',
            message: 'Il server non risponde. Per poter cancellare la registrazione di questo dispoditivo devi essere connesso ' +
                'ad Internet. Se procedi, i dati sul tuo dispositivo saranno rimossi, ma i dati sul server non potranno essere cancellati. ' +
                'Sei sicuro di voler procedere?',
            buttons: [
                {
                    text: 'Disconnetti',
                    role: 'cancel',
                    handler: function () {
                        _this.storage.clear();
                        _this.storage.set('tokenNotifiche', _this.tokenNotifiche);
                        _this.notificheService.rimuoviSottoscrizioni().then(function () {
                            _this.globalData.goTo('/login', '/login', 'root', false);
                        });
                    }
                },
                {
                    text: 'Annulla',
                    handler: function () {
                        _this.globalData.goTo('/home', '/home', 'root', false);
                    }
                }
            ]
        }).then(function (alert) { return alert.present(); });
    };
    DisconnettiPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-disconnetti',
            template: __webpack_require__(/*! ./disconnetti.html */ "./src/app/pages/account/disconnetti/disconnetti.html"),
        }),
        __metadata("design:paramtypes", [_services_sync_service__WEBPACK_IMPORTED_MODULE_3__["SyncService"],
            _services_global_data_service__WEBPACK_IMPORTED_MODULE_4__["GlobalDataService"],
            _services_http_service__WEBPACK_IMPORTED_MODULE_7__["HttpService"],
            _services_notifiche_service__WEBPACK_IMPORTED_MODULE_5__["NotificheService"],
            _services_account_service__WEBPACK_IMPORTED_MODULE_6__["AccountService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ToastController"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"]])
    ], DisconnettiPage);
    return DisconnettiPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-account-disconnetti-disconnetti-module.js.map