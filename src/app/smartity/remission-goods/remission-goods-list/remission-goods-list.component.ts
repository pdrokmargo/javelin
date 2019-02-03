import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService, HelperService } from '../../../shared';
import { RemissionGoodsComponent } from '../remission-goods.component';
import { BaseList } from '../../bases/base-list';

@Component({
  selector: 'app-remission-goods-list',
  templateUrl: './remission-goods-list.component.html',
  styles: []
})
export class RemissionGoodsListComponent extends BaseList implements OnInit {

  constructor(
    public router: Router,
    public loaderService: LoaderService,
    public helperService: HelperService,
    private comp: RemissionGoodsComponent
  ) {
    super(loaderService, helperService);
    this.urlApi = '/api/remission-goods';
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
