(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-account-login-login-module"],{

/***/ "./src/app/pages/account/login/login.html":
/*!************************************************!*\
  !*** ./src/app/pages/account/login/login.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-grid no-padding>\n    <ion-row *ngIf=\"!globalData.landscape && globalData.iPhoneX\">\n      <ion-col>\n        <ion-label> </ion-label>\n      </ion-col>\n    </ion-row>\n    <ion-row no-padding>\n      <ion-col no-padding>\n        <ion-toolbar>\n          <ion-buttons slot=\"start\">\n            <ion-menu-button></ion-menu-button>\n          </ion-buttons>\n          <ion-title>\n            Studenti Unimol\n          </ion-title>\n        </ion-toolbar>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-header>\n\n<ion-content>\n  <ion-grid>\n    <ion-row justify-content-center>\n      <ion-col text-center>\n        <img class=\"logo\" src=\"assets/img/logo_unimol.png\" />\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <form #f=\"ngForm\" (ngSubmit)=\"login()\">\n          <ion-list padding>\n            <ion-item *ngIf=\"matricola\">\n              <ion-label>Matricola: {{matricola}}</ion-label>\n            </ion-item>\n            <ion-item>\n              <ion-label floating>Username</ion-label>\n              <ion-input type=\"text\" [autocomplete]=\"username\" [(ngModel)]=\"username\" name=\"username\" required></ion-input>\n            </ion-item>\n            <ion-item>\n              <ion-label floating>Password</ion-label>\n              <ion-input type=\"password\" [autocomplete]=\"password\" [(ngModel)]=\"password\"  name=\"password\" value=\"\" required></ion-input>\n            </ion-item>\n            <br />\n            <div *ngIf=\"!fingerprintIsAvbailable\">\n              <ion-button expand=\"block\" (click)=\"login()\" [disabled]=\"!f.valid\">Login</ion-button>\n            </div>\n            <div *ngIf=\"fingerprintIsAvbailable\">\n              <ion-grid>\n                <ion-row>\n                  <ion-col size=\"10\" text-center>\n                    <ion-button expand=\"block\" (click)=\"login()\" [disabled]=\"!f.valid\">Login</ion-button>\n                  </ion-col>\n                  <ion-col size=\"2\" text-center>\n                    <ion-button color=\"light\" icon-only (click)='showFingerprintDialog()'>\n                      <ion-icon name='finger-print' ></ion-icon>\n                    </ion-button>\n                  </ion-col>\n                </ion-row>\n              </ion-grid>\n            </div>\n          </ion-list>\n        </form>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n</ion-content>\n\n<ion-footer  no-padding>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <fa-icon [hidden]=\"!http.getConnected()\" [icon]=\"globalData.faLink\"></fa-icon>\n      <fa-icon [hidden]=\"http.getConnected()\"  [icon]=\"globalData.faUnlink\"></fa-icon>\n    </ion-buttons>\n\n    <div class=\"testo-footer\">\n      ver. {{appVersionNum? appVersionNum: '2.0.w'}}\n    </div>\n\n    <ion-buttons slot=\"end\" no-padding>\n      <ion-icon slot=\"icon-only\" src=\"assets/icon/blank.png\"></ion-icon>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-footer>"

/***/ }),

/***/ "./src/app/pages/account/login/login.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/pages/account/login/login.module.ts ***!
  \*****************************************************/
/*! exports provided: LoginPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login */ "./src/app/pages/account/login/login.ts");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var LoginPageModule = /** @class */ (function () {
    function LoginPageModule() {
    }
    LoginPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"],
                _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _login__WEBPACK_IMPORTED_MODULE_5__["LoginPage"]
                    }
                ])
            ],
            declarations: [_login__WEBPACK_IMPORTED_MODULE_5__["LoginPage"]]
        })
    ], LoginPageModule);
    return LoginPageModule;
}());



/***/ }),

/***/ "./src/app/pages/account/login/login.ts":
/*!**********************************************!*\
  !*** ./src/app/pages/account/login/login.ts ***!
  \**********************************************/
