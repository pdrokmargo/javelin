import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BaseList } from '../../../bases/base-list';
import { LoaderService, HelperService } from '../../../../shared';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-modal-supplier-orders-list',
  templateUrl: './modal-supplier-orders-list.component.html'
})
export class ModalSupplierOrdersListComponent extends BaseList implements OnInit {

  
  @Output() select = new EventEmitter();

    constructor(public loaderService: LoaderService,
        public helperService: HelperService,
        public router: Router) {
        super(loaderService, helperService);
        this.urlApi = '/api/suppliers-quotes';
    }
    ngOnInit() {
      this.getAll();
    }
    private view(row: any) {
        this.select.emit(row);
    }


}
