import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseList } from '../../bases/base-list';
import { LoaderService, HelperService } from '../../../shared';
import { InventoryMovementsEntryComponent } from '../inventory-movements-entry.component';

@Component({
  selector: 'inventory-movements-entry-list-cmp',
  templateUrl: './inventory-movements-entry-list.component.html'
})
export class InventoryMovementsEntryListComponent extends BaseList implements OnInit {

  constructor(public loaderService: LoaderService,
    public helperService: HelperService,
    public router: Router,
    private comp: InventoryMovementsEntryComponent) {
    super(loaderService, helperService);
    this.urlApi = '/api/inventory-movements';
}

ngOnInit() {
  this.getAll('&inventory_movement_type=1');
}

private CUD(action:string, row?:any){
  this.comp.strAction = action;
  switch (action) {
      case 'Guardar':
          this.comp.id = undefined;
          break;
      default:
          this.comp.id = row.id;
          break;
  }
  this.comp.openActions();
}

}
