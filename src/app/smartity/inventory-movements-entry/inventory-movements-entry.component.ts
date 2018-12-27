import { Component, OnInit } from '@angular/core';
import { Base } from '../bases/base';

@Component({
  selector: 'app-inventory-movements-entry',
  templateUrl: './inventory-movements-entry.component.html'
})
export class InventoryMovementsEntryComponent extends Base implements  OnInit{

  constructor(){
      super();
  }

  ngOnInit() {
  }

}
