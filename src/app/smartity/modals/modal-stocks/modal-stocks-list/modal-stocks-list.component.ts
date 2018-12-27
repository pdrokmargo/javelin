import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { BaseList } from '../../../bases/base-list';
import { Router } from '@angular/router';
import { LoaderService, HelperService } from '../../../../shared';

@Component({
  selector: 'app-modal-stocks-list',
  templateUrl: './modal-stocks-list.component.html'
})
export class ModalStocksListComponent extends BaseList implements OnInit {

  @Input() expired:Boolean;
  @Input() warehouse:String;
  @Output() select = new EventEmitter();
  numItemSelect = -1;

  constructor(public router: Router,
    public loaderService: LoaderService,
    public helperSerive: HelperService) {
    super(loaderService, helperSerive);
    this.urlApi = '/api/stocks-products';
  }

  ngOnInit() {
    this.getAll('&warehouse='+this.warehouse+'&expired='+this.expired);
  }

  private view(row: any) {
    this.select.emit(row);
  }
}
