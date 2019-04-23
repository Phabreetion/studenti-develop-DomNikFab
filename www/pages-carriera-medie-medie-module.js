(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-carriera-medie-medie-module"],{

/***/ "./node_modules/rxjs-compat/_esm5/util/isNumeric.js":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs-compat/_esm5/util/isNumeric.js ***!
  \**********************************************************/
/*! exports provided: isNumeric */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/internal-compatibility */ "./node_modules/rxjs/_esm5/internal-compatibility/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isNumeric", function() { return rxjs_internal_compatibility__WEBPACK_IMPORTED_MODULE_0__["isNumeric"]; });


//# sourceMappingURL=isNumeric.js.map

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal-compatibility/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal-compatibility/index.js ***!
  \*****************************************************************/
/*! exports provided: config, InnerSubscriber, OuterSubscriber, Scheduler, AnonymousSubject, SubjectSubscription, Subscriber, fromPromise, fromIterable, ajax, webSocket, ajaxGet, ajaxPost, ajaxDelete, ajaxPut, ajaxPatch, ajaxGetJSON, AjaxObservable, AjaxSubscriber, AjaxResponse, AjaxError, AjaxTimeoutError, WebSocketSubject, CombineLatestOperator, dispatch, SubscribeOnObservable, Timestamp, TimeInterval, GroupedObservable, defaultThrottleConfig, rxSubscriber, iterator, observable, ArgumentOutOfRangeError, EmptyError, Immediate, ObjectUnsubscribedError, TimeoutError, UnsubscriptionError, applyMixins, errorObject, hostReportError, identity, isArray, isArrayLike, isDate, isFunction, isIterable, isNumeric, isObject, isObservable, isPromise, isScheduler, noop, not, pipe, root, subscribeTo, subscribeToArray, subscribeToIterable, subscribeToObservable, subscribeToPromise, subscribeToResult, toSubscriber, tryCatch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/config */ "./node_modules/rxjs/_esm5/internal/config.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "config", function() { return _internal_config__WEBPACK_IMPORTED_MODULE_0__["config"]; });

/* harmony import */ var _internal_InnerSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../internal/InnerSubscriber */ "./node_modules/rxjs/_esm5/internal/InnerSubscriber.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InnerSubscriber", function() { return _internal_InnerSubscriber__WEBPACK_IMPORTED_MODULE_1__["InnerSubscriber"]; });

/* harmony import */ var _internal_OuterSubscriber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../internal/OuterSubscriber */ "./node_modules/rxjs/_esm5/internal/OuterSubscriber.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OuterSubscriber", function() { return _internal_OuterSubscriber__WEBPACK_IMPORTED_MODULE_2__["OuterSubscriber"]; });

/* harmony import */ var _internal_Scheduler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../internal/Scheduler */ "./node_modules/rxjs/_esm5/internal/Scheduler.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Scheduler", function() { return _internal_Scheduler__WEBPACK_IMPORTED_MODULE_3__["Scheduler"]; });

/* harmony import */ var _internal_Subject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../internal/Subject */ "./node_modules/rxjs/_esm5/internal/Subject.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnonymousSubject", function() { return _internal_Subject__WEBPACK_IMPORTED_MODULE_4__["AnonymousSubject"]; });

/* harmony import */ var _internal_SubjectSubscription__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../internal/SubjectSubscription */ "./node_modules/rxjs/_esm5/internal/SubjectSubscription.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SubjectSubscription", function() { return _internal_SubjectSubscription__WEBPACK_IMPORTED_MODULE_5__["SubjectSubscription"]; });

/* harmony import */ var _internal_Subscriber__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../internal/Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Subscriber", function() { return _internal_Subscriber__WEBPACK_IMPORTED_MODULE_6__["Subscriber"]; });

/* harmony import */ var _internal_observable_fromPromise__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../internal/observable/fromPromise */ "./node_modules/rxjs/_esm5/internal/observable/fromPromise.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fromPromise", function() { return _internal_observable_fromPromise__WEBPACK_IMPORTED_MODULE_7__["fromPromise"]; });

/* harmony import */ var _internal_observable_fromIterable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../internal/observable/fromIterable */ "./node_modules/rxjs/_esm5/internal/observable/fromIterable.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fromIterable", function() { return _internal_observable_fromIterable__WEBPACK_IMPORTED_MODULE_8__["fromIterable"]; });

/* harmony import */ var _internal_observable_dom_ajax__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../internal/observable/dom/ajax */ "./node_modules/rxjs/_esm5/internal/observable/dom/ajax.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ajax", function() { return _internal_observable_dom_ajax__WEBPACK_IMPORTED_MODULE_9__["ajax"]; });

/* harmony import */ var _internal_observable_dom_webSocket__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../internal/observable/dom/webSocket */ "./node_modules/rxjs/_esm5/internal/observable/dom/webSocket.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "webSocket", function() { return _internal_observable_dom_webSocket__WEBPACK_IMPORTED_MODULE_10__["webSocket"]; });

/* harmony import */ var _internal_observable_dom_AjaxObservable__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../internal/observable/dom/AjaxObservable */ "./node_modules/rxjs/_esm5/internal/observable/dom/AjaxObservable.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ajaxGet", function() { return _internal_observable_dom_AjaxObservable__WEBPACK_IMPORTED_MODULE_11__["ajaxGet"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ajaxPost", function() { return _internal_observable_dom_AjaxObservable__WEBPACK_IMPORTED_MODULE_11__["ajaxPost"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ajaxDelete", function() { return _internal_observable_dom_AjaxObservable__WEBPACK_IMPORTED_MODULE_11__["ajaxDelete"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ajaxPut", function() { return _internal_observable_dom_AjaxObservable__WEBPACK_IMPORTED_MODULE_11__["ajaxPut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ajaxPatch", function() { return _internal_observable_dom_AjaxObservable__WEBPACK_IMPORTED_MODULE_11__["ajaxPatch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ajaxGetJSON", function() { return _internal_observable_dom_AjaxObservable__WEBPACK_IMPORTED_MODULE_11__["ajaxGetJSON"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AjaxObservable", function() { return _internal_observable_dom_AjaxObservable__WEBPACK_IMPORTED_MODULE_11__["AjaxObservable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AjaxSubscriber", function() { return _internal_observable_dom_AjaxObservable__WEBPACK_IMPORTED_MODULE_11__["AjaxSubscriber"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AjaxResponse", function() { return _internal_observable_dom_AjaxObservable__WEBPACK_IMPORTED_MODULE_11__["AjaxResponse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AjaxError", function() { return _internal_observable_dom_AjaxObservable__WEBPACK_IMPORTED_MODULE_11__["AjaxError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AjaxTimeoutError", function() { return _internal_observable_dom_AjaxObservable__WEBPACK_IMPORTED_MODULE_11__["AjaxTimeoutError"]; });

/* harmony import */ var _internal_observable_dom_WebSocketSubject__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../internal/observable/dom/WebSocketSubject */ "./node_modules/rxjs/_esm5/internal/observable/dom/WebSocketSubject.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebSocketSubject", function() { return _internal_observable_dom_WebSocketSubject__WEBPACK_IMPORTED_MODULE_12__["WebSocketSubject"]; });

/* harmony import */ var _internal_observable_combineLatest__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../internal/observable/combineLatest */ "./node_modules/rxjs/_esm5/internal/observable/combineLatest.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CombineLatestOperator", function() { return _internal_observable_combineLatest__WEBPACK_IMPORTED_MODULE_13__["CombineLatestOperator"]; });

/* harmony import */ var _internal_observable_range__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../internal/observable/range */ "./node_modules/rxjs/_esm5/internal/observable/range.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dispatch", function() { return _internal_observable_range__WEBPACK_IMPORTED_MODULE_14__["dispatch"]; });

/* harmony import */ var _internal_observable_SubscribeOnObservable__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../internal/observable/SubscribeOnObservable */ "./node_modules/rxjs/_esm5/internal/observable/SubscribeOnObservable.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SubscribeOnObservable", function() { return _internal_observable_SubscribeOnObservable__WEBPACK_IMPORTED_MODULE_15__["SubscribeOnObservable"]; });

/* harmony import */ var _internal_operators_timestamp__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../internal/operators/timestamp */ "./node_modules/rxjs/_esm5/internal/operators/timestamp.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Timestamp", function() { return _internal_operators_timestamp__WEBPACK_IMPORTED_MODULE_16__["Timestamp"]; });

/* harmony import */ var _internal_operators_timeInterval__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../internal/operators/timeInterval */ "./node_modules/rxjs/_esm5/internal/operators/timeInterval.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimeInterval", function() { return _internal_operators_timeInterval__WEBPACK_IMPORTED_MODULE_17__["TimeInterval"]; });

/* harmony import */ var _internal_operators_groupBy__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../internal/operators/groupBy */ "./node_modules/rxjs/_esm5/internal/operators/groupBy.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GroupedObservable", function() { return _internal_operators_groupBy__WEBPACK_IMPORTED_MODULE_18__["GroupedObservable"]; });

/* harmony import */ var _internal_operators_throttle__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../internal/operators/throttle */ "./node_modules/rxjs/_esm5/internal/operators/throttle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultThrottleConfig", function() { return _internal_operators_throttle__WEBPACK_IMPORTED_MODULE_19__["defaultThrottleConfig"]; });

