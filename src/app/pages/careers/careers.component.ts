import { Component, OnInit } from '@angular/core';
import { APPCONFIG } from '../../config';

@Component({
  selector: 'my-page-careers',
  styles: [],
  templateUrl: './careers.component.html'
})

export class PageCareersComponent implements OnInit {
  public AppConfig: any;

  ngOnInit() {
    this.AppConfig = APPCONFIG;
  }
}
