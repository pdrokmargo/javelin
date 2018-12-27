import { Component, OnInit } from '@angular/core';
import { Base } from '../bases/base';

@Component({
  selector: 'app-suppliers-orders',
  templateUrl: './suppliers-orders.component.html',
  styles: []
})
export class SuppliersOrdersComponent extends Base implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}