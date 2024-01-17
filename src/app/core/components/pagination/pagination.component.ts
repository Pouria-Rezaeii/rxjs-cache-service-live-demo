import {Component, Input, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
   selector: "app-pagination",
   templateUrl: "./pagination.component.html",
})
export class PaginationComponent implements OnInit {
   @Input() count = 0;
   @Input() pageSizes = [5, 10, 20, 50];
   @Input() defaultPageSize = this.pageSizes[0];

   public pageItems: number[] = [];
   public activePage = 1;
   public activePageSize = this.defaultPageSize;

   constructor(
      private _router: Router,
      private _activatedRoute: ActivatedRoute
   ) {}

   ngOnInit() {
      this._activatedRoute.queryParams.subscribe((params) => {
         params["_page"] && (this.activePage = Number(params["_page"]));
         params["_limit"] && (this.activePageSize = Number(params["_limit"]));

         const placeholder = Array(Math.ceil(this.count / this.activePageSize));
         this.pageItems = [];
         for (let i = 1; i <= placeholder.length; i++) {
            this.pageItems.push(i);
         }
      });
   }

   public onChangePage(page: number) {
      this.activePage = page;
      this._router.navigate([], {
         queryParams: {_page: page},
         queryParamsHandling: "merge",
      });
   }

   public onChangePageSize(pageSize: number) {
      this.activePage = 1;
      this.activePageSize = pageSize;

      this._router.navigate([], {
         queryParams: {_page: 1, _limit: pageSize},
         queryParamsHandling: "merge",
      });
   }
}
