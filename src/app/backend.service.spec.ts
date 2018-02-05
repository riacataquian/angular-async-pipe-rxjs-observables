import { TestBed, inject } from '@angular/core/testing';

import { BackendService } from './backend.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('BackendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        BackendService,
      ]
    });
  });

  it('should be created', inject([BackendService, HttpClientModule], (service: BackendService) => {
    expect(service).toBeTruthy();
  }));
});