/* harmony import */ var _internal_symbol_rxSubscriber__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../internal/symbol/rxSubscriber */ "./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rxSubscriber", function() { return _internal_symbol_rxSubscriber__WEBPACK_IMPORTED_MODULE_20__["rxSubscriber"]; });

/* harmony import */ var _internal_symbol_iterator__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../internal/symbol/iterator */ "./node_modules/rxjs/_esm5/internal/symbol/iterator.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "iterator", function() { return _internal_symbol_iterator__WEBPACK_IMPORTED_MODULE_21__["iterator"]; });

/* harmony import */ var _internal_symbol_observable__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../internal/symbol/observable */ "./node_modules/rxjs/_esm5/internal/symbol/observable.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "observable", function() { return _internal_symbol_observable__WEBPACK_IMPORTED_MODULE_22__["observable"]; });

/* harmony import */ var _internal_util_ArgumentOutOfRangeError__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../internal/util/ArgumentOutOfRangeError */ "./node_modules/rxjs/_esm5/internal/util/ArgumentOutOfRangeError.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ArgumentOutOfRangeError", function() { return _internal_util_ArgumentOutOfRangeError__WEBPACK_IMPORTED_MODULE_23__["ArgumentOutOfRangeError"]; });

/* harmony import */ var _internal_util_EmptyError__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../internal/util/EmptyError */ "./node_modules/rxjs/_esm5/internal/util/EmptyError.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EmptyError", function() { return _internal_util_EmptyError__WEBPACK_IMPORTED_MODULE_24__["EmptyError"]; });

/* harmony import */ var _internal_util_Immediate__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../internal/util/Immediate */ "./node_modules/rxjs/_esm5/internal/util/Immediate.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Immediate", function() { return _internal_util_Immediate__WEBPACK_IMPORTED_MODULE_25__["Immediate"]; });

/* harmony import */ var _internal_util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../internal/util/ObjectUnsubscribedError */ "./node_modules/rxjs/_esm5/internal/util/ObjectUnsubscribedError.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ObjectUnsubscribedError", function() { return _internal_util_ObjectUnsubscribedError__WEBPACK_IMPORTED_MODULE_26__["ObjectUnsubscribedError"]; });

/* harmony import */ var _internal_util_TimeoutError__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../internal/util/TimeoutError */ "./node_modules/rxjs/_esm5/internal/util/TimeoutError.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimeoutError", function() { return _internal_util_TimeoutError__WEBPACK_IMPORTED_MODULE_27__["TimeoutError"]; });

/* harmony import */ var _internal_util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../internal/util/UnsubscriptionError */ "./node_modules/rxjs/_esm5/internal/util/UnsubscriptionError.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UnsubscriptionError", function() { return _internal_util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_28__["UnsubscriptionError"]; });

/* harmony import */ var _internal_util_applyMixins__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../internal/util/applyMixins */ "./node_modules/rxjs/_esm5/internal/util/applyMixins.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyMixins", function() { return _internal_util_applyMixins__WEBPACK_IMPORTED_MODULE_29__["applyMixins"]; });

/* harmony import */ var _internal_util_errorObject__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../internal/util/errorObject */ "./node_modules/rxjs/_esm5/internal/util/errorObject.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "errorObject", function() { return _internal_util_errorObject__WEBPACK_IMPORTED_MODULE_30__["errorObject"]; });

/* harmony import */ var _internal_util_hostReportError__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ../internal/util/hostReportError */ "./node_modules/rxjs/_esm5/internal/util/hostReportError.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hostReportError", function() { return _internal_util_hostReportError__WEBPACK_IMPORTED_MODULE_31__["hostReportError"]; });

/* harmony import */ var _internal_util_identity__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ../internal/util/identity */ "./node_modules/rxjs/_esm5/internal/util/identity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return _internal_util_identity__WEBPACK_IMPORTED_MODULE_32__["identity"]; });

/* harmony import */ var _internal_util_isArray__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ../internal/util/isArray */ "./node_modules/rxjs/_esm5/internal/util/isArray.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return _internal_util_isArray__WEBPACK_IMPORTED_MODULE_33__["isArray"]; });

/* harmony import */ var _internal_util_isArrayLike__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ../internal/util/isArrayLike */ "./node_modules/rxjs/_esm5/internal/util/isArrayLike.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isArrayLike", function() { return _internal_util_isArrayLike__WEBPACK_IMPORTED_MODULE_34__["isArrayLike"]; });

/* harmony import */ var _internal_util_isDate__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ../internal/util/isDate */ "./node_modules/rxjs/_esm5/internal/util/isDate.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isDate", function() { return _internal_util_isDate__WEBPACK_IMPORTED_MODULE_35__["isDate"]; });

/* harmony import */ var _internal_util_isFunction__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ../internal/util/isFunction */ "./node_modules/rxjs/_esm5/internal/util/isFunction.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return _internal_util_isFunction__WEBPACK_IMPORTED_MODULE_36__["isFunction"]; });

/* harmony import */ var _internal_util_isIterable__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ../internal/util/isIterable */ "./node_modules/rxjs/_esm5/internal/util/isIterable.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isIterable", function() { return _internal_util_isIterable__WEBPACK_IMPORTED_MODULE_37__["isIterable"]; });

/* harmony import */ var _internal_util_isNumeric__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ../internal/util/isNumeric */ "./node_modules/rxjs/_esm5/internal/util/isNumeric.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isNumeric", function() { return _internal_util_isNumeric__WEBPACK_IMPORTED_MODULE_38__["isNumeric"]; });

/* harmony import */ var _internal_util_isObject__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ../internal/util/isObject */ "./node_modules/rxjs/_esm5/internal/util/isObject.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return _internal_util_isObject__WEBPACK_IMPORTED_MODULE_39__["isObject"]; });

