import { Pipe, PipeTransform } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { UsersControllerService } from 'src/app/domain/users-controller.service';

@Pipe({
  name: 'author',
})
export class AuthorPipe implements PipeTransform {
  private username: string = '';

  constructor(private userController: UsersControllerService) {}

  transform(id: number): string {
    return this.userController.getUserById(id)?.name ?? `${id}`;
  }
}
