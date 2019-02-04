import { Component, OnInit } from '@angular/core';
import { LoaderService, HelperService } from '../../../shared';
import { Router } from '@angular/router';
import { BaseList } from '../../bases/base-list';
import { InventoryAuditComponent } from '../inventory-audit.component';

@Component({
  selector: 'inventory-audit-list-cmp',
  templateUrl: './inventory-audit-list.component.html'
})
export class InventoryAuditListComponent extends BaseList implements OnInit {


  constructor(public loaderService: LoaderService,
    public helperService: HelperService,
    public router: Router,
    private comp: InventoryAuditComponent
  ) {
    super(loaderService, helperService);
    this.urlApi = '/api/inventory-audit';
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
