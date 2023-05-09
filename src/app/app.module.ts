import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './presentation/views/home/home.component';
import { PaginationComponent } from './presentation/components/home/pagination/pagination.component';
import { PostsTableComponent } from './presentation/components/home/posts-table/posts-table.component';
import { PostComponent } from './presentation/views/post/post.component';
import { FormComponent } from './presentation/components/post/form/form.component';
import { AuthorPipe } from './presentation/pipes/author.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PaginationComponent,
    PostsTableComponent,
    PostComponent,
    FormComponent,
    AuthorPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
