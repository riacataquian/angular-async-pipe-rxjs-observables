import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import {Person} from './person';

@Injectable()
export class SomeService {
  constructor(private http: HttpClient) { }

  testUrl = '/api/people';

  getData(): Observable<Person[]> {
    return this.http.get<Person[]>(this.testUrl)
  }
}
