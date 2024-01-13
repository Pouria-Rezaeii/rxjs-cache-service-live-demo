import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CacheService } from 'rxjs-cache-service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PostComponent } from './posts/post/post.component';
import { PostsComponent } from './posts/posts.component';
import { HomeComponent } from './home/home.component';
import { PostsService } from './posts/posts.service';
import { HttpClientInterceptor } from './services/middlewares/http-client-interceptor';

export function cacheServiceFactory() {
  return new CacheService({
    isDevMode: true,
    devtool: {
      show: true,
      isOpenInitially: true,
    },
  });
}

@NgModule({
  declarations: [AppComponent, HomeComponent, PostComponent, PostsComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true,
    },
    {
      provide: CacheService,
      useFactory: cacheServiceFactory,
    },
    PostsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}