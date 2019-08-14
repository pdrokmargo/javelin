import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BaseList } from '../../../bases/base-list';
import { LoaderService, HelperService } from '../../../../shared';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-modal-customers-quotes-list',
  templateUrl: './modal-customers-quotes-list.component.html'
})
export class ModalCustomersQuotesListComponent extends BaseList implements OnInit {

  @Input() customer:String;
  @Output() select = new EventEmitter();

  constructor(public loaderService: LoaderService,
        public helperService: HelperService,
        public router: Router) {
        super(loaderService, helperService);
        this.urlApi = '/api/customers-quotes';
    }

  ngOnInit() {
    this.getAll();
  }
  private view(row: any) {
    this.select.emit(row);
  }

}
