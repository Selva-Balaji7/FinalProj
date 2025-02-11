import { TestBed } from '@angular/core/testing';

import { DbservicesService } from './db-service.service';

describe('DbservicesService', () => {
  let service: DbservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});