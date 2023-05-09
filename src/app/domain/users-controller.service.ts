import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../entities/Users';
import { UserGatewayService } from '../persistence/user-gateway.service';

@Injectable({
  providedIn: 'root',
})
export class UsersControllerService {
  private users$: Observable<User[]> | undefined;

  constructor(private usersGateway: UserGatewayService) {}

  public getAllUsers(): Observable<User[]> {
    if (!this.users$) this.users$ = this.usersGateway.getAllUsers();
    return this.users$;
  }

  public getUserById(id: number): Observable<User | undefined> | undefined {
    return this.users$?.pipe(
      map((users) => {
        return users.find((user) => user.id === id);
      })
    );
  }
}
