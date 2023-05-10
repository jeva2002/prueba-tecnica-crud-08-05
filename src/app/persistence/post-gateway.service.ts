import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API_URL, HEADERS } from './config';
import { Observable, retry } from 'rxjs';
import { Post, NewPostDTO } from '../entities/Posts';

@Injectable({
  providedIn: 'root',
})
export class PostGatewayService {
  API_URL_POSTS = API_URL + 'posts';

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.API_URL_POSTS).pipe(retry(2));
  }

  addPost(post: NewPostDTO): Observable<Post> {
    return this.http
      .post<Post>(this.API_URL_POSTS, post, {
        headers: HEADERS,
      })
      .pipe(retry(2));
  }

  updatePost(post: Post): Observable<Post> {
    return this.http
      .put<Post>(this.API_URL_POSTS + '/' + post.id, post, {
        headers: HEADERS,
      })
      .pipe(retry(2));
  }

  deletePost(id: number): Observable<void> {
    return this.http
      .delete<void>(this.API_URL_POSTS + '/' + `${id}`)
      .pipe(retry(2));
  }
}
