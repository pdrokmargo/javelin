import { Component, OnInit } from '@angular/core';
import { Base } from '../bases/base';

@Component({
  selector: 'app-customers-billing',
  templateUrl: './customers-billing.component.html',
  styles: []
})
export class CustomersBillingComponent extends Base implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
