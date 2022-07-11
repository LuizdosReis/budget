import { TestBed } from '@angular/core/testing';

import { DashboardApiService } from './dashboard-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DashboardApiService', () => {
  let service: DashboardApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(DashboardApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
