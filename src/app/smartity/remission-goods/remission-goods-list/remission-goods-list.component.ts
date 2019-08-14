import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseList } from '../../bases/base-list';
import { LoaderService, HelperService } from '../../../shared';
import { RemissionGoodsComponent } from '../remission-goods.component';

@Component({
  selector: 'remission-goods-list-cmp',
  templateUrl: './remission-goods-list.component.html'
})
export class RemissionGoodsListComponent  extends BaseList implements OnInit {

  constructor(public loaderService: LoaderService,
    public helperService: HelperService,
    public router: Router,
    private comp: RemissionGoodsComponent) {
    super(loaderService, helperService);
    this.urlApi = '/api/remission-goods';
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
