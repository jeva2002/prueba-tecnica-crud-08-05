import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { UserGatewayService } from './user-gateway.service';
import { User } from '../entities/Users';

describe('UserGatewayService', () => {
  let userService: UserGatewayService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserGatewayService],
    });
    userService = TestBed.inject(UserGatewayService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  describe('test for get users', () => {
    it('should get the users', (doneFn) => {
      const mockData: User[] = [
        {
          id: 1,
          name: 'Juanito',
        },
        {
          id: 2,
          name: 'Jorge',
        },
      ];

      userService.getAllUsers().subscribe((data) => {
        expect(data.length).toEqual(mockData.length);

        doneFn();
      });

      const req = httpController.expectOne(userService.API_URL_USER);
      req.flush(mockData);
      httpController.verify();
    });
  });
});
