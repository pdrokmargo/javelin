import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseList } from '../../bases/base-list';
import { LoaderService, HelperService } from '../../../shared';
import { InventoryMovementsOutComponent } from '../inventory-movements-out.component';

@Component({
  selector: 'inventory-movements-out-list-cmp',
  templateUrl: './inventory-movements-out-list.component.html'
})
export class InventoryMovementsOutListComponent extends BaseList implements OnInit {

  constructor(public loaderService: LoaderService,
    public helperService: HelperService,
    public router: Router,
    private comp: InventoryMovementsOutComponent) {
    super(loaderService, helperService);
    this.urlApi = '/api/inventory-movements';
}

ngOnInit() {
  this.getAll('&inventory_movement_type=2');
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
