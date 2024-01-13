import {Injectable} from '@angular/core';
import {CacheService} from 'rxjs-cache-service';
import {HttpClient} from '@angular/common/http';
import {Post} from './types/post.type';
import {delay} from 'rxjs';

@Injectable()
export class PostsService {
   constructor(
      private _httpClient: HttpClient,
      private _cache: CacheService
   ) {}

   public getPosts() {
      return this._cache.get<Post[]>({
         uniqueIdentifier: 'json placeholder',
         url: 'posts',
         observable: ({arrangedUrl}) => this._httpClient.get<Post[]>(arrangedUrl).pipe(delay(500)),
         refresh: true,
      });
   }

   public getSinglePost(id: number) {
      return this._cache.get<Post>({
         url: `posts/${id}`,
         observable: ({arrangedUrl}) => this._httpClient.get<Post>(arrangedUrl).pipe(delay(500)),
         clearTimeout: 30000,
      });
   }
}
