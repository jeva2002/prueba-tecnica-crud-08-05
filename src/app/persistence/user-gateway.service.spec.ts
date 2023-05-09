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

  describe('test for get users by id', () => {
    it('should get an user with it has the selected id', (doneFn) => {
      const mockData: User = {
        id: 1,
        name: 'Juanito',
      };

      userService.getUserByPost(mockData.id).subscribe((data) => {
        expect(data).toEqual(mockData);

        doneFn();
      });

      const req = httpController.expectOne(
        userService.API_URL_USER + mockData.id
      );
      req.flush(mockData);
      httpController.verify();
    });
  });
});
