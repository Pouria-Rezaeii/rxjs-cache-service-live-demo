import {Component, OnInit} from "@angular/core";
import {CacheService} from "rxjs-cache-service";
import {PostsService} from "./posts.service";
import {Post} from "../core/types/post.type";
import {getAuthorImageLink, getAuthorName, getAuthors} from "../core/utils/get-author-info";
import {ActivatedRoute, Router} from "@angular/router";
import {DEFAULT_PAGE_SIZE} from "../core/constants/default-page-size";
import {capitalizeFirstLetter} from "../core/utils/capitalize-first-letter";

@Component({
   selector: "app-posts",
   templateUrl: "./posts.component.html",
})
export class PostsComponent implements OnInit {
   protected readonly getAuthorImageLink = getAuthorImageLink;
   protected readonly getAuthorName = getAuthorName;
   protected readonly capitalizeFirstLetter = capitalizeFirstLetter;
   public config = `<span><span class="text-primary">config</span> = { refresh: <span class="text-[#29ADB2]">true</span> }, also, there's a deliberate 300ms delay.</span>`;
   public posts: Post[];
   public selectedAuthor: number | null = null;
   public authors = getAuthors();
   public isLoading: boolean;
   public error: boolean;

   constructor(
      private _postsService: PostsService,
      private _cacheService: CacheService,
      private _activatedRoute: ActivatedRoute,
      private _router: Router
   ) {}

   ngOnInit() {
      this._activatedRoute.queryParams.subscribe((params) => {
         this.isLoading = true;
         this.error = false;
         params["userId"] && (this.selectedAuthor = +params["userId"]);
         this.fetchPosts();
      });
   }

   public fetchPosts() {
      const qp = this._activatedRoute.snapshot.queryParams;
      const page = qp["_page"] || 1;
      const limit = qp["_limit"] || DEFAULT_PAGE_SIZE;

      this._postsService
         .getPosts({
            start: (+page - 1) * +limit,
            limit: limit,
            userId: qp["userId"] && +qp["userId"],
         })
         .subscribe({
            next: (res) => {
               this.posts = res;
               this.isLoading = false;
            },
            error: () => {
               this.error = true;
               this.isLoading = false;
            },
         });
   }

   public authorChange(author: (typeof this.authors)[number]) {
      this.selectedAuthor = author ? author.userId : null;
      this._router.navigate([], {
         queryParams: {_page: 1, userId: author ? author.userId : null},
         queryParamsHandling: "merge",
      });
   }
}
