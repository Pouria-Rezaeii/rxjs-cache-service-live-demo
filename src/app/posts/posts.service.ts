import {Injectable} from "@angular/core";
import {CacheService} from "rxjs-cache-service";
import {HttpClient} from "@angular/common/http";
import {Post} from "./types/post.type";
import {delay} from "rxjs";
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
      console.log({start});

      return this._cache.get<Post[]>({
         url: "posts",
         defaultParams: {_start: 0, _limit: DEFAULT_PAGE_SIZE},
         params: {_start: start || 0, _limit: limit || 5, userId: userId as number},
         observable: ({arrangedUrl}) =>
            this._httpClient.get<Post[]>(arrangedUrl, {params: {_sort: "title"}}).pipe(delay(50)),
         refresh: true,
      });
   }

   public getSinglePost(id: number) {
      return this._cache.get<Post>({
         url: `posts/${id}`,
         observable: ({arrangedUrl}) => this._httpClient.get<Post>(arrangedUrl).pipe(delay(50)),
         clearTimeout: 30000,
      });
   }
}
