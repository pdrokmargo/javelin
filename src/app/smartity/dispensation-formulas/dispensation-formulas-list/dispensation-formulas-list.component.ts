import { Component, OnInit } from '@angular/core';
import { LoaderService, HelperService } from '../../../shared';
import { Router } from '@angular/router';
import { BaseList } from '../../bases/base-list';
import { DispensationFormulasComponent } from '../dispensation-formulas.component';

@Component({
  selector: 'dispensation-formulas-list-cmp',
  templateUrl: './dispensation-formulas-list.component.html'
})
export class DispensationFormulasListComponent extends BaseList implements OnInit {

  constructor(public loaderService: LoaderService,
    public helperService: HelperService,
    public router: Router,
    private comp: DispensationFormulasComponent
  ) {
    super(loaderService, helperService);
    this.urlApi = '/api/dispensation-formulas';
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
