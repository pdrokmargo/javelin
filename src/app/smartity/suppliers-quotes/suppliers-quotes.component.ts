import { Component, OnInit } from '@angular/core';
import { Base } from '../bases/base';

@Component({
  selector: 'app-suppliers-quotes',
  templateUrl: './suppliers-quotes.component.html',
  styles: []
})
export class SuppliersQuotesComponent extends Base implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}