import {Component} from "@angular/core";
import {ResponseCache} from "rxjs-response-cache";
import {inject as injectVercelAnalyticsScript} from "@vercel/analytics";
@Component({
   selector: "app-root",
   templateUrl: "./app.component.html",
})
export class AppComponent {
   constructor(private _cacheService: ResponseCache) {
      injectVercelAnalyticsScript();
      // accessing the cache to help early initialization
      const cachedData = this._cacheService.data;
   }
}
