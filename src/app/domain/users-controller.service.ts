import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
