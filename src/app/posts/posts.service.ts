import {Injectable} from "@angular/core";
import {CacheService} from "rxjs-cache-service";
import {HttpClient} from "@angular/common/http";
import {Post} from "../core/types/post.type";
import {delay, map} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {DEFAULT_PAGE_SIZE} from "../core/constants/default-page-size";

@Injectable()
export class PostsService {
   constructor(
      private _httpClient: HttpClient,
      private _cache: CacheService,
      private _activatedRoute: ActivatedRoute
   ) {}

   public getPosts(params: {start?: number; limit?: number; userId?: number}) {
      const {start, limit, userId} = params;

      return this._cache.get<Post[]>({
         url: "posts",
         defaultParams: {_start: 0, _limit: DEFAULT_PAGE_SIZE, _sort: "title"},
         params: {_start: start, _limit: limit, userId: userId},
         observable: ({arrangedUrl}) => this._httpClient.get<Post[]>(arrangedUrl).pipe(delay(300)),
         refresh: true,
      });
   }

   public getSinglePost(id: number) {
      return this._cache.get<Post>({
         url: `posts/${id}`,
         observable: ({arrangedUrl}) => this._httpClient.get<Post>(arrangedUrl).pipe(delay(300)),
         clearTimeout: 30000,
      });
   }
}
