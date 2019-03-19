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
import { Injectable } from '@angular/core';
import { IonicNativePlugin, cordova } from '@ionic-native/core';
var AppVersion = /** @class */ (function (_super) {
    __extends(AppVersion, _super);
    function AppVersion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppVersion.prototype.getAppName = function () { return cordova(this, "getAppName", {}, arguments); };
    AppVersion.prototype.getPackageName = function () { return cordova(this, "getPackageName", {}, arguments); };
    AppVersion.prototype.getVersionCode = function () { return cordova(this, "getVersionCode", {}, arguments); };
    AppVersion.prototype.getVersionNumber = function () { return cordova(this, "getVersionNumber", {}, arguments); };
    AppVersion.pluginName = "AppVersion";
    AppVersion.plugin = "cordova-plugin-app-version";
    AppVersion.pluginRef = "cordova.getAppVersion";
    AppVersion.repo = "https://github.com/whiteoctober/cordova-plugin-app-version";
    AppVersion.platforms = ["Android", "iOS", "Windows"];
    AppVersion = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], AppVersion);
    return AppVersion;
}(IonicNativePlugin));
export { AppVersion };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL2FwcC12ZXJzaW9uL25neC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLDhCQUFzQyxNQUFNLG9CQUFvQixDQUFDOztJQW9DeEMsOEJBQWlCOzs7O0lBTy9DLCtCQUFVO0lBT1YsbUNBQWM7SUFTZCxtQ0FBYztJQU9kLHFDQUFnQjs7Ozs7O0lBOUJMLFVBQVU7UUFIdEIsVUFBVSxDQUFDO1lBQ1YsVUFBVSxFQUFFLE1BQU07U0FDbkIsQ0FBQztPQUNXLFVBQVU7cUJBckN2QjtFQXFDZ0MsaUJBQWlCO1NBQXBDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb3Jkb3ZhLCBJb25pY05hdGl2ZVBsdWdpbiwgUGx1Z2luIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9jb3JlJztcblxuXG4vKipcbiAqIEBuYW1lIEFwcCBWZXJzaW9uXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJlYWRzIHRoZSB2ZXJzaW9uIG9mIHlvdXIgYXBwIGZyb20gdGhlIHRhcmdldCBidWlsZCBzZXR0aW5ncy5cbiAqXG4gKiBSZXF1aXJlcyBDb3Jkb3ZhIHBsdWdpbjogYGNvcmRvdmEtcGx1Z2luLWFwcC12ZXJzaW9uYC4gRm9yIG1vcmUgaW5mbywgcGxlYXNlIHNlZSB0aGUgW0NvcmRvdmEgQXBwIFZlcnNpb24gZG9jc10oaHR0cHM6Ly9naXRodWIuY29tL3doaXRlb2N0b2Jlci9jb3Jkb3ZhLXBsdWdpbi1hcHAtdmVyc2lvbikuXG4gKlxuICogQHVzYWdlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBBcHBWZXJzaW9uIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9hcHAtdmVyc2lvbi9uZ3gnO1xuICpcbiAqIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBwVmVyc2lvbjogQXBwVmVyc2lvbikgeyB9XG4gKlxuICogLi4uXG4gKlxuICpcbiAqIHRoaXMuYXBwVmVyc2lvbi5nZXRBcHBOYW1lKCk7XG4gKiB0aGlzLmFwcFZlcnNpb24uZ2V0UGFja2FnZU5hbWUoKTtcbiAqIHRoaXMuYXBwVmVyc2lvbi5nZXRWZXJzaW9uQ29kZSgpO1xuICogdGhpcy5hcHBWZXJzaW9uLmdldFZlcnNpb25OdW1iZXIoKTtcbiAqXG4gKiBgYGBcbiAqL1xuQFBsdWdpbih7XG4gIHBsdWdpbk5hbWU6ICdBcHBWZXJzaW9uJyxcbiAgcGx1Z2luOiAnY29yZG92YS1wbHVnaW4tYXBwLXZlcnNpb24nLFxuICBwbHVnaW5SZWY6ICdjb3Jkb3ZhLmdldEFwcFZlcnNpb24nLFxuICByZXBvOiAnaHR0cHM6Ly9naXRodWIuY29tL3doaXRlb2N0b2Jlci9jb3Jkb3ZhLXBsdWdpbi1hcHAtdmVyc2lvbicsXG4gIHBsYXRmb3JtczogWydBbmRyb2lkJywgJ2lPUycsICdXaW5kb3dzJ11cbn0pXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBcHBWZXJzaW9uIGV4dGVuZHMgSW9uaWNOYXRpdmVQbHVnaW4ge1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSBhcHAsIGUuZy46IFwiTXkgQXdlc29tZSBBcHBcIlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmc+fVxuICAgKi9cbiAgQENvcmRvdmEoKVxuICBnZXRBcHBOYW1lKCk6IFByb21pc2U8c3RyaW5nPiB7IHJldHVybjsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBwYWNrYWdlIG5hbWUgb2YgdGhlIGFwcCwgZS5nLjogXCJjb20uZXhhbXBsZS5teWF3ZXNvbWVhcHBcIlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmc+fVxuICAgKi9cbiAgQENvcmRvdmEoKVxuICBnZXRQYWNrYWdlTmFtZSgpOiBQcm9taXNlPHN0cmluZz4geyByZXR1cm47IH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgYnVpbGQgaWRlbnRpZmllciBvZiB0aGUgYXBwLlxuICAgKiBJbiBpT1MgYSBzdHJpbmcgd2l0aCB0aGUgYnVpbGQgdmVyc2lvbiBsaWtlIFwiMS42MDk1XCJcbiAgICogSW4gQW5kcm9pZCBhIG51bWJlciBnZW5lcmF0ZWQgZnJvbSB0aGUgdmVyc2lvbiBzdHJpbmcsIGxpa2UgMTAyMDMgZm9yIHZlcnNpb24gXCIxLjIuM1wiXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZyB8IG51bWJlcj59XG4gICAqL1xuICBAQ29yZG92YSgpXG4gIGdldFZlcnNpb25Db2RlKCk6IFByb21pc2U8c3RyaW5nIHwgbnVtYmVyPiB7IHJldHVybjsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2ZXJzaW9uIG9mIHRoZSBhcHAsIGUuZy46IFwiMS4yLjNcIlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmc+fVxuICAgKi9cbiAgQENvcmRvdmEoKVxuICBnZXRWZXJzaW9uTnVtYmVyKCk6IFByb21pc2U8c3RyaW5nPiB7IHJldHVybjsgfVxuXG59XG4iXX0=