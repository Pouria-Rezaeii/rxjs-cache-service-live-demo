import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {PostsComponent} from "./posts/posts.component";
import {PostComponent} from "./posts/post/post.component";
import {NotFoundComponent} from "./not-found/not-found.component";

const routes: Routes = [
   {path: "", component: HomeComponent},
   {path: "posts", component: PostsComponent},
   {path: "posts/:id", component: PostComponent},
   {path: "**", pathMatch: "full", component: NotFoundComponent},
];

@NgModule({
   imports: [RouterModule.forRoot(routes, {})],
   exports: [RouterModule],
})
export class AppRoutingModule {}