/*! exports provided: LoginPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPage", function() { return LoginPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/storage */ "./node_modules/@ionic/storage/fesm5/ionic-storage.js");
/* harmony import */ var _ionic_native_fingerprint_aio_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/fingerprint-aio/ngx */ "./node_modules/@ionic-native/fingerprint-aio/ngx/index.js");
/* harmony import */ var _ionic_native_app_version_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/app-version/ngx */ "./node_modules/@ionic-native/app-version/ngx/index.js");
/* harmony import */ var rxjs_internal_util_isArray__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/internal/util/isArray */ "./node_modules/rxjs/internal/util/isArray.js");
/* harmony import */ var rxjs_internal_util_isArray__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(rxjs_internal_util_isArray__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _services_sync_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/sync.service */ "./src/app/services/sync.service.ts");
/* harmony import */ var _services_global_data_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../services/global-data.service */ "./src/app/services/global-data.service.ts");
/* harmony import */ var _services_account_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../services/account.service */ "./src/app/services/account.service.ts");
/* harmony import */ var _services_http_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../services/http.service */ "./src/app/services/http.service.ts");
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










var LoginPage = /** @class */ (function () {
    function LoginPage(platform, appVersionProvider, fingerprint, sync, http, globalData, loadingCtrl, toastCtrl, 
    // public menu: MenuController,
    storage, account) {
        this.platform = platform;
        this.appVersionProvider = appVersionProvider;
        this.fingerprint = fingerprint;
        this.sync = sync;
        this.http = http;
        this.globalData = globalData;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.account = account;
        this.currentPage = '/login';
        this.username = '';
        this.password = '';
        this.matricola = '';
        this.cds_id = '';
        this.dip_id = '';
        this.appVersionNum = '';
        this.fingerprintIsAvbailable = false;
        this.fingerprintResult = '';
    }
    LoginPage.prototype.ngOnInit = function () {
        var _this = this;
        // Prende la versione dell'app settata nel file config.xml
        this.appVersionProvider.getVersionNumber().then(function (value) {
            _this.appVersionNum = value;
        });
        this.account.controllaAccount().then(function (ok) {
        }, function (err) {
            _this.globalData.goTo(_this.currentPage, '/login', 'root', false);
        });
    };
    LoginPage.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.storage.get('username').then(function (user) {
            if ((user != null) && (user !== '') &&
                (_this.platform.is('ios') || (_this.platform.is('android')))) {
                _this.fingerprint.isAvailable().then(function (datiFP) {
                    console.dir(datiFP);
                    var available = datiFP;
                    if (available === 'OK' || available === 'finger') {
                        available = 'Available';
                    }
                    if (available === 'Available') {
                        _this.fingerprintIsAvbailable = true;
                        _this.fingerprintOptions = {
                            clientId: 'Studenti Unimol',
                            clientSecret: 'password',
                            localizedFallbackTitle: 'Studenti Unimol',
                            localizedReason: 'Accedi all\'App tramite impronta digitale',
                        };
                    }
                    else {
                        _this.fingerprintIsAvbailable = false;
                    }
                }, function (err) {
                    console.dir(err);
                });
            }
        });
        // this.menu.enable(false);
        this.storage.get('username').then(function (data) {
            _this.username = data;
        });
    };
    LoginPage.prototype.ngOnDestroy = function () {
        // this.menu.enable(true);
    };
    LoginPage.prototype.showFingerprintDialog = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, storedNome, storedSesso, err_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        if (!this.fingerprintIsAvbailable) return [3 /*break*/, 2];
                        // this.fingerprintOptions = {
                        //   clientId: 'Studenti Unimol',
                        //   clientSecret: 'password',
                        //   localizedFallbackTitle: 'Studenti Unimol',
                        //   localizedReason: 'Accedi all\'App tramite impronta digitale',
                        //   //disableBackup: true,
                        // };
                        _a = this;
                        return [4 /*yield*/, this.fingerprint.show(this.fingerprintOptions)];
                    case 1:
                        // this.fingerprintOptions = {
                        //   clientId: 'Studenti Unimol',
                        //   clientSecret: 'password',
                        //   localizedFallbackTitle: 'Studenti Unimol',
                        //   localizedReason: 'Accedi all\'App tramite impronta digitale',
                        //   //disableBackup: true,
                        // };
                        _a.fingerprintResult = _b.sent();
                        // Uniformiamo la risposta (Android -> Object, iOS -> 'Available');
                        if ((this.fingerprintResult['withPassword']) ||
                            (this.fingerprintResult['withFingerprint']) ||
                            (this.fingerprintResult['withBackup'])) {
                            this.fingerprintResult = 'Success';
                        }
                        // Utente autenticato con lettore di impronte
                        if (this.fingerprintResult === 'Success') {
                            storedNome = this.storage.get('nome');
                            storedSesso = this.storage.get('sesso');
                            Promise.all([storedNome, storedSesso]).then(function (data) {
                                // this.ngZone.run(() => {
                                var messaggio;
                                if (data[1] === 'F') {
                                    messaggio = 'Bentornata ' + data[0];
                                }
                                else {
                                    messaggio = 'Bentornato ' + data[0];
                                }
                                _this.toastCtrl.create({
                                    message: messaggio,
                                    duration: 3000
                                }).then(function (toast) { return toast.present(); }, function (errToast) { _services_global_data_service__WEBPACK_IMPORTED_MODULE_7__["GlobalDataService"].log(2, 'Errore Toast', errToast); });
                                _this.storage.set('logged', true).then(function () {
                                    _this.globalData.goTo(_this.currentPage, '/home', 'root', false);
                                }, function (errStorage) {
                                    _services_global_data_service__WEBPACK_IMPORTED_MODULE_7__["GlobalDataService"].log(2, 'Errore nella scrittura dei dati sullo storage!', errStorage);
                                });
                            });
                            // });
                        }
                        _b.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        _services_global_data_service__WEBPACK_IMPORTED_MODULE_7__["GlobalDataService"].log(2, 'Errore in showFingerprintDialog!', err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.loadingCtrl.create().then(function (loading) {
            loading.present();
            // let username = form.value.username.toLowerCase();
            // let password = form.value.password;
            var username = _this.username;
            var password = _this.password;
            var matricola = _this.matricola;
            var cds_id = _this.cds_id;
            var dip_id = _this.dip_id;
            _this.account.login(username, password, matricola, cds_id, dip_id).then(function (risultato) {
                // console.dir(risultato);
                loading.dismiss().then(function () {
                    if (Object(rxjs_internal_util_isArray__WEBPACK_IMPORTED_MODULE_5__["isArray"])(risultato)) {
                        _this.globalData.utente_test = _this.username === 'test';
                        _this.globalData.username = _this.username;
                        _this.globalData.password = _this.password;
                        _this.globalData.carriere = risultato;
                        _this.globalData.goTo(_this.currentPage, '/carriere', 'root', false);
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
                                break;
                            }
                        }
                    }
                });
            }, function (err) {
                console.log('errore login');
                loading.dismiss();
                _services_global_data_service__WEBPACK_IMPORTED_MODULE_7__["GlobalDataService"].log(2, 'Login Reject', err);
            }).catch(function (ex) {
                loading.dismiss();
                _services_global_data_service__WEBPACK_IMPORTED_MODULE_7__["GlobalDataService"].log(2, 'Login Exception', ex);
            });
        });
    };
    LoginPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-login',
            template: __webpack_require__(/*! ./login.html */ "./src/app/pages/account/login/login.html"),
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["Platform"],
            _ionic_native_app_version_ngx__WEBPACK_IMPORTED_MODULE_4__["AppVersion"],
            _ionic_native_fingerprint_aio_ngx__WEBPACK_IMPORTED_MODULE_3__["FingerprintAIO"],
            _services_sync_service__WEBPACK_IMPORTED_MODULE_6__["SyncService"],
            _services_http_service__WEBPACK_IMPORTED_MODULE_9__["HttpService"],
            _services_global_data_service__WEBPACK_IMPORTED_MODULE_7__["GlobalDataService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["LoadingController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ToastController"],
            _ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"],
            _services_account_service__WEBPACK_IMPORTED_MODULE_8__["AccountService"]])
    ], LoginPage);
    return LoginPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-account-login-login-module.js.map