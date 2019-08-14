import { Component, OnInit } from '@angular/core';
import { Base } from '../bases/base';

@Component({
  selector: 'app-customers-quotes',
  templateUrl: './customers-quotes.component.html'
})
export class CustomersQuotesComponent extends Base implements  OnInit{

  constructor(){
      super();
  }

  ngOnInit() {
  }

}
