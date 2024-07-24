import { TestBed } from '@angular/core/testing';

import { AuthGuardDeveloperService } from './auth-guard-developer.service';

describe('AuthGuardDeveloperService', () => {
  let service: AuthGuardDeveloperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardDeveloperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
