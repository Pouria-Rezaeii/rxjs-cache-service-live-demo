import {Component, OnInit} from "@angular/core";
import {CacheService} from "rxjs-cache-service";
import {PostsService} from "./posts.service";
import {Post} from "./types/post.type";
import {getAuthorImageLink, getAuthorName} from "../core/utils/get-author-info";
import {ActivatedRoute} from "@angular/router";
import {DEFAULT_PAGE_SIZE} from "../core/constants/default-page-size";

@Component({
   selector: "app-posts",
   templateUrl: "./posts.component.html",
})
export class PostsComponent implements OnInit {
   protected readonly getAuthorImageLink = getAuthorImageLink;
   protected readonly getAuthorName = getAuthorName;
   public posts: Post[];

   constructor(
      private _postsService: PostsService,
      private _cacheService: CacheService,
      private _activatedRoute: ActivatedRoute
   ) {}

   ngOnInit() {
      this._activatedRoute.queryParams.subscribe(() => this.fetchPosts());
   }

   public fetchPosts() {
      const qp = this._activatedRoute.snapshot.queryParams;
      const page = qp["_page"] || 1;
      const limit = qp["_limit"] || DEFAULT_PAGE_SIZE;

      this._postsService
         .getPosts({
            start: (+page - 1) * +limit,
            limit: limit,
            userId: qp["userId"],
         })
         .subscribe({
            next: (res) => (this.posts = res),
            error: (e) => alert("An error occurred while fetching posts."),
         });
   }
}
