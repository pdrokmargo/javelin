import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseList } from '../../bases/base-list';
import { LoaderService, HelperService } from '../../../shared';
import { BillingComponent } from '../billing.component';

@Component({
  selector: 'billing-list-cmp',
  templateUrl: './billing-list.component.html'
})
export class BillingListComponent extends BaseList implements OnInit {

  constructor(public loaderService: LoaderService,
    public helperService: HelperService,
    public router: Router,
    private comp: BillingComponent) {
    super(loaderService, helperService);
    this.urlApi = '/api/billing';
}

ngOnInit() {
  this.getAll();
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
