import {Component} from "@angular/core";
import {CacheService} from "rxjs-cache-service";
import {outerLinks} from "./core/constants/outer-links";

@Component({
   selector: "app-root",
   templateUrl: "./app.component.html",
})
export class AppComponent {
   constructor(private _cacheService: CacheService) {
      const cachedData = this._cacheService.cachedData;
   }

   protected readonly outerLinks = outerLinks;
}
