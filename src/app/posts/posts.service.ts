import {Injectable} from "@angular/core";
import {ResponseCache} from "rxjs-response-cache";
import {HttpClient} from "@angular/common/http";
import {Post} from "../core/types/post.type";
import {delay} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {DEFAULT_PAGE_SIZE} from "../core/constants/default-page-size";

@Injectable()
export class PostsService {
   constructor(
      private _httpClient: HttpClient,
      private _cache: ResponseCache,
      private _activatedRoute: ActivatedRoute
   ) {}

   public getPosts(params: {start?: number; limit?: number; userId?: number}) {
      const {start, limit, userId} = params;

      return this._cache
         .get<Post[]>({
            url: "posts",
            defaultParams: {_start: 0, _limit: DEFAULT_PAGE_SIZE, _sort: "title"},
            params: {_start: start, _limit: limit, userId: userId},
            observable: ({arrangedUrl}) => this._httpClient.get<Post[]>(arrangedUrl),
            refresh: true,
         })
         .pipe(delay(300));
   }

   public getSinglePost(id: number) {
      return this._cache
         .get<Post>({
            url: `posts/${id}`,
            observable: ({arrangedUrl}) => this._httpClient.get<Post>(arrangedUrl),
            clearTimeout: 30000,
         })
         .pipe(delay(300));
   }
}
