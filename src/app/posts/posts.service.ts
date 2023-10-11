import { Injectable } from '@angular/core';
import { CacheService } from 'rxjs-cache-service';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, map } from 'rxjs';
import { Post } from './types/post.type';

@Injectable()
export class PostsService {
  constructor(private _httpClient: HttpClient, private _cache: CacheService) {}

  public getPosts() {
    return this._cache.get<Observable<Post[]>>({
      url: 'https://jsonplaceholder.typicode.com/posts',
      observable: (url) => this._httpClient.get<Post[]>(url).pipe(delay(800)),
      refresh: true,
      clearTime: 30000,
    });
  }

  public getSinglePost(id: number) {
    return this._cache.get<Observable<Post>>({
      url: `https://jsonplaceholder.typicode.com/posts/${id}`,
      observable: (url) => this._httpClient.get(url).pipe(delay(800)),
    });
  }
}
