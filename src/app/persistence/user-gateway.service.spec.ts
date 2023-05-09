import { TestBed } from '@angular/core/testing';

import { UserGatewayService } from './user-gateway.service';

describe('UserGatewayService', () => {
  let service: UserGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserGatewayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
