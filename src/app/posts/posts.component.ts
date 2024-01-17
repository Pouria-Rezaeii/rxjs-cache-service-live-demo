import {Component, OnInit} from "@angular/core";
import {CacheService} from "rxjs-cache-service";
import {PostsService} from "./posts.service";
import {Post} from "./types/post.type";
import {getAuthorImageLink, getAuthorName} from "../core/utils/get-author-info";

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
      private _cacheService: CacheService
   ) {}

   ngOnInit() {
      this.fetchPosts();
   }

   public fetchPosts() {
      this._postsService.getPosts().subscribe({
         next: (res) => (this.posts = res),
         error: (e) => alert("An error occurred while fetching posts."),
      });
   }
}
