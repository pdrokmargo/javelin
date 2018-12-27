import { Component, OnInit } from '@angular/core';
import { Base } from '../bases/base';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html'
})
export class StocksComponent extends Base implements OnInit {

  constructor() {
    super();
   }

  ngOnInit() {
  }

}
