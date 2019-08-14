import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BaseList } from '../../../bases/base-list';
import { LoaderService, HelperService } from '../../../../shared';
import {  Router } from '@angular/router';
import { isUndefined } from 'util';

@Component({
  selector: 'app-modal-supplier-quotes-list',
  templateUrl: './modal-supplier-quotes-list.component.html'
})
export class ModalSupplierQuotesListComponent extends BaseList implements OnInit {

  @Input() supplier:String;
  @Output() select = new EventEmitter();

    constructor(public loaderService: LoaderService,
        public helperService: HelperService,
        public router: Router) {
        super(loaderService, helperService);
        this.urlApi = '/api/suppliers-quotes';
    }

    ngOnInit() {
      // if(this.supplier != "-1" && !isUndefined(this.supplier)){
      //   this.getAll('&supplier='+this.supplier);
      // }else{
      //   this.getAll();
      // }
      this.getAll();
      
    }

    private view(row: any) {
        this.select.emit(row);
    }

}
