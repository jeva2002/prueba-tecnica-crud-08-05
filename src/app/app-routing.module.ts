import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './presentation/views/home/home.component';
import { PostComponent } from './presentation/views/post/post.component';

const routes: Routes = [
  {
    path: 'modificar-publicacion/:postId',
    component: PostComponent,
    title: 'Modificar',
  },
  {
    path: 'nueva-publicacion',
    component: PostComponent,
    title: 'Publicar',
  },
  {
    path: 'lista-productos/:page',
    component: HomeComponent,
    title: 'Lista de publicaciones',
  },
  {
    path: '',
    redirectTo: 'lista-productos/1',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
