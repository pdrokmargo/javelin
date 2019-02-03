import { Component, OnInit } from '@angular/core';
import { BaseList } from '../../bases/base-list';
import { Router } from '@angular/router';
import { LoaderService, HelperService } from '../../../shared';
import { CustomersBillingComponent } from '../customers-billing.component';

@Component({
  selector: 'app-customers-billing-list',
  templateUrl: './customers-billing-list.component.html',
  styles: []
})
export class CustomersBillingListComponent extends BaseList implements OnInit {

  constructor(
    public router: Router,
    public loaderService: LoaderService,
    public helperService: HelperService,
    private comp: CustomersBillingComponent
  ) {
    super(loaderService, helperService);
    this.urlApi = '/api/customers-billing';
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
