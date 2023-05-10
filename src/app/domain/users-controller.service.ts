import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../entities/Users';
import { UserGatewayService } from '../persistence/user-gateway.service';

@Injectable({
  providedIn: 'root',
})
export class UsersControllerService {
  private users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(private usersGateway: UserGatewayService) {}

  public getAllUsers(): BehaviorSubject<User[]> {
    if (!this.users$.value.length) {
      this.usersGateway.getAllUsers().subscribe((users) => {
        this.users$.next([...users]);
      });
    }
    return this.users$;
  }

  public getUserById(id: number): User | undefined {
    return this.users$.getValue().find((user) => user.id === id);
  }
}
