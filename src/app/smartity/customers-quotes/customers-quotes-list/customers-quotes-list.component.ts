import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import "rxjs/add/operator/startWith";
import { LoaderService, HelperService } from '../../../shared';
import { CustomersQuotesComponent } from '../customers-quotes.component';
import { BaseList } from '../../bases/base-list';

@Component({
  selector: 'customers-quotes-list-cmp',
  templateUrl: './customers-quotes-list.component.html'
})
export class CustomersQuotesListComponent  extends BaseList implements OnInit {

  constructor(
    public router: Router,
    public loaderService: LoaderService,
    public helperService: HelperService,
    private comp: CustomersQuotesComponent
  ) {
    super(loaderService, helperService);
    this.urlApi = '/api/customers-quotes';
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
