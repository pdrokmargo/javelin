import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseList } from '../../bases/base-list';
import { LoaderService, HelperService } from '../../../shared';
import { CustomersQuotesComponent } from '../customers-quotes.component';

@Component({
  selector: 'app-customers-quotes-list',
  templateUrl: './customers-quotes-list.component.html',
  styleUrls: []
})
export class CustomersQuotesListComponent extends BaseList implements OnInit {

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
