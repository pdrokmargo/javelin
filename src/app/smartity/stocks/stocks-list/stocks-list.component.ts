import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BaseList } from '../../bases/base-list';
import { LoaderService, HelperService } from '../../../shared';
import { StocksComponent } from '../stocks.component';

@Component({
  selector: 'stocks-list-cmp',
  templateUrl: './stocks-list.component.html'
})
export class StocksListComponent extends BaseList implements OnInit {

  warehouse_id: any;
  private warehouses: any[] = [];
  constructor(public loaderService: LoaderService,
    public helperService: HelperService,
    public router: Router,
    private comp: StocksComponent) {
    super(loaderService, helperService);
    this.urlApi = '/api/stocks-products';
    }

  ngOnInit() {
    this.getCollection();
    this.getAll();
  }

  filtrar(event): void{
    // console.log(event);
    this.getAll('&warehouse='+this.warehouse_id);
  }
  resetWarehouse(){
    this.warehouse_id = -1;
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
