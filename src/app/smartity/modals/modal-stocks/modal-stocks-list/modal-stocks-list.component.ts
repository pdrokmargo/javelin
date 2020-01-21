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
  warehouse_id: any;
  private warehouses: any[] = [];
  constructor(public router: Router,
    public loaderService: LoaderService,
    public helperSerive: HelperService) {
    super(loaderService, helperSerive);
    this.urlApi = '/api/stocks-products';
  }
  filtrar(event): void{
    this.getAll('&warehouse='+this.warehouse_id);
  }
  ngOnInit() {
    this.getCollection();
    this.getAll();
  }
  private getCollection() {
    this.loaderService.display(true);
    this.helperService.GET(`/api/warehouse`).subscribe(rs => {
        const res = rs.json();
        this.warehouses = res.data;
        this.loaderService.display(false);
    }, err => {
        console.log(err);
        this.loaderService.display(false);
    });
}

  private view(row: any) {
    this.select.emit(row);
  }
}
