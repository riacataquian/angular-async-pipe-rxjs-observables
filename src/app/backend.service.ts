import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// Enables throw method for Observable.
import 'rxjs/add/observable/throw';
import { timer } from 'rxjs/observable/timer';
import { of } from 'rxjs/observable/of';
import {
  catchError,
  shareReplay,
  startWith,
  map,
  switchMap,
} from 'rxjs/operators';

import {ContentState} from './states';
import { Response } from './response';
import { Feed } from './feed';
import { Person } from './person';

/**
 * Periodic refresh interval.
 */
const REFRESH_INTERVAL_MS = 10 * 100;

@Injectable()
export class BackendService {
  constructor(private http: HttpClient) { }

  /**
    * Holds the state of the UI content.
    */
  private _contentState$: Observable<string>;
  private _feed$: Observable<Feed>;
  private _counter$: Observable<number>;

  get state() {
    return this._contentState$;
  }

  get counter() {
    return this._counter$;
  }

  get feed() {
    return this._feed$;
  }

  streamFeed() {
    const source = timer(0, REFRESH_INTERVAL_MS);

    const data$ = source.pipe(
      switchMap((num: number) => {
        // Simulate the scenario in where an error is encountered after 25 timer ticks.
        if (num === 25) {
          const err = new Error("some http? maybe error");
          return Observable.throw(err);
        }

        return this.getResponse(num);
      }),
      catchError(err => {
        // Catch the error before it go through template's AsyncPipe.
        // An AsyncPipe would just through an error eencountered.
        // See:
        // https://github.com/angular/angular/blob/5.2.3/packages/common/src/pipes/async_pipe.ts#L23
        return of(err);
      }),
      // Add this so that multiple AsyncPipes wouldn't cause multiple http calls (in a real world working app).
      shareReplay(1),
    );

    this._contentState$ = data$.pipe(
      map(resp => {
        // Handle error for _contentState$.
        // Intentionally check response type.
        return resp instanceof Error? ContentState.ERROR : ContentState.READY;
      }),
      startWith(ContentState.LOADING),
    );
    this._contentState$.subscribe();

    this._feed$ = data$.pipe(
      map(resp => {
        // Handle error for _feed$.
        // Intentionally check response type.
        if (resp instanceof Error) return {};

        // Infer resp's type.
        const data = resp as Response;
        const people =  data.items;
        const total = people.reduce((acc, next: Person) => {
          return next.dogs + acc;
        }, 0);

        return {
          people,
          total
        };
      }),
    );

    this._counter$ = data$.pipe(
      map((resp: Response) => resp.counter),
    );
  }

  private getResponse(counter: number): Observable<Response> {
    const people = [1, 2, 3, 4, 5].map((n) => {
      return { dogs: n + counter, name: `Human ${counter}` };
    });

    return of({
      items: people,
      counter,
    });
  }
}
