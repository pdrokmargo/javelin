import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseList } from '../../bases/base-list';
import { LoaderService, HelperService } from '../../../shared';
import { InventoryAdjustmentsComponent } from '../inventory-adjustments.component';

@Component({
  selector: 'inventory-adjustments-list-cmp',
  templateUrl: './inventory-adjustments-list.component.html'
})
export class InventoryAdjustmentsListComponent extends BaseList implements OnInit {

  constructor(public loaderService: LoaderService,
    public helperService: HelperService,
    public router: Router,
    private comp: InventoryAdjustmentsComponent
  ) {

    super(loaderService, helperService);
    this.urlApi = '/api/inventory-adjustments';
  }

  ngOnInit() {
    this.getAll();
  }

  private CUD(action: string, row?: any) {
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
