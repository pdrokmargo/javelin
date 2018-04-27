import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseList } from '../../bases/base-list';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { CompanyComponent } from '../company.component';

@Component({
  selector: 'company-list-cmp',
  templateUrl: 'company-list.component.html',
  styles: []
})
export class CompanyListComponent extends BaseList implements OnInit {
  constructor(
    public loaderService: LoaderService,
    public helperService: HelperService,
    public router: Router,
    private comp: CompanyComponent
  ) {
    super(loaderService, helperService);
    this.urlApi = '/api/company';
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
