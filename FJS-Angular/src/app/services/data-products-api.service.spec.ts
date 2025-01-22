import { TestBed } from '@angular/core/testing';

import { DataProductsApiService } from './data-products-api.service';

describe('DataProductsApiService', () => {
  let service: DataProductsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataProductsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
