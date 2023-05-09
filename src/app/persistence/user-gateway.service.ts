import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API_URL } from './config';
import { Observable, map } from 'rxjs';
import { User } from '../entities/Users';

@Injectable({
  providedIn: 'root',
})
export class UserGatewayService {
  private API_URL_USER = API_URL + 'users';

  constructor(private http: HttpClient) {}

  getUserByPost(): Observable<User> {
    return this.http.get<User>(this.API_URL_USER).pipe(
      map((user: User) => {
        return { id: user.id, name: user.name };
      })
    );
  }
}
