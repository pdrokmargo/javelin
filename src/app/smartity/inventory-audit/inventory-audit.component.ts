import { Component, OnInit } from '@angular/core';
import { Base } from '../bases/base';

@Component({
  selector: 'app-inventory-audit',
  templateUrl: './inventory-audit.component.html'
})
export class InventoryAuditComponent extends  Base implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
