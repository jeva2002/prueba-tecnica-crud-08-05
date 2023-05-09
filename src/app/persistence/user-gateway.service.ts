import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API_URL } from './config';
import { Observable, map } from 'rxjs';
import { User } from '../entities/Users';

@Injectable({
  providedIn: 'root',
})
export class UserGatewayService {
  API_URL_USER = API_URL + 'users';

  constructor(private http: HttpClient) {}

  getUserByPost(id: number): Observable<User> {
    return this.http.get<User>(this.API_URL_USER + `${id}`).pipe(
      map((user: User) => {
        return { id: user.id, name: user.name };
      })
    );
  }
}
