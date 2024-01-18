import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {CacheService} from "rxjs-cache-service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {PostComponent} from "./posts/post/post.component";
import {PostsComponent} from "./posts/posts.component";
import {HomeComponent} from "./home/home.component";
import {PostsService} from "./posts/posts.service";
import {HttpClientInterceptor} from "./core/middlewares/http-client-interceptor";
import {NotFoundComponent} from "./not-found/not-found.component";
import {PaginationComponent} from "./core/components/pagination/pagination.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";
import {RectangleSkeletonComponent} from "./core/components/rectangle-skeleton/rectangle-skeleton.component";
import {HeaderComponent} from "./core/components/header/header.component";
import {FooterComponent} from "./core/components/footer/footer.component";

export function cacheServiceFactory() {
   return new CacheService({
      isDevMode: true,
      devtool: {
         show: true,
         isOpenInitially: false,
      },
   });
}

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      PostComponent,
      PostsComponent,
      NotFoundComponent,
      PaginationComponent,
      RectangleSkeletonComponent,
      HeaderComponent,
      FooterComponent,
   ],
   imports: [
      CommonModule,
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      HttpClientModule,
      NgSelectModule,
      FormsModule,
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
