import { Pipe, PipeTransform } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { UsersControllerService } from 'src/app/domain/users-controller.service';

@Pipe({
  name: 'author',
})
export class AuthorPipe implements PipeTransform {
  private username: string = '';

  constructor(private userController: UsersControllerService) {}

  transform(id: number): Observable<string | number> {
    return (
      this.userController
        .getUserById(id)
        ?.pipe(map((user) => user?.name ?? id)) ?? of(id)
    );
  }
}