/* harmony import */ var _internal_util_isInteropObservable__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ../internal/util/isInteropObservable */ "./node_modules/rxjs/_esm5/internal/util/isInteropObservable.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isObservable", function() { return _internal_util_isInteropObservable__WEBPACK_IMPORTED_MODULE_40__["isInteropObservable"]; });

/* harmony import */ var _internal_util_isPromise__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ../internal/util/isPromise */ "./node_modules/rxjs/_esm5/internal/util/isPromise.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isPromise", function() { return _internal_util_isPromise__WEBPACK_IMPORTED_MODULE_41__["isPromise"]; });

/* harmony import */ var _internal_util_isScheduler__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ../internal/util/isScheduler */ "./node_modules/rxjs/_esm5/internal/util/isScheduler.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isScheduler", function() { return _internal_util_isScheduler__WEBPACK_IMPORTED_MODULE_42__["isScheduler"]; });

/* harmony import */ var _internal_util_noop__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ../internal/util/noop */ "./node_modules/rxjs/_esm5/internal/util/noop.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "noop", function() { return _internal_util_noop__WEBPACK_IMPORTED_MODULE_43__["noop"]; });

/* harmony import */ var _internal_util_not__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ../internal/util/not */ "./node_modules/rxjs/_esm5/internal/util/not.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "not", function() { return _internal_util_not__WEBPACK_IMPORTED_MODULE_44__["not"]; });

/* harmony import */ var _internal_util_pipe__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ../internal/util/pipe */ "./node_modules/rxjs/_esm5/internal/util/pipe.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pipe", function() { return _internal_util_pipe__WEBPACK_IMPORTED_MODULE_45__["pipe"]; });

/* harmony import */ var _internal_util_root__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ../internal/util/root */ "./node_modules/rxjs/_esm5/internal/util/root.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "root", function() { return _internal_util_root__WEBPACK_IMPORTED_MODULE_46__["root"]; });

/* harmony import */ var _internal_util_subscribeTo__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ../internal/util/subscribeTo */ "./node_modules/rxjs/_esm5/internal/util/subscribeTo.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "subscribeTo", function() { return _internal_util_subscribeTo__WEBPACK_IMPORTED_MODULE_47__["subscribeTo"]; });

/* harmony import */ var _internal_util_subscribeToArray__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ../internal/util/subscribeToArray */ "./node_modules/rxjs/_esm5/internal/util/subscribeToArray.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "subscribeToArray", function() { return _internal_util_subscribeToArray__WEBPACK_IMPORTED_MODULE_48__["subscribeToArray"]; });

/* harmony import */ var _internal_util_subscribeToIterable__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ../internal/util/subscribeToIterable */ "./node_modules/rxjs/_esm5/internal/util/subscribeToIterable.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "subscribeToIterable", function() { return _internal_util_subscribeToIterable__WEBPACK_IMPORTED_MODULE_49__["subscribeToIterable"]; });

/* harmony import */ var _internal_util_subscribeToObservable__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ../internal/util/subscribeToObservable */ "./node_modules/rxjs/_esm5/internal/util/subscribeToObservable.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "subscribeToObservable", function() { return _internal_util_subscribeToObservable__WEBPACK_IMPORTED_MODULE_50__["subscribeToObservable"]; });

/* harmony import */ var _internal_util_subscribeToPromise__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ../internal/util/subscribeToPromise */ "./node_modules/rxjs/_esm5/internal/util/subscribeToPromise.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "subscribeToPromise", function() { return _internal_util_subscribeToPromise__WEBPACK_IMPORTED_MODULE_51__["subscribeToPromise"]; });

/* harmony import */ var _internal_util_subscribeToResult__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ../internal/util/subscribeToResult */ "./node_modules/rxjs/_esm5/internal/util/subscribeToResult.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "subscribeToResult", function() { return _internal_util_subscribeToResult__WEBPACK_IMPORTED_MODULE_52__["subscribeToResult"]; });

/* harmony import */ var _internal_util_toSubscriber__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ../internal/util/toSubscriber */ "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toSubscriber", function() { return _internal_util_toSubscriber__WEBPACK_IMPORTED_MODULE_53__["toSubscriber"]; });

/* harmony import */ var _internal_util_tryCatch__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ../internal/util/tryCatch */ "./node_modules/rxjs/_esm5/internal/util/tryCatch.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tryCatch", function() { return _internal_util_tryCatch__WEBPACK_IMPORTED_MODULE_54__["tryCatch"]; });

/** PURE_IMPORTS_START  PURE_IMPORTS_END */























































//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/dom/AjaxObservable.js":
/*!***************************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/dom/AjaxObservable.js ***!
  \***************************************************************************/
/*! exports provided: ajaxGet, ajaxPost, ajaxDelete, ajaxPut, ajaxPatch, ajaxGetJSON, AjaxObservable, AjaxSubscriber, AjaxResponse, AjaxError, AjaxTimeoutError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ajaxGet", function() { return ajaxGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ajaxPost", function() { return ajaxPost; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ajaxDelete", function() { return ajaxDelete; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ajaxPut", function() { return ajaxPut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ajaxPatch", function() { return ajaxPatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ajaxGetJSON", function() { return ajaxGetJSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AjaxObservable", function() { return AjaxObservable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AjaxSubscriber", function() { return AjaxSubscriber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AjaxResponse", function() { return AjaxResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AjaxError", function() { return AjaxError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AjaxTimeoutError", function() { return AjaxTimeoutError; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _util_root__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/root */ "./node_modules/rxjs/_esm5/internal/util/root.js");
/* harmony import */ var _util_tryCatch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/tryCatch */ "./node_modules/rxjs/_esm5/internal/util/tryCatch.js");
/* harmony import */ var _util_errorObject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/errorObject */ "./node_modules/rxjs/_esm5/internal/util/errorObject.js");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/* harmony import */ var _operators_map__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../operators/map */ "./node_modules/rxjs/_esm5/internal/operators/map.js");
/** PURE_IMPORTS_START tslib,_.._util_root,_.._util_tryCatch,_.._util_errorObject,_.._Observable,_.._Subscriber,_.._operators_map PURE_IMPORTS_END */







