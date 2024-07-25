import { TestBed } from '@angular/core/testing';

import { NetworkAdminService } from './network-admin.service';

describe('NetworkAdminService', () => {
  let service: NetworkAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
