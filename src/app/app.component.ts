import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, startWith, map, switchMap } from 'rxjs/operators';
import { timer } from 'rxjs/observable/timer';
import { of } from 'rxjs/observable/of';

import {SomeService} from './some.service';
import {Person} from './person';
import {ContentState} from './states';

const REFRESH_INTERVAL_MS = 5 * 100;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private someService: SomeService) {}

  title = 'app';

  people$: Observable<Person[]>;
  contentStatus$: Observable<string>;
  count$: Observable<number>;

  ngOnInit() {
    this.refresh();
  }

  updateData() {
    const source = timer(0, REFRESH_INTERVAL_MS);

    this.people$ = source.pipe(
      switchMap(_ => this.someService.getData()),
      map(people => people)
    );
  }

  refresh() {
    this.updateData();
    this.observeData();
    this.getCount();
  }

  getCount() {
    this.count$ = this.people$.pipe(
      map(_ => {
        // some additional complex computation here. i.e, reduce, scan, etc.
        return 1;
      })
    );
  }

  observeData() {
    this.contentStatus$ = this.people$.pipe(
      map(_ => ContentState.READY),
      catchError(_ => of(ContentState.ERROR)),
      startWith(ContentState.LOADING)
    );
  }
}
