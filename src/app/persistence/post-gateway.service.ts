import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API_URL } from './config';
import { Observable } from 'rxjs';
import { Posts } from '../entities/Posts';

@Injectable({
  providedIn: 'root',
})
export class PostGatewayService {
  private API_URL_USER = API_URL + 'users';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Posts> {
    return this.http.get<Posts>(this.API_URL_USER);
  }
}
