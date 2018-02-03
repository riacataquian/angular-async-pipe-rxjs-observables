import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ContentState } from '../states';

@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.css']
})
export class FeedCardComponent implements OnInit {
  constructor() { }

  @Input() contentState: Observable<string>;
  states = ContentState;

  ngOnInit() {
  }

}
