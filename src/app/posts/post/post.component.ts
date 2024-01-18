import {Component, OnInit} from "@angular/core";
import {PostsService} from "../posts.service";
import {ActivatedRoute} from "@angular/router";
import {Post} from "../../core/types/post.type";
import {getAuthorImageLink, getAuthorName} from "../../core/utils/get-author-info";
import {capitalizeFirstLetter} from "../../core/utils/capitalize-first-letter";

@Component({
   selector: "app-post",
   templateUrl: "./post.component.html",
})
export class PostComponent implements OnInit {
   protected readonly getAuthorImageLink = getAuthorImageLink;
   protected readonly getAuthorName = getAuthorName;
   protected readonly capitalizeFirstLetter = capitalizeFirstLetter;
   public config = `<span><span class="text-primary">config</span> = { refresh: <span class="text-[#29ADB2]">false</span>, clearTimeout: <span class="text-[#29ADB2]">30000ms</span> }, also, there's a deliberate 300ms delay.</span>`;
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
