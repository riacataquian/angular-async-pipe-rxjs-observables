import { Component, OnInit, Input } from '@angular/core';
import { ContentState } from '../states';

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.css'],
})
export class ListContainerComponent implements OnInit {
  @Input() contentStatus: string;

  constructor() { }

  states = ContentState;

  ngOnInit() {
  }

}
