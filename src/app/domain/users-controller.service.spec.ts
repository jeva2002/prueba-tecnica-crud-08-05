import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { UsersControllerService } from './users-controller.service';
import { UserGatewayService } from '../persistence/user-gateway.service';
import { createUserMock } from '../entities/Users.mock';

fdescribe('UsersControllerService', () => {
  let userControllerService: UsersControllerService;
  let userGatewayService: jasmine.SpyObj<UserGatewayService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('UserGatewayService', ['getAllUsers']);

    TestBed.configureTestingModule({
      providers: [
        UsersControllerService,
        { provide: UserGatewayService, useValue: spy },
      ],
    });

    userControllerService = TestBed.inject(UsersControllerService);
    userGatewayService = TestBed.inject(
      UserGatewayService
    ) as jasmine.SpyObj<UserGatewayService>;
  });

  it('should be created', () => {
    expect(userControllerService).toBeTruthy();
  });

  describe('getAllusers', () => {
    it('should return all the users', (doneFn) => {
      const usersMock = createUserMock(2);

      userGatewayService.getAllUsers.and.returnValue(of([...usersMock]));

      userControllerService.getAllUsers().subscribe((users) => {
        expect(users.length).toBe(usersMock.length);
        doneFn();
      });
    });
  });
});