function getCORSRequest() {
    if (_util_root__WEBPACK_IMPORTED_MODULE_1__["root"].XMLHttpRequest) {
        return new _util_root__WEBPACK_IMPORTED_MODULE_1__["root"].XMLHttpRequest();
    }
    else if (!!_util_root__WEBPACK_IMPORTED_MODULE_1__["root"].XDomainRequest) {
        return new _util_root__WEBPACK_IMPORTED_MODULE_1__["root"].XDomainRequest();
    }
    else {
        throw new Error('CORS is not supported by your browser');
    }
}
function getXMLHttpRequest() {
    if (_util_root__WEBPACK_IMPORTED_MODULE_1__["root"].XMLHttpRequest) {
        return new _util_root__WEBPACK_IMPORTED_MODULE_1__["root"].XMLHttpRequest();
    }
    else {
        var progId = void 0;
        try {
            var progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'];
            for (var i = 0; i < 3; i++) {
                try {
                    progId = progIds[i];
                    if (new _util_root__WEBPACK_IMPORTED_MODULE_1__["root"].ActiveXObject(progId)) {
                        break;
                    }
                }
                catch (e) {
                }
            }
            return new _util_root__WEBPACK_IMPORTED_MODULE_1__["root"].ActiveXObject(progId);
        }
        catch (e) {
            throw new Error('XMLHttpRequest is not supported by your browser');
        }
    }
}
function ajaxGet(url, headers) {
    if (headers === void 0) {
        headers = null;
    }
    return new AjaxObservable({ method: 'GET', url: url, headers: headers });
}
function ajaxPost(url, body, headers) {
    return new AjaxObservable({ method: 'POST', url: url, body: body, headers: headers });
}
function ajaxDelete(url, headers) {
    return new AjaxObservable({ method: 'DELETE', url: url, headers: headers });
}
function ajaxPut(url, body, headers) {
    return new AjaxObservable({ method: 'PUT', url: url, body: body, headers: headers });
}
function ajaxPatch(url, body, headers) {
    return new AjaxObservable({ method: 'PATCH', url: url, body: body, headers: headers });
}
var mapResponse = /*@__PURE__*/ Object(_operators_map__WEBPACK_IMPORTED_MODULE_6__["map"])(function (x, index) { return x.response; });
function ajaxGetJSON(url, headers) {
    return mapResponse(new AjaxObservable({
        method: 'GET',
        url: url,
        responseType: 'json',
        headers: headers
    }));
}
var AjaxObservable = /*@__PURE__*/ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](AjaxObservable, _super);
    function AjaxObservable(urlOrRequest) {
        var _this = _super.call(this) || this;
        var request = {
            async: true,
            createXHR: function () {
                return this.crossDomain ? getCORSRequest() : getXMLHttpRequest();
            },
            crossDomain: true,
            withCredentials: false,
            headers: {},
            method: 'GET',
            responseType: 'json',
            timeout: 0
        };
        if (typeof urlOrRequest === 'string') {
            request.url = urlOrRequest;
        }
        else {
            for (var prop in urlOrRequest) {
                if (urlOrRequest.hasOwnProperty(prop)) {
                    request[prop] = urlOrRequest[prop];
                }
            }
        }
        _this.request = request;
        return _this;
    }
    AjaxObservable.prototype._subscribe = function (subscriber) {
        return new AjaxSubscriber(subscriber, this.request);
    };
    AjaxObservable.create = (function () {
        var create = function (urlOrRequest) {
            return new AjaxObservable(urlOrRequest);
        };
        create.get = ajaxGet;
        create.post = ajaxPost;
        create.delete = ajaxDelete;
        create.put = ajaxPut;
        create.patch = ajaxPatch;
        create.getJSON = ajaxGetJSON;
        return create;
    })();
    return AjaxObservable;
}(_Observable__WEBPACK_IMPORTED_MODULE_4__["Observable"]));

var AjaxSubscriber = /*@__PURE__*/ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](AjaxSubscriber, _super);
    function AjaxSubscriber(destination, request) {
        var _this = _super.call(this, destination) || this;
        _this.request = request;
        _this.done = false;
        var headers = request.headers = request.headers || {};
        if (!request.crossDomain && !headers['X-Requested-With']) {
            headers['X-Requested-With'] = 'XMLHttpRequest';
        }
        if (!('Content-Type' in headers) && !(_util_root__WEBPACK_IMPORTED_MODULE_1__["root"].FormData && request.body instanceof _util_root__WEBPACK_IMPORTED_MODULE_1__["root"].FormData) && typeof request.body !== 'undefined') {
            headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        }
        request.body = _this.serializeBody(request.body, request.headers['Content-Type']);
        _this.send();
        return _this;
    }
    AjaxSubscriber.prototype.next = function (e) {
        this.done = true;
        var _a = this, xhr = _a.xhr, request = _a.request, destination = _a.destination;
        var response = new AjaxResponse(e, xhr, request);
        if (response.response === _util_errorObject__WEBPACK_IMPORTED_MODULE_3__["errorObject"]) {
            destination.error(_util_errorObject__WEBPACK_IMPORTED_MODULE_3__["errorObject"].e);
        }
        else {
            destination.next(response);
        }
    };
    AjaxSubscriber.prototype.send = function () {
        var _a = this, request = _a.request, _b = _a.request, user = _b.user, method = _b.method, url = _b.url, async = _b.async, password = _b.password, headers = _b.headers, body = _b.body;
        var createXHR = request.createXHR;
        var xhr = Object(_util_tryCatch__WEBPACK_IMPORTED_MODULE_2__["tryCatch"])(createXHR).call(request);
        if (xhr === _util_errorObject__WEBPACK_IMPORTED_MODULE_3__["errorObject"]) {
            this.error(_util_errorObject__WEBPACK_IMPORTED_MODULE_3__["errorObject"].e);
        }
        else {
            this.xhr = xhr;
            this.setupEvents(xhr, request);
            var result = void 0;
            if (user) {
                result = Object(_util_tryCatch__WEBPACK_IMPORTED_MODULE_2__["tryCatch"])(xhr.open).call(xhr, method, url, async, user, password);
            }
            else {
                result = Object(_util_tryCatch__WEBPACK_IMPORTED_MODULE_2__["tryCatch"])(xhr.open).call(xhr, method, url, async);
            }
            if (result === _util_errorObject__WEBPACK_IMPORTED_MODULE_3__["errorObject"]) {
                this.error(_util_errorObject__WEBPACK_IMPORTED_MODULE_3__["errorObject"].e);
                return null;
            }
            if (async) {
                xhr.timeout = request.timeout;
                xhr.responseType = request.responseType;
            }
            if ('withCredentials' in xhr) {
                xhr.withCredentials = !!request.withCredentials;
            }
            this.setHeaders(xhr, headers);
            result = body ? Object(_util_tryCatch__WEBPACK_IMPORTED_MODULE_2__["tryCatch"])(xhr.send).call(xhr, body) : Object(_util_tryCatch__WEBPACK_IMPORTED_MODULE_2__["tryCatch"])(xhr.send).call(xhr);
            if (result === _util_errorObject__WEBPACK_IMPORTED_MODULE_3__["errorObject"]) {
                this.error(_util_errorObject__WEBPACK_IMPORTED_MODULE_3__["errorObject"].e);
                return null;
            }
        }
        return xhr;
    };
    AjaxSubscriber.prototype.serializeBody = function (body, contentType) {
        if (!body || typeof body === 'string') {
            return body;
        }
        else if (_util_root__WEBPACK_IMPORTED_MODULE_1__["root"].FormData && body instanceof _util_root__WEBPACK_IMPORTED_MODULE_1__["root"].FormData) {
            return body;
        }
        if (contentType) {
            var splitIndex = contentType.indexOf(';');
            if (splitIndex !== -1) {
                contentType = contentType.substring(0, splitIndex);
            }
        }
        switch (contentType) {
            case 'application/x-www-form-urlencoded':
                return Object.keys(body).map(function (key) { return encodeURIComponent(key) + "=" + encodeURIComponent(body[key]); }).join('&');
            case 'application/json':
                return JSON.stringify(body);
            default:
                return body;
        }
    };
    AjaxSubscriber.prototype.setHeaders = function (xhr, headers) {
        for (var key in headers) {
            if (headers.hasOwnProperty(key)) {
                xhr.setRequestHeader(key, headers[key]);
            }
        }
    };
    AjaxSubscriber.prototype.setupEvents = function (xhr, request) {
        var progressSubscriber = request.progressSubscriber;
        function xhrTimeout(e) {
            var _a = xhrTimeout, subscriber = _a.subscriber, progressSubscriber = _a.progressSubscriber, request = _a.request;
            if (progressSubscriber) {
                progressSubscriber.error(e);
            }
            var ajaxTimeoutError = new AjaxTimeoutError(this, request);
            if (ajaxTimeoutError.response === _util_errorObject__WEBPACK_IMPORTED_MODULE_3__["errorObject"]) {
                subscriber.error(_util_errorObject__WEBPACK_IMPORTED_MODULE_3__["errorObject"].e);
            }
            else {
                subscriber.error(ajaxTimeoutError);
            }
        }
        xhr.ontimeout = xhrTimeout;
        xhrTimeout.request = request;
        xhrTimeout.subscriber = this;
        xhrTimeout.progressSubscriber = progressSubscriber;
        if (xhr.upload && 'withCredentials' in xhr) {
            if (progressSubscriber) {
                var xhrProgress_1;
                xhrProgress_1 = function (e) {
                    var progressSubscriber = xhrProgress_1.progressSubscriber;
                    progressSubscriber.next(e);
                };
                if (_util_root__WEBPACK_IMPORTED_MODULE_1__["root"].XDomainRequest) {
                    xhr.onprogress = xhrProgress_1;
                }
                else {
                    xhr.upload.onprogress = xhrProgress_1;
                }
                xhrProgress_1.progressSubscriber = progressSubscriber;
            }
            var xhrError_1;
            xhrError_1 = function (e) {
                var _a = xhrError_1, progressSubscriber = _a.progressSubscriber, subscriber = _a.subscriber, request = _a.request;
                if (progressSubscriber) {
                    progressSubscriber.error(e);
                }
                var ajaxError = new AjaxError('ajax error', this, request);
                if (ajaxError.response === _util_errorObject__WEBPACK_IMPORTED_MODULE_3__["errorObject"]) {
                    subscriber.error(_util_errorObject__WEBPACK_IMPORTED_MODULE_3__["errorObject"].e);
                }
                else {
                    subscriber.error(ajaxError);
                }
            };
            xhr.onerror = xhrError_1;
            xhrError_1.request = request;
            xhrError_1.subscriber = this;
            xhrError_1.progressSubscriber = progressSubscriber;
        }
        function xhrReadyStateChange(e) {
            return;
        }
        xhr.onreadystatechange = xhrReadyStateChange;
        xhrReadyStateChange.subscriber = this;
        xhrReadyStateChange.progressSubscriber = progressSubscriber;
        xhrReadyStateChange.request = request;
        function xhrLoad(e) {
            var _a = xhrLoad, subscriber = _a.subscriber, progressSubscriber = _a.progressSubscriber, request = _a.request;
            if (this.readyState === 4) {
                var status_1 = this.status === 1223 ? 204 : this.status;
                var response = (this.responseType === 'text' ? (this.response || this.responseText) : this.response);
                if (status_1 === 0) {
                    status_1 = response ? 200 : 0;
                }
                if (status_1 < 400) {
                    if (progressSubscriber) {
                        progressSubscriber.complete();
                    }
                    subscriber.next(e);
                    subscriber.complete();
                }
                else {
                    if (progressSubscriber) {
                        progressSubscriber.error(e);
                    }
                    var ajaxError = new AjaxError('ajax error ' + status_1, this, request);
                    if (ajaxError.response === _util_errorObject__WEBPACK_IMPORTED_MODULE_3__["errorObject"]) {
                        subscriber.error(_util_errorObject__WEBPACK_IMPORTED_MODULE_3__["errorObject"].e);
                    }
                    else {
                        subscriber.error(ajaxError);
                    }
                }
            }
        }
        xhr.onload = xhrLoad;
        xhrLoad.subscriber = this;
        xhrLoad.progressSubscriber = progressSubscriber;
        xhrLoad.request = request;
    };
    AjaxSubscriber.prototype.unsubscribe = function () {
        var _a = this, done = _a.done, xhr = _a.xhr;
        if (!done && xhr && xhr.readyState !== 4 && typeof xhr.abort === 'function') {
            xhr.abort();
        }
        _super.prototype.unsubscribe.call(this);
    };
    return AjaxSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_5__["Subscriber"]));

