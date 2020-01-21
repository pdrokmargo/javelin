import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { BaseList } from '../../../bases/base-list';
import { Router } from '@angular/router';
import { LoaderService, HelperService } from '../../../../shared';


@Component({
  selector: 'app-modal-purchase-orders-list',
  templateUrl: './modal-purchase-orders-list.component.html'
})
export class ModalPurchaseOrdersListComponent extends BaseList implements OnInit {

  @Output() select = new EventEmitter();
  numItemSelect = -1;

  constructor(public router: Router,
    public loaderService: LoaderService,
    public helperSerive: HelperService) {
    super(loaderService, helperSerive);
    this.urlApi = '/api/suppliers-orders';
  }
  ngOnInit() {
    this.getAll('&fullfilled=false');
  }

  private view(row: any) {
    this.select.emit(row);
  }

}
