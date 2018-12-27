import { Component, OnInit } from '@angular/core';
import { Base } from '../bases/base';

@Component({
  selector: 'app-inventory-movements-out',
  templateUrl: './inventory-movements-out.component.html'
})
export class InventoryMovementsOutComponent extends Base implements  OnInit{

  constructor(){
      super();
  }

  ngOnInit() {
  }

}
