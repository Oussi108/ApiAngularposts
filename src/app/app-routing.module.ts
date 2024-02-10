import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListScreenComponent } from './list-screen/list-screen.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: ListScreenComponent },
  { path: 'detail/:id', component: PostDetailComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
