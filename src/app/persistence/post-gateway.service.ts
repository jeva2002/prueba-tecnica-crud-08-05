import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API_URL, HEADERS } from './config';
import { Observable } from 'rxjs';
import { Post, NewPostDTO, UpdatedPostDTO } from '../entities/Posts';

@Injectable({
  providedIn: 'root',
})
export class PostGatewayService {
  API_URL_POSTS = API_URL + 'posts';

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.API_URL_POSTS);
  }

  addPost(post: NewPostDTO): Observable<Post> {
    return this.http.post<Post>(this.API_URL_POSTS, post, {
      headers: HEADERS,
    });
  }

  updatePost(post: UpdatedPostDTO): Observable<Post> {
    return this.http.put<Post>(this.API_URL_POSTS + post.id, post, {
      headers: HEADERS,
    });
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(this.API_URL_POSTS + `${id}`);
  }
}
