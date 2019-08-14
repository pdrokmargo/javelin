import { Component, OnInit } from '@angular/core';
import { Base } from '../bases/base';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html'
})
export class BillingComponent extends Base implements  OnInit{

  constructor(){
      super();
  }

  ngOnInit() {
  }

}
