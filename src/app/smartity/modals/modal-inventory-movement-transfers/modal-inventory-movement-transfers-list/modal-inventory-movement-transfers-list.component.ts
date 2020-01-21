import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { BaseList } from '../../../bases/base-list';
import { Router } from '@angular/router';
import { LoaderService, HelperService } from '../../../../shared';


@Component({
  selector: 'app-modal-inventory-movement-transfers-list',
  templateUrl: './modal-inventory-movement-transfers-list.component.html'
})
export class ModalInventoryMovementTransfersListComponent extends BaseList implements OnInit {
  @Input() document_fullfilled:String;
  @Output() select = new EventEmitter();
  numItemSelect = -1;

  constructor(public router: Router,
    public loaderService: LoaderService,
    public helperSerive: HelperService) {
    super(loaderService, helperSerive);
    this.urlApi = '/api/inventory-movements-transfers';
  }

  ngOnInit() {
    this.getAll();
  }

  private view(row: any) {
    this.select.emit(row);
  }

}
