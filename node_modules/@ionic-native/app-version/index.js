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
import { IonicNativePlugin, cordova } from '@ionic-native/core';
var AppVersionOriginal = /** @class */ (function (_super) {
    __extends(AppVersionOriginal, _super);
    function AppVersionOriginal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppVersionOriginal.prototype.getAppName = function () { return cordova(this, "getAppName", {}, arguments); };
    AppVersionOriginal.prototype.getPackageName = function () { return cordova(this, "getPackageName", {}, arguments); };
    AppVersionOriginal.prototype.getVersionCode = function () { return cordova(this, "getVersionCode", {}, arguments); };
    AppVersionOriginal.prototype.getVersionNumber = function () { return cordova(this, "getVersionNumber", {}, arguments); };
    AppVersionOriginal.pluginName = "AppVersion";
    AppVersionOriginal.plugin = "cordova-plugin-app-version";
    AppVersionOriginal.pluginRef = "cordova.getAppVersion";
    AppVersionOriginal.repo = "https://github.com/whiteoctober/cordova-plugin-app-version";
    AppVersionOriginal.platforms = ["Android", "iOS", "Windows"];
    return AppVersionOriginal;
}(IonicNativePlugin));
var AppVersion = new AppVersionOriginal();
export { AppVersion };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL2FwcC12ZXJzaW9uL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQSxPQUFPLDhCQUFzQyxNQUFNLG9CQUFvQixDQUFDOztJQW9DeEMsOEJBQWlCOzs7O0lBTy9DLCtCQUFVO0lBT1YsbUNBQWM7SUFTZCxtQ0FBYztJQU9kLHFDQUFnQjs7Ozs7O3FCQW5FbEI7RUFxQ2dDLGlCQUFpQjtTQUFwQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29yZG92YSwgSW9uaWNOYXRpdmVQbHVnaW4sIFBsdWdpbiB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvY29yZSc7XG5cblxuLyoqXG4gKiBAbmFtZSBBcHAgVmVyc2lvblxuICogQGRlc2NyaXB0aW9uXG4gKiBSZWFkcyB0aGUgdmVyc2lvbiBvZiB5b3VyIGFwcCBmcm9tIHRoZSB0YXJnZXQgYnVpbGQgc2V0dGluZ3MuXG4gKlxuICogUmVxdWlyZXMgQ29yZG92YSBwbHVnaW46IGBjb3Jkb3ZhLXBsdWdpbi1hcHAtdmVyc2lvbmAuIEZvciBtb3JlIGluZm8sIHBsZWFzZSBzZWUgdGhlIFtDb3Jkb3ZhIEFwcCBWZXJzaW9uIGRvY3NdKGh0dHBzOi8vZ2l0aHViLmNvbS93aGl0ZW9jdG9iZXIvY29yZG92YS1wbHVnaW4tYXBwLXZlcnNpb24pLlxuICpcbiAqIEB1c2FnZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgQXBwVmVyc2lvbiB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvYXBwLXZlcnNpb24vbmd4JztcbiAqXG4gKiBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwcFZlcnNpb246IEFwcFZlcnNpb24pIHsgfVxuICpcbiAqIC4uLlxuICpcbiAqXG4gKiB0aGlzLmFwcFZlcnNpb24uZ2V0QXBwTmFtZSgpO1xuICogdGhpcy5hcHBWZXJzaW9uLmdldFBhY2thZ2VOYW1lKCk7XG4gKiB0aGlzLmFwcFZlcnNpb24uZ2V0VmVyc2lvbkNvZGUoKTtcbiAqIHRoaXMuYXBwVmVyc2lvbi5nZXRWZXJzaW9uTnVtYmVyKCk7XG4gKlxuICogYGBgXG4gKi9cbkBQbHVnaW4oe1xuICBwbHVnaW5OYW1lOiAnQXBwVmVyc2lvbicsXG4gIHBsdWdpbjogJ2NvcmRvdmEtcGx1Z2luLWFwcC12ZXJzaW9uJyxcbiAgcGx1Z2luUmVmOiAnY29yZG92YS5nZXRBcHBWZXJzaW9uJyxcbiAgcmVwbzogJ2h0dHBzOi8vZ2l0aHViLmNvbS93aGl0ZW9jdG9iZXIvY29yZG92YS1wbHVnaW4tYXBwLXZlcnNpb24nLFxuICBwbGF0Zm9ybXM6IFsnQW5kcm9pZCcsICdpT1MnLCAnV2luZG93cyddXG59KVxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQXBwVmVyc2lvbiBleHRlbmRzIElvbmljTmF0aXZlUGx1Z2luIHtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgYXBwLCBlLmcuOiBcIk15IEF3ZXNvbWUgQXBwXCJcbiAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn1cbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgZ2V0QXBwTmFtZSgpOiBQcm9taXNlPHN0cmluZz4geyByZXR1cm47IH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcGFja2FnZSBuYW1lIG9mIHRoZSBhcHAsIGUuZy46IFwiY29tLmV4YW1wbGUubXlhd2Vzb21lYXBwXCJcbiAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn1cbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgZ2V0UGFja2FnZU5hbWUoKTogUHJvbWlzZTxzdHJpbmc+IHsgcmV0dXJuOyB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGJ1aWxkIGlkZW50aWZpZXIgb2YgdGhlIGFwcC5cbiAgICogSW4gaU9TIGEgc3RyaW5nIHdpdGggdGhlIGJ1aWxkIHZlcnNpb24gbGlrZSBcIjEuNjA5NVwiXG4gICAqIEluIEFuZHJvaWQgYSBudW1iZXIgZ2VuZXJhdGVkIGZyb20gdGhlIHZlcnNpb24gc3RyaW5nLCBsaWtlIDEwMjAzIGZvciB2ZXJzaW9uIFwiMS4yLjNcIlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmcgfCBudW1iZXI+fVxuICAgKi9cbiAgQENvcmRvdmEoKVxuICBnZXRWZXJzaW9uQ29kZSgpOiBQcm9taXNlPHN0cmluZyB8IG51bWJlcj4geyByZXR1cm47IH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmVyc2lvbiBvZiB0aGUgYXBwLCBlLmcuOiBcIjEuMi4zXCJcbiAgICogQHJldHVybnMge1Byb21pc2U8c3RyaW5nPn1cbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgZ2V0VmVyc2lvbk51bWJlcigpOiBQcm9taXNlPHN0cmluZz4geyByZXR1cm47IH1cblxufVxuIl19