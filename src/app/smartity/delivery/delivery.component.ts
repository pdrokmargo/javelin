import { Component, OnInit } from '@angular/core';
import { Base } from '../bases/base';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html'
})
export class DeliveryComponent extends Base implements OnInit {

  constructor(){
      super();
  }

  ngOnInit() {
  }

}
