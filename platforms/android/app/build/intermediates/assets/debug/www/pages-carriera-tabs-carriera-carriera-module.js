(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-carriera-tabs-carriera-carriera-module"],{

/***/ "./src/app/pages/carriera/tabs-carriera/carriera-routing.module.ts":
/*!*************************************************************************!*\
  !*** ./src/app/pages/carriera/tabs-carriera/carriera-routing.module.ts ***!
  \*************************************************************************/
/*! exports provided: CarrieraPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarrieraPageRoutingModule", function() { return CarrieraPageRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _carriera_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./carriera.page */ "./src/app/pages/carriera/tabs-carriera/carriera.page.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: 'tab',
        component: _carriera_page__WEBPACK_IMPORTED_MODULE_2__["CarrieraPage"],
        children: [
            {
                path: 'libretto',
                children: [
                    {
                        path: '',
                        loadChildren: '../libretto/libretto.module#LibrettoPageModule'
                    }
                ]
            },
            {
                path: 'piano-di-studi',
                children: [
                    {
                        path: '',
                        loadChildren: '../piano-di-studi/piano-di-studi.module#PianoDiStudiPageModule'
                    }
                ]
            },
            {
                path: 'lista-esami',
                children: [
                    {
                        path: '',
                        loadChildren: '../lista-esami/lista-esami.module#ListaEsamiPageModule'
                    }
                ]
            }
        ]
    },
    {
        path: '',
        redirectTo: '/carriera/tab/piano-di-studi',
        pathMatch: 'full'
    }
];
var CarrieraPageRoutingModule = /** @class */ (function () {
    function CarrieraPageRoutingModule() {
    }
    CarrieraPageRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], CarrieraPageRoutingModule);
    return CarrieraPageRoutingModule;
}());



/***/ }),

/***/ "./src/app/pages/carriera/tabs-carriera/carriera.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/pages/carriera/tabs-carriera/carriera.module.ts ***!
  \*****************************************************************/
/*! exports provided: CarrieraPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarrieraPageModule", function() { return CarrieraPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _carriera_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./carriera.page */ "./src/app/pages/carriera/tabs-carriera/carriera.page.ts");
/* harmony import */ var _carriera_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./carriera-routing.module */ "./src/app/pages/carriera/tabs-carriera/carriera-routing.module.ts");
/* harmony import */ var _piano_di_studi_piano_di_studi_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../piano-di-studi/piano-di-studi.module */ "./src/app/pages/carriera/piano-di-studi/piano-di-studi.module.ts");
/* harmony import */ var _libretto_libretto_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../libretto/libretto.module */ "./src/app/pages/carriera/libretto/libretto.module.ts");
/* harmony import */ var _lista_esami_lista_esami_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lista-esami/lista-esami.module */ "./src/app/pages/carriera/lista-esami/lista-esami.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var CarrieraPageModule = /** @class */ (function () {
    function CarrieraPageModule() {
    }
    CarrieraPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"],
                _carriera_routing_module__WEBPACK_IMPORTED_MODULE_5__["CarrieraPageRoutingModule"],
                _piano_di_studi_piano_di_studi_module__WEBPACK_IMPORTED_MODULE_6__["PianoDiStudiPageModule"],
                _libretto_libretto_module__WEBPACK_IMPORTED_MODULE_7__["LibrettoPageModule"],
                _lista_esami_lista_esami_module__WEBPACK_IMPORTED_MODULE_8__["ListaEsamiPageModule"],
            ],
            declarations: [_carriera_page__WEBPACK_IMPORTED_MODULE_4__["CarrieraPage"]]
        })
    ], CarrieraPageModule);
    return CarrieraPageModule;
}());



/***/ }),

/***/ "./src/app/pages/carriera/tabs-carriera/carriera.page.html":
/*!*****************************************************************!*\
  !*** ./src/app/pages/carriera/tabs-carriera/carriera.page.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-tabs>\n\n   <!-- <ion-tab-bar slot=\"bottom\">\n\n        <ion-tab-button tab=\"piano-di-studi\">\n            <ion-icon name=\"school\"></ion-icon>\n            <ion-label>Piano di Studi</ion-label>\n        </ion-tab-button>\n\n        <ion-tab-button tab=\"libretto\">\n            <ion-icon name=\"list-box\"></ion-icon>\n            <ion-label>Libretto</ion-label>\n        </ion-tab-button>\n\n        <ion-tab-button tab=\"lista-esami\">\n            <ion-icon name=\"list\"></ion-icon>\n            <ion-label>Esami da sostenere</ion-label>\n        </ion-tab-button>\n\n   </ion-tab-bar> -->\n\n</ion-tabs>\n\n"

/***/ }),

/***/ "./src/app/pages/carriera/tabs-carriera/carriera.page.scss":
/*!*****************************************************************!*\
  !*** ./src/app/pages/carriera/tabs-carriera/carriera.page.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2NhcnJpZXJhL3RhYnMtY2FycmllcmEvY2FycmllcmEucGFnZS5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/pages/carriera/tabs-carriera/carriera.page.ts":
/*!***************************************************************!*\
  !*** ./src/app/pages/carriera/tabs-carriera/carriera.page.ts ***!
  \***************************************************************/
/*! exports provided: CarrieraPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarrieraPage", function() { return CarrieraPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var CarrieraPage = /** @class */ (function () {
    function CarrieraPage() {
    }
    CarrieraPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-carriera',
            template: __webpack_require__(/*! ./carriera.page.html */ "./src/app/pages/carriera/tabs-carriera/carriera.page.html"),
            styles: [__webpack_require__(/*! ./carriera.page.scss */ "./src/app/pages/carriera/tabs-carriera/carriera.page.scss")]
        })
    ], CarrieraPage);
    return CarrieraPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-carriera-tabs-carriera-carriera-module.js.map