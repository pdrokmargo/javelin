import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import "rxjs/add/operator/startWith";
import { LoaderService, HelperService } from '../../../shared';
import { SuppliersQuotesComponent } from '../suppliers-quotes.component';
import { Base } from '../../bases/base';
import { BaseList } from '../../bases/base-list';

@Component({
  selector: 'app-suppliers-quotes-list',
  templateUrl: './suppliers-quotes-list.component.html',
  styles: []
})
export class SuppliersQuotesListComponent extends BaseList implements OnInit {

  constructor(
    public router: Router,
    public loaderService: LoaderService,
    public helperService: HelperService,
    private comp: SuppliersQuotesComponent
  ) {
    super(loaderService, helperService);
    this.urlApi = '/api/suppliers-quotes';
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
