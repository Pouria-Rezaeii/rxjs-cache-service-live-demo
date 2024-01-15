import {Component} from "@angular/core";
import {outerLinks} from "../core/constants/outer-links";

@Component({
   selector: "app-home",
   templateUrl: "./home.component.html",
})
export class HomeComponent {
   protected readonly outerLinks = outerLinks;
}
