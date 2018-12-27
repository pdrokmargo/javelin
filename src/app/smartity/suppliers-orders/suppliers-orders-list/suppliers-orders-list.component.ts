import { Component, OnInit } from '@angular/core';
import { BaseList } from '../../bases/base-list';
import "rxjs/add/operator/startWith";
import { Router } from '@angular/router';
import { LoaderService, HelperService } from '../../../shared';
import { SuppliersOrdersComponent } from '../suppliers-orders.component';

@Component({
  selector: 'suppliers-orders-list-cmp',
  templateUrl: './suppliers-orders-list.component.html',
  styles: []
})
export class SuppliersOrdersListComponent extends BaseList implements OnInit {

  constructor(
    public router: Router,
    public loaderService: LoaderService,
    public helperService: HelperService,
    private comp: SuppliersOrdersComponent
  ) {
    super(loaderService, helperService);
    this.urlApi = '/api/suppliers-orders';
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