var AjaxResponse = /*@__PURE__*/ (function () {
    function AjaxResponse(originalEvent, xhr, request) {
        this.originalEvent = originalEvent;
        this.xhr = xhr;
        this.request = request;
        this.status = xhr.status;
        this.responseType = xhr.responseType || request.responseType;
        this.response = parseXhrResponse(this.responseType, xhr);
    }
    return AjaxResponse;
}());

function AjaxErrorImpl(message, xhr, request) {
    Error.call(this);
    this.message = message;
    this.name = 'AjaxError';
    this.xhr = xhr;
    this.request = request;
    this.status = xhr.status;
    this.responseType = xhr.responseType || request.responseType;
    this.response = parseXhrResponse(this.responseType, xhr);
    return this;
}
AjaxErrorImpl.prototype = /*@__PURE__*/ Object.create(Error.prototype);
var AjaxError = AjaxErrorImpl;
function parseJson(xhr) {
    if ('response' in xhr) {
        return xhr.responseType ? xhr.response : JSON.parse(xhr.response || xhr.responseText || 'null');
    }
    else {
        return JSON.parse(xhr.responseText || 'null');
    }
}
function parseXhrResponse(responseType, xhr) {
    switch (responseType) {
        case 'json':
            return Object(_util_tryCatch__WEBPACK_IMPORTED_MODULE_2__["tryCatch"])(parseJson)(xhr);
        case 'xml':
            return xhr.responseXML;
        case 'text':
        default:
            return ('response' in xhr) ? xhr.response : xhr.responseText;
    }
}
function AjaxTimeoutErrorImpl(xhr, request) {
    AjaxError.call(this, 'ajax timeout', xhr, request);
    this.name = 'AjaxTimeoutError';
    return this;
}
var AjaxTimeoutError = AjaxTimeoutErrorImpl;
//# sourceMappingURL=AjaxObservable.js.map


/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/dom/WebSocketSubject.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/dom/WebSocketSubject.js ***!
  \*****************************************************************************/
/*! exports provided: WebSocketSubject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebSocketSubject", function() { return WebSocketSubject; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Subject */ "./node_modules/rxjs/_esm5/internal/Subject.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Subscription */ "./node_modules/rxjs/_esm5/internal/Subscription.js");
/* harmony import */ var _ReplaySubject__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../ReplaySubject */ "./node_modules/rxjs/_esm5/internal/ReplaySubject.js");
/* harmony import */ var _util_tryCatch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../util/tryCatch */ "./node_modules/rxjs/_esm5/internal/util/tryCatch.js");
/* harmony import */ var _util_errorObject__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../util/errorObject */ "./node_modules/rxjs/_esm5/internal/util/errorObject.js");
/** PURE_IMPORTS_START tslib,_.._Subject,_.._Subscriber,_.._Observable,_.._Subscription,_.._ReplaySubject,_.._util_tryCatch,_.._util_errorObject PURE_IMPORTS_END */








