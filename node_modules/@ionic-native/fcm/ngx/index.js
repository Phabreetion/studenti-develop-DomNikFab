var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { IonicNativePlugin, cordova } from '@ionic-native/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
var FCM = /** @class */ (function (_super) {
    __extends(FCM, _super);
    function FCM() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FCM.prototype.getToken = function () { return cordova(this, "getToken", {}, arguments); };
    FCM.prototype.onTokenRefresh = function () { return cordova(this, "onTokenRefresh", { "observable": true }, arguments); };
    FCM.prototype.subscribeToTopic = function (topic) { return cordova(this, "subscribeToTopic", {}, arguments); };
    FCM.prototype.unsubscribeFromTopic = function (topic) { return cordova(this, "unsubscribeFromTopic", {}, arguments); };
    FCM.prototype.onNotification = function () { return cordova(this, "onNotification", { "observable": true, "successIndex": 0, "errorIndex": 2 }, arguments); };
    FCM.pluginName = "FCM";
    FCM.plugin = "cordova-plugin-fcm-with-dependecy-updated";
    FCM.pluginRef = "FCMPlugin";
    FCM.repo = "https://github.com/andrehtissot/cordova-plugin-fcm-with-dependecy-updated";
    FCM.platforms = ["Android", "iOS"];
    FCM = __decorate([
        Injectable()
    ], FCM);
    return FCM;
}(IonicNativePlugin));
export { FCM };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL2ZjbS9uZ3gvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU8sOEJBQXNDLE1BQU0sb0JBQW9CLENBQUM7QUFDeEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDOztJQTZEVCx1QkFBaUI7Ozs7SUFPeEMsc0JBQVE7SUFZUiw0QkFBYztJQVlkLDhCQUFnQixhQUFDLEtBQWE7SUFZOUIsa0NBQW9CLGFBQUMsS0FBYTtJQWNsQyw0QkFBYzs7Ozs7O0lBekRILEdBQUc7UUFEZixVQUFVLEVBQUU7T0FDQSxHQUFHO2NBL0RoQjtFQStEeUIsaUJBQWlCO1NBQTdCLEdBQUciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb3Jkb3ZhLCBJb25pY05hdGl2ZVBsdWdpbiwgUGx1Z2luIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9jb3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGludGVyZmFjZSBOb3RpZmljYXRpb25EYXRhIHtcbiAgLyoqXG4gICAqIERldGVybWluZXMgd2hldGhlciB0aGUgbm90aWZpY2F0aW9uIHdhcyBwcmVzc2VkIG9yIG5vdFxuICAgKi9cblxuICB3YXNUYXBwZWQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIE5vdGlmaWNhdGlvbiBkYXRhIGhhc2ggaXRlbVxuICAgKi9cblxuICBbbmFtZTogc3RyaW5nXTogYW55O1xufVxuXG4vKipcbiAqIEBuYW1lIEZDTVxuICogQGRlc2NyaXB0aW9uXG4gKiBQcm92aWRlcyBiYXNpYyBmdW5jdGlvbmFsaXR5IGZvciBGaXJlYmFzZSBDbG91ZCBNZXNzYWdpbmdcbiAqXG4gKiBAdXNhZ2VcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IEZDTSB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvZmNtL25neCc7XG4gKlxuICogY29uc3RydWN0b3IocHJpdmF0ZSBmY206IEZDTSkge31cbiAqXG4gKiAuLi5cbiAqXG4gKiB0aGlzLmZjbS5zdWJzY3JpYmVUb1RvcGljKCdtYXJrZXRpbmcnKTtcbiAqXG4gKiB0aGlzLmZjbS5nZXRUb2tlbigpLnRoZW4odG9rZW4gPT4ge1xuICogICBiYWNrZW5kLnJlZ2lzdGVyVG9rZW4odG9rZW4pO1xuICogfSk7XG4gKlxuICogdGhpcy5mY20ub25Ob3RpZmljYXRpb24oKS5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gKiAgIGlmKGRhdGEud2FzVGFwcGVkKXtcbiAqICAgICBjb25zb2xlLmxvZyhcIlJlY2VpdmVkIGluIGJhY2tncm91bmRcIik7XG4gKiAgIH0gZWxzZSB7XG4gKiAgICAgY29uc29sZS5sb2coXCJSZWNlaXZlZCBpbiBmb3JlZ3JvdW5kXCIpO1xuICogICB9O1xuICogfSk7XG4gKlxuICogdGhpcy5mY20ub25Ub2tlblJlZnJlc2goKS5zdWJzY3JpYmUodG9rZW4gPT4ge1xuICogICBiYWNrZW5kLnJlZ2lzdGVyVG9rZW4odG9rZW4pO1xuICogfSk7XG4gKlxuICogdGhpcy5mY20udW5zdWJzY3JpYmVGcm9tVG9waWMoJ21hcmtldGluZycpO1xuICpcbiAqIGBgYFxuICogQGludGVyZmFjZXNcbiAqIE5vdGlmaWNhdGlvbkRhdGFcbiAqL1xuQFBsdWdpbih7XG4gIHBsdWdpbk5hbWU6ICdGQ00nLFxuICBwbHVnaW46ICdjb3Jkb3ZhLXBsdWdpbi1mY20td2l0aC1kZXBlbmRlY3ktdXBkYXRlZCcsXG4gIHBsdWdpblJlZjogJ0ZDTVBsdWdpbicsXG4gIHJlcG86ICdodHRwczovL2dpdGh1Yi5jb20vYW5kcmVodGlzc290L2NvcmRvdmEtcGx1Z2luLWZjbS13aXRoLWRlcGVuZGVjeS11cGRhdGVkJyxcbiAgcGxhdGZvcm1zOiBbJ0FuZHJvaWQnLCAnaU9TJ11cbn0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRkNNIGV4dGVuZHMgSW9uaWNOYXRpdmVQbHVnaW4ge1xuICAvKipcbiAgICogR2V0cyBkZXZpY2UncyBjdXJyZW50IHJlZ2lzdHJhdGlvbiBpZFxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmc+fSBSZXR1cm5zIGEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIHJlZ2lzdHJhdGlvbiBpZCB0b2tlblxuICAgKi9cbiAgQENvcmRvdmEoKVxuICBnZXRUb2tlbigpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBFdmVudCBmaXJpbmcgb24gdGhlIHRva2VuIHJlZnJlc2hcbiAgICpcbiAgICogQHJldHVybnMge09ic2VydmFibGU8c3RyaW5nPn0gUmV0dXJucyBhbiBPYnNlcnZhYmxlIHRoYXQgbm90aWZpZXMgd2l0aCB0aGUgY2hhbmdlIG9mIGRldmljZSdzIHJlZ2lzdHJhdGlvbiBpZFxuICAgKi9cbiAgQENvcmRvdmEoe1xuICAgIG9ic2VydmFibGU6IHRydWVcbiAgfSlcbiAgb25Ub2tlblJlZnJlc2goKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlcyB5b3UgdG8gYSBbdG9waWNdKGh0dHBzOi8vZmlyZWJhc2UuZ29vZ2xlLmNvbS9kb2NzL25vdGlmaWNhdGlvbnMvYW5kcm9pZC9jb25zb2xlLXRvcGljcylcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRvcGljIFRvcGljIHRvIGJlIHN1YnNjcmliZWQgdG9cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn0gUmV0dXJucyBhIHByb21pc2UgcmVzb2x2aW5nIGluIHJlc3VsdCBvZiBzdWJzY3JpYmluZyB0byBhIHRvcGljXG4gICAqL1xuICBAQ29yZG92YSgpXG4gIHN1YnNjcmliZVRvVG9waWModG9waWM6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIFVuc3Vic2NyaWJlcyB5b3UgZnJvbSBhIFt0b3BpY10oaHR0cHM6Ly9maXJlYmFzZS5nb29nbGUuY29tL2RvY3Mvbm90aWZpY2F0aW9ucy9hbmRyb2lkL2NvbnNvbGUtdG9waWNzKVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdG9waWMgVG9waWMgdG8gYmUgdW5zdWJzY3JpYmVkIGZyb21cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn0gUmV0dXJucyBhIHByb21pc2UgcmVzb2x2aW5nIGluIHJlc3VsdCBvZiB1bnN1YnNjcmliaW5nIGZyb20gYSB0b3BpY1xuICAgKi9cbiAgQENvcmRvdmEoKVxuICB1bnN1YnNjcmliZUZyb21Ub3BpYyh0b3BpYzogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogV2F0Y2ggZm9yIGluY29taW5nIG5vdGlmaWNhdGlvbnNcbiAgICpcbiAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn0gcmV0dXJucyBhbiBvYmplY3Qgd2l0aCBkYXRhIGZyb20gdGhlIG5vdGlmaWNhdGlvblxuICAgKi9cbiAgQENvcmRvdmEoe1xuICAgIG9ic2VydmFibGU6IHRydWUsXG4gICAgc3VjY2Vzc0luZGV4OiAwLFxuICAgIGVycm9ySW5kZXg6IDJcbiAgfSlcbiAgb25Ob3RpZmljYXRpb24oKTogT2JzZXJ2YWJsZTxOb3RpZmljYXRpb25EYXRhPiB7XG4gICAgcmV0dXJuO1xuICB9XG59XG4iXX0=