import { Component, OnInit } from '@angular/core';
import {BackendService} from './backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private backendService: BackendService) {}

  ngOnInit() {
    this.backendService.streamFeed();
  }

  refresh() {
    this.backendService.streamFeed();
  }
}