var DEFAULT_WEBSOCKET_CONFIG = {
    url: '',
    deserializer: function (e) { return JSON.parse(e.data); },
    serializer: function (value) { return JSON.stringify(value); },
};
var WEBSOCKETSUBJECT_INVALID_ERROR_OBJECT = 'WebSocketSubject.error must be called with an object with an error code, and an optional reason: { code: number, reason: string }';
var WebSocketSubject = /*@__PURE__*/ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](WebSocketSubject, _super);
    function WebSocketSubject(urlConfigOrSource, destination) {
        var _this = _super.call(this) || this;
        if (urlConfigOrSource instanceof _Observable__WEBPACK_IMPORTED_MODULE_3__["Observable"]) {
            _this.destination = destination;
            _this.source = urlConfigOrSource;
        }
        else {
            var config = _this._config = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, DEFAULT_WEBSOCKET_CONFIG);
            _this._output = new _Subject__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
            if (typeof urlConfigOrSource === 'string') {
                config.url = urlConfigOrSource;
            }
            else {
                for (var key in urlConfigOrSource) {
                    if (urlConfigOrSource.hasOwnProperty(key)) {
                        config[key] = urlConfigOrSource[key];
                    }
                }
            }
            if (!config.WebSocketCtor && WebSocket) {
                config.WebSocketCtor = WebSocket;
            }
            else if (!config.WebSocketCtor) {
                throw new Error('no WebSocket constructor can be found');
            }
            _this.destination = new _ReplaySubject__WEBPACK_IMPORTED_MODULE_5__["ReplaySubject"]();
        }
        return _this;
    }
    WebSocketSubject.prototype.lift = function (operator) {
        var sock = new WebSocketSubject(this._config, this.destination);
        sock.operator = operator;
        sock.source = this;
        return sock;
    };
    WebSocketSubject.prototype._resetState = function () {
        this._socket = null;
        if (!this.source) {
            this.destination = new _ReplaySubject__WEBPACK_IMPORTED_MODULE_5__["ReplaySubject"]();
        }
        this._output = new _Subject__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    };
    WebSocketSubject.prototype.multiplex = function (subMsg, unsubMsg, messageFilter) {
        var self = this;
        return new _Observable__WEBPACK_IMPORTED_MODULE_3__["Observable"](function (observer) {
            var result = Object(_util_tryCatch__WEBPACK_IMPORTED_MODULE_6__["tryCatch"])(subMsg)();
            if (result === _util_errorObject__WEBPACK_IMPORTED_MODULE_7__["errorObject"]) {
                observer.error(_util_errorObject__WEBPACK_IMPORTED_MODULE_7__["errorObject"].e);
            }
            else {
                self.next(result);
            }
            var subscription = self.subscribe(function (x) {
                var result = Object(_util_tryCatch__WEBPACK_IMPORTED_MODULE_6__["tryCatch"])(messageFilter)(x);
                if (result === _util_errorObject__WEBPACK_IMPORTED_MODULE_7__["errorObject"]) {
                    observer.error(_util_errorObject__WEBPACK_IMPORTED_MODULE_7__["errorObject"].e);
                }
                else if (result) {
                    observer.next(x);
                }
            }, function (err) { return observer.error(err); }, function () { return observer.complete(); });
            return function () {
                var result = Object(_util_tryCatch__WEBPACK_IMPORTED_MODULE_6__["tryCatch"])(unsubMsg)();
                if (result === _util_errorObject__WEBPACK_IMPORTED_MODULE_7__["errorObject"]) {
                    observer.error(_util_errorObject__WEBPACK_IMPORTED_MODULE_7__["errorObject"].e);
                }
                else {
                    self.next(result);
                }
                subscription.unsubscribe();
            };
        });
    };
    WebSocketSubject.prototype._connectSocket = function () {
        var _this = this;
        var _a = this._config, WebSocketCtor = _a.WebSocketCtor, protocol = _a.protocol, url = _a.url, binaryType = _a.binaryType;
        var observer = this._output;
        var socket = null;
        try {
            socket = protocol ?
                new WebSocketCtor(url, protocol) :
                new WebSocketCtor(url);
            this._socket = socket;
            if (binaryType) {
                this._socket.binaryType = binaryType;
            }
        }
        catch (e) {
            observer.error(e);
            return;
        }
        var subscription = new _Subscription__WEBPACK_IMPORTED_MODULE_4__["Subscription"](function () {
            _this._socket = null;
            if (socket && socket.readyState === 1) {
                socket.close();
            }
        });
        socket.onopen = function (e) {
            var openObserver = _this._config.openObserver;
            if (openObserver) {
                openObserver.next(e);
            }
            var queue = _this.destination;
            _this.destination = _Subscriber__WEBPACK_IMPORTED_MODULE_2__["Subscriber"].create(function (x) {
                if (socket.readyState === 1) {
                    var serializer = _this._config.serializer;
                    var msg = Object(_util_tryCatch__WEBPACK_IMPORTED_MODULE_6__["tryCatch"])(serializer)(x);
                    if (msg === _util_errorObject__WEBPACK_IMPORTED_MODULE_7__["errorObject"]) {
                        _this.destination.error(_util_errorObject__WEBPACK_IMPORTED_MODULE_7__["errorObject"].e);
                        return;
                    }
                    socket.send(msg);
                }
            }, function (e) {
                var closingObserver = _this._config.closingObserver;
                if (closingObserver) {
                    closingObserver.next(undefined);
                }
                if (e && e.code) {
                    socket.close(e.code, e.reason);
                }
                else {
                    observer.error(new TypeError(WEBSOCKETSUBJECT_INVALID_ERROR_OBJECT));
                }
                _this._resetState();
            }, function () {
                var closingObserver = _this._config.closingObserver;
                if (closingObserver) {
                    closingObserver.next(undefined);
                }
                socket.close();
                _this._resetState();
            });
            if (queue && queue instanceof _ReplaySubject__WEBPACK_IMPORTED_MODULE_5__["ReplaySubject"]) {
                subscription.add(queue.subscribe(_this.destination));
            }
        };
        socket.onerror = function (e) {
            _this._resetState();
            observer.error(e);
        };
        socket.onclose = function (e) {
            _this._resetState();
            var closeObserver = _this._config.closeObserver;
            if (closeObserver) {
                closeObserver.next(e);
            }
            if (e.wasClean) {
                observer.complete();
            }
            else {
                observer.error(e);
            }
        };
        socket.onmessage = function (e) {
            var deserializer = _this._config.deserializer;
            var result = Object(_util_tryCatch__WEBPACK_IMPORTED_MODULE_6__["tryCatch"])(deserializer)(e);
            if (result === _util_errorObject__WEBPACK_IMPORTED_MODULE_7__["errorObject"]) {
                observer.error(_util_errorObject__WEBPACK_IMPORTED_MODULE_7__["errorObject"].e);
            }
            else {
                observer.next(result);
            }
        };
    };
    WebSocketSubject.prototype._subscribe = function (subscriber) {
        var _this = this;
        var source = this.source;
        if (source) {
            return source.subscribe(subscriber);
        }
        if (!this._socket) {
            this._connectSocket();
        }
        this._output.subscribe(subscriber);
        subscriber.add(function () {
            var _socket = _this._socket;
            if (_this._output.observers.length === 0) {
                if (_socket && _socket.readyState === 1) {
                    _socket.close();
                }
                _this._resetState();
            }
        });
        return subscriber;
    };
    WebSocketSubject.prototype.unsubscribe = function () {
        var _a = this, source = _a.source, _socket = _a._socket;
        if (_socket && _socket.readyState === 1) {
            _socket.close();
            this._resetState();
        }
        _super.prototype.unsubscribe.call(this);
        if (!source) {
            this.destination = new _ReplaySubject__WEBPACK_IMPORTED_MODULE_5__["ReplaySubject"]();
        }
    };
    return WebSocketSubject;
}(_Subject__WEBPACK_IMPORTED_MODULE_1__["AnonymousSubject"]));

//# sourceMappingURL=WebSocketSubject.js.map


/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/dom/ajax.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/dom/ajax.js ***!
  \*****************************************************************/
