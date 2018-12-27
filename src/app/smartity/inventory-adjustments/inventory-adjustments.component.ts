import { Component, OnInit } from '@angular/core';
import { Base } from '../bases/base';

@Component({
  selector: 'app-inventory-adjustments',
  templateUrl: './inventory-adjustments.component.html'
})
export class InventoryAdjustmentsComponent extends Base implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}
