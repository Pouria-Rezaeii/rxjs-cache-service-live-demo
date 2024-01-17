import {Component, OnInit} from "@angular/core";
import {PostsService} from "../posts.service";
import {ActivatedRoute} from "@angular/router";
import {Post} from "../types/post.type";
import {getAuthorImageLink, getAuthorName} from "../../core/utils/get-author-info";

@Component({
   selector: "app-post",
   templateUrl: "./post.component.html",
})
export class PostComponent implements OnInit {
   protected readonly getAuthorImageLink = getAuthorImageLink;
   protected readonly getAuthorName = getAuthorName;
   public post: Post | null = null;

   constructor(
      private _postsService: PostsService,
      private _activatedRoute: ActivatedRoute
   ) {}

   ngOnInit() {
      this.fetchPost();
   }

   public fetchPost() {
      const id = this._activatedRoute.snapshot.params["id"];
      this._postsService.getSinglePost(id).subscribe((res) => {
         this.post = res;
      });
   }
}