/*! exports provided: ajax */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ajax", function() { return ajax; });
/* harmony import */ var _AjaxObservable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AjaxObservable */ "./node_modules/rxjs/_esm5/internal/observable/dom/AjaxObservable.js");
/** PURE_IMPORTS_START _AjaxObservable PURE_IMPORTS_END */

var ajax = _AjaxObservable__WEBPACK_IMPORTED_MODULE_0__["AjaxObservable"].create;
//# sourceMappingURL=ajax.js.map


/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/dom/webSocket.js":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/dom/webSocket.js ***!
  \**********************************************************************/
/*! exports provided: webSocket */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "webSocket", function() { return webSocket; });
/* harmony import */ var _WebSocketSubject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WebSocketSubject */ "./node_modules/rxjs/_esm5/internal/observable/dom/WebSocketSubject.js");
/** PURE_IMPORTS_START _WebSocketSubject PURE_IMPORTS_END */

function webSocket(urlConfigOrSource) {
    return new _WebSocketSubject__WEBPACK_IMPORTED_MODULE_0__["WebSocketSubject"](urlConfigOrSource);
}
//# sourceMappingURL=webSocket.js.map


/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/applyMixins.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/applyMixins.js ***!
  \**************************************************************/
/*! exports provided: applyMixins */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyMixins", function() { return applyMixins; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function applyMixins(derivedCtor, baseCtors) {
    for (var i = 0, len = baseCtors.length; i < len; i++) {
        var baseCtor = baseCtors[i];
        var propertyKeys = Object.getOwnPropertyNames(baseCtor.prototype);
        for (var j = 0, len2 = propertyKeys.length; j < len2; j++) {
            var name_1 = propertyKeys[j];
            derivedCtor.prototype[name_1] = baseCtor.prototype[name_1];
        }
    }
}
//# sourceMappingURL=applyMixins.js.map


/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/root.js":
/*!*******************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/root.js ***!
  \*******************************************************/
/*! exports provided: root */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "root", function() { return _root; });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var __window = typeof window !== 'undefined' && window;
var __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&
    self instanceof WorkerGlobalScope && self;
var __global = typeof global !== 'undefined' && global;
var _root = __window || __global || __self;
/*@__PURE__*/ (function () {
    if (!_root) {
        throw /*@__PURE__*/ new Error('RxJS could not find any global context (window, self, global)');
    }
})();

//# sourceMappingURL=root.js.map


/***/ }),

/***/ "./src/app/pages/carriera/medie/medie.html":
/*!*************************************************!*\
  !*** ./src/app/pages/carriera/medie/medie.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-grid no-padding>\n    <ion-row *ngIf=\"!globalData.landscape && globalData.iPhoneX\">\n      <ion-col>\n        <ion-label> </ion-label>\n      </ion-col>\n    </ion-row>\n    <ion-row no-padding>\n      <ion-col no-padding>\n        <ion-toolbar>\n          <ion-buttons slot=\"start\">\n            <ion-menu-button></ion-menu-button>\n          </ion-buttons>\n          <ion-title>\n            Previsione Media\n          </ion-title>\n        </ion-toolbar>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-header>\n\n<ion-content padding>\n  <ion-refresher slot=\"fixed\" [disabled]=\"false\" (ionRefresh)=\"doRefresh($event)\">\n    <ion-refresher-content></ion-refresher-content>\n  </ion-refresher>\n\n  <ion-grid *ngIf=\"rinvioAggiornamento && !items\" text-center>\n    <ion-row>\n      <ion-col text-center>\n        <img class=\"progress\" src=\"assets/img/progress.gif\" />\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col text-center>\n        <ion-title><strong>Aggiornamento in corso</strong></ion-title>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col text-center>\n        <ion-label>un attimo di pazienza</ion-label>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-list *ngIf=\"!rinvioAggiornamento && items?.length == 0\">\n    <ion-item text-center>\n      <ion-grid>\n        <ion-row>\n          <ion-col>\n            <h2>Dati non presenti</h2>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col>\n            <img class=\"logo\" src=\"assets/img/sad.png\" />\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-item>\n  </ion-list>\n\n  <ion-grid fixed no-padding *ngIf=\"items && items?.length > 0 && !rinvioAggiornamento\">\n    <ion-row>\n      <ion-col text-center no-padding>\n        <ion-label *ngIf=\"mediaAritmetica != 0\">\n          Medie: A. <b>{{mediaAritmetica}}</b>\n          P. <b>{{mediaPonderata}}</b>\n          B.L. <b>{{baseLaurea}}</b>\n        </ion-label>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col size=\"2\" align-self-center=\"true\" no-padding>\n        CFU\n      </ion-col>\n      <ion-col align-self-center=\"true\" no-padding>\n        <ion-range min=\"1\" max=\"30\" pin=\"true\" (ionChange)=\"calcola()\" [(ngModel)]=\"CFU\" color=\"primary\">\n          <ion-label range-left>CFU</ion-label>\n        </ion-range>\n      </ion-col>\n      <ion-col size=\"1\" align-self-center=\"true\" no-padding>\n        <ion-label>{{CFU}}</ion-label>\n      </ion-col>\n    </ion-row>\n\n    <ion-row class=\"headerMedie\" >\n      <ion-col no-padding text-center offset=\"1\" size=\"4\"><ion-label>Media<br>Aritmetica</ion-label></ion-col>\n      <ion-col no-padding text-center size=\"4\"><ion-label>Media<br>Ponderata</ion-label></ion-col>\n      <ion-col no-padding text-center size=\"3\"><ion-label>Base di<br>Laurea</ion-label></ion-col>\n    </ion-row>\n\n    <ion-row class=\"medie\" >\n      <ion-col no-padding class=\"headerMedie\" size=\"1\">\n        <div *ngFor='let item of listaVoti'> {{ item }} </div>\n      </ion-col>\n      <ion-col no-padding size=\"4\">\n        <div *ngFor='let item of ListaMedieAritmetiche'> {{ item }} </div>\n      </ion-col>\n      <ion-col no-padding size=\"4\">\n        <div *ngFor='let item of ListaMediePonderate'> {{ item}} </div>\n      </ion-col>\n      <ion-col no-padding size=\"3\">\n        <div *ngFor='let item of ListaBasiLauree'> {{ item }} </div>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col no-padding=\"\">\n        <ion-label text-wrap text-center>Fai scorrere la barra dei CFU per vedere come cambiano la media voto e la base di laurea a seconda del voto</ion-label>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n\n<ion-footer  no-padding>\n  <ion-toolbar>\n    <ion-buttons slot=\"start\">\n      <ion-spinner [hidden]=\"!isLoading() || !http.getConnected()\"></ion-spinner>\n      <fa-icon [hidden]=\"isLoading() || !http.getConnected()\" [icon]=\"globalData.faLink\"></fa-icon>\n      <fa-icon [hidden]=\"isLoading() || http.getConnected()\"  [icon]=\"globalData.faUnlink\"></fa-icon>\n    </ion-buttons>\n\n    <div class=\"testo-footer\">\n      Aggiornato al: {{dataAggiornamento}}\n    </div>\n\n    <ion-buttons slot=\"end\" no-padding>\n      <ion-icon slot=\"icon-only\" src=\"assets/icon/blank.png\"></ion-icon>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-footer>\n"

/***/ }),

/***/ "./src/app/pages/carriera/medie/medie.module.ts":
/*!******************************************************!*\
  !*** ./src/app/pages/carriera/medie/medie.module.ts ***!
  \******************************************************/
