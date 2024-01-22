import {Component} from "@angular/core";
import {CacheService} from "rxjs-cache-service";
import {inject as injectVercelAnalyticsScript} from "@vercel/analytics";
@Component({
   selector: "app-root",
   templateUrl: "./app.component.html",
})
export class AppComponent {
   constructor(private _cacheService: CacheService) {
      injectVercelAnalyticsScript();
      // accessing the cache to help early initialization
      const cachedData = this._cacheService.cachedData;
   }
}
