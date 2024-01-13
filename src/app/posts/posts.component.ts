import { Component, OnInit } from '@angular/core';
import { CacheService } from 'rxjs-cache-service';
import { PostsService } from './posts.service';
import { Post } from './types/post.type';
import { map } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  public posts: Post[];
  public activePost: Post | null = null;
  public activePostId: number | null = null;

  constructor(
    private _postsService: PostsService,
    private _cacheService: CacheService,
  ) {}

  ngOnInit() {
    this.fetchPosts();
  }

  public fetchPosts() {
    this._postsService
      .getPosts()
      .pipe(map((posts) => posts.filter((_, index) => index < 10)))
      .subscribe({
        next: (res) => (this.posts = res),
        error: (e) => alert('error: ' + JSON.stringify(e)),
      });
  }

  public resetCache() {
    this._cacheService.resetCache();
  }
}
