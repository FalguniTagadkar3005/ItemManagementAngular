import { TestBed } from '@angular/core/testing';

import { AuthGuardNetworkAdminService } from './auth-guard-network-admin.service';

describe('AuthGuardNetworkAdminService', () => {
  let service: AuthGuardNetworkAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardNetworkAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
