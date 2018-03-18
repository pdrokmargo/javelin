import { Component, OnInit } from '@angular/core';
import { APPCONFIG } from '../../config';

@Component({
  selector: 'my-page-lock-screen',
  styles: [],
  templateUrl: './lock-screen.component.html'
})

export class PageLockScreenComponent implements OnInit {
  public AppConfig: any;

  ngOnInit() {
    this.AppConfig = APPCONFIG;
  }
}