/*! exports provided: MediePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediePageModule", function() { return MediePageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _medie__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./medie */ "./src/app/pages/carriera/medie/medie.ts");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var MediePageModule = /** @class */ (function () {
    function MediePageModule() {
    }
    MediePageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"],
                _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_6__["FontAwesomeModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _medie__WEBPACK_IMPORTED_MODULE_5__["MediePage"]
                    }
                ])
            ],
            declarations: [_medie__WEBPACK_IMPORTED_MODULE_5__["MediePage"]]
        })
    ], MediePageModule);
    return MediePageModule;
}());



/***/ }),

/***/ "./src/app/pages/carriera/medie/medie.ts":
/*!***********************************************!*\
  !*** ./src/app/pages/carriera/medie/medie.ts ***!
  \***********************************************/
/*! exports provided: MediePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediePage", function() { return MediePage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_util_isNumeric__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/util/isNumeric */ "./node_modules/rxjs-compat/_esm5/util/isNumeric.js");
/* harmony import */ var _services_sync_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../services/sync.service */ "./src/app/services/sync.service.ts");
/* harmony import */ var _services_global_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../services/global-data.service */ "./src/app/services/global-data.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _services_account_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../services/account.service */ "./src/app/services/account.service.ts");
/* harmony import */ var _services_http_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../services/http.service */ "./src/app/services/http.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MediePage = /** @class */ (function () {
    function MediePage(sync, http, toastCtrl, globalData, account) {
        this.sync = sync;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.globalData = globalData;
        this.account = account;
        this.currentPage = '/medie';
        this.idServizio = 12; // Piano di studi
        this.sommaVoti = 0;
        this.sommaCrediti = 0;
        this.numeroEsami = 0;
        this.pesoEsami = 0;
        this.mediaAritmetica = 0;
        this.mediaPonderata = 0;
        this.baseLaurea = 0;
        // variabili da far visualizzare nella tabella
        this.ListaMedieAritmetiche = [];
        this.ListaMediePonderate = [];
        this.ListaBasiLauree = [];
        this.listaVoti = [];
        this.CFU = 1;
        this.cfuSelezionati = 1;
        this.aggiornamentoVerificato = false;
        this.rinvioAggiornamento = false;
        this.nrRinvii = 0;
        this.maxNrRinvii = 5;
        this.listaVoti = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    }
    MediePage.prototype.ngOnInit = function () {
        var _this = this;
        this.globalData.srcPage = this.currentPage;
        this.account.controllaAccount().then(function (ok) {
            _this.http.getConnected();
            _this.aggiorna(false, true);
        }, function (err) {
            _this.globalData.goTo(_this.currentPage, '/login', 'root', false);
        });
    };
    // ngAfterContentInit() {
    //     //     this.aggiorna(false, true);
    //     // }
    MediePage.prototype.aggiorna = function (interattivo, sync) {
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
        this.nrRinvii = 0;
        this.sync.getJson(this.idServizio, true).then(function (data) {
            if (_this.sync.dataIsChanged(_this.items, data[0])) {
                _this.items = data[0];
                _this.calcola();
                setTimeout(function () {
                    _this.controllaAggiornamento();
                }, 1000);
            }
            _this.dataAggiornamento = _services_sync_service__WEBPACK_IMPORTED_MODULE_2__["SyncService"].dataAggiornamento(data);
        }, function (err) {
        }).catch(function (err) {
        });
    };
    MediePage.prototype.controllaAggiornamento = function () {
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
    MediePage.prototype.isLoading = function () {
        return this.sync.loading[this.idServizio];
    };
    MediePage.prototype.doRefresh = function (refresher) {
        if (refresher) {
            refresher.target.complete();
        }
        if (this.sync.loading[this.idServizio]) {
            return;
        }
        this.aggiorna(true, true);
    };
    MediePage.prototype.calcola = function () {
        this.sommaCrediti = 0;
        this.sommaVoti = 0;
        this.numeroEsami = 0;
        this.pesoEsami = 0;
        var MedieAritmetiche = [];
        var MediePonderate = [];
        var BasiLauree = [];
        var json = this.items;
        // ESTRAZIONE DEI DATI DAL JSON
        var iter = Object.keys(json).length;
        var i;
        for (i = 0; i < iter; i++) {
            // aggiornamento delle variabili di lavoro che verranno usate nei calcoli
            if ((Object(rxjs_util_isNumeric__WEBPACK_IMPORTED_MODULE_1__["isNumeric"])(json[i]['VOTO']) &&
                (json[i]['VOTO'] !== 0) &&
                (json[i]['SOVRANNUMERARIA'] === '0'))) {
                var votoEsame = parseInt(json[i]['VOTO'], 10);
                var peso = parseInt(json[i]['CFU'], 10);
                this.numeroEsami += 1;
                this.sommaCrediti += peso;
                this.sommaVoti += votoEsame;
                this.pesoEsami += votoEsame * peso;
            }
        }
        this.mediaAritmetica = parseFloat((this.sommaVoti / this.numeroEsami).toFixed(2));
        this.mediaPonderata = parseFloat((this.pesoEsami / this.sommaCrediti).toFixed(2));
        if (isNaN(this.mediaAritmetica)) {
            this.mediaAritmetica = 0;
        }
        if (isNaN(this.mediaPonderata)) {
            this.mediaPonderata = 0;
        }
        if (isNaN(this.sommaCrediti)) {
            this.sommaCrediti = 0;
        }
        this.baseLaurea = parseFloat((this.mediaPonderata * 11 / 3).toFixed(0));
        // if (this.CFU == '')) {
        //     this.cfuSelezionati = 1;
        // } else {
        //     this.cfuSelezionati = form.value.CFU;
        // }
        this.cfuSelezionati = this.CFU;
        this.sommaCrediti += this.cfuSelezionati;
        // incremento del numero degli esami al solo fine di effettuare la previsione con un nuovo esame
        this.numeroEsami = (this.numeroEsami + 1);
        // inizio dei CALCOLI
        var voto;
        for (voto = 18; voto <= 30; voto++) {
            // CALCOLO MEDIA ARITMETICA
            MedieAritmetiche[voto - 18] = ((this.sommaVoti + voto) / this.numeroEsami).toFixed(2);
            // CALCOLO MEDIA PONDERATA
            MediePonderate[voto - 18] = ((this.pesoEsami + (voto * this.cfuSelezionati)) / this.sommaCrediti).toFixed(2);
            // CALCOLO BASE DI LAUREA
            BasiLauree[voto - 18] = ((MediePonderate[voto - 18] * 11) / 3).toFixed(0);
        }
        // assegna le variabili calcolate a variabili globali
        this.ListaMedieAritmetiche = MedieAritmetiche;
        this.ListaMediePonderate = MediePonderate;
        this.ListaBasiLauree = BasiLauree;
        this.CFU = this.cfuSelezionati;
    };
    MediePage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-medie',
            template: __webpack_require__(/*! ./medie.html */ "./src/app/pages/carriera/medie/medie.html")
        }),
        __metadata("design:paramtypes", [_services_sync_service__WEBPACK_IMPORTED_MODULE_2__["SyncService"],
            _services_http_service__WEBPACK_IMPORTED_MODULE_6__["HttpService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ToastController"],
            _services_global_data_service__WEBPACK_IMPORTED_MODULE_3__["GlobalDataService"],
            _services_account_service__WEBPACK_IMPORTED_MODULE_5__["AccountService"]])
    ], MediePage);
    return MediePage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-carriera-medie-medie-module.js.map