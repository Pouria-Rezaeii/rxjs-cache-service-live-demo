import {Component} from "@angular/core";
import {outerLinks} from "../../constants/outer-links";

@Component({
   selector: "app-footer",
   templateUrl: "./footer.component.html",
})
export class FooterComponent {
   protected readonly outerLinks = outerLinks;
}
