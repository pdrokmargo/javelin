import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseList } from '../../../bases/base-list';
import { Router } from '@angular/router';
import { LoaderService, HelperService } from '../../../../shared';

@Component({
  selector: 'app-products-list',
  templateUrl: './modal-products-list.component.html',
  styles: []
})
export class ModalProductsListComponent extends BaseList implements OnInit {

  @Output() select = new EventEmitter();
  numItemSelect = -1;

  constructor(public router: Router,
    public loaderService: LoaderService,
    public helperSerive: HelperService) {
    super(loaderService, helperSerive);
    this.urlApi = '/api/product';
  }

  ngOnInit() {
    this.getAll();
  }

  private view(row: any) {
    this.select.emit(row);
  }

}