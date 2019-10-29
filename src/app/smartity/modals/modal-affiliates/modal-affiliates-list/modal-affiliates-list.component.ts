import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BaseList } from '../../../bases/base-list';
import { LoaderService, HelperService } from '../../../../shared';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-modal-affiliates-list',
  templateUrl: './modal-affiliates-list.component.html'
})
export class ModalAffiliatesListComponent extends BaseList implements OnInit {

  @Input() affiliate:String;
  @Output() select = new EventEmitter();
  numItemSelected = -1;


  constructor(public loaderService: LoaderService,
        public helperService: HelperService,
        public router: Router) {
        super(loaderService, helperService);
        this.urlApi = '/api/affiliates';
    }

  ngOnInit() {
    this.getAll();
  }
  private view(row: any) {
    this.select.emit(row);
  }

}
