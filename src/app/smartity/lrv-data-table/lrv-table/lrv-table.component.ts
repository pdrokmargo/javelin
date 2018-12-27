import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LrvTable, LrvTableService, LrvTableColumn, LrvTableColumnData } from "../lrv-table";
import { Observable } from "rxjs/Rx";
import { Http } from '@angular/http';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-lrv-table',
  templateUrl: './lrv-table.component.html',
  styles: [`
  .filter-panel {
    padding-bottom: 10px;
}

.filter-panel form {
    display: flex;
}

.filter-panel form .form-control {
  font-size: .8em;
}
.filter-panel form .form-control:nth-child(2) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.filter-panel form .form-control:nth-child(1) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  height: 29px;
}

.filter-panel form div:nth-child(1){
    width: 60%;
}
.filter-panel form div:nth-child(2){
    width: 40%;
}

.pagination-panel {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    padding-bottom: 10px;
}

.th-title {
    margin-right: 10px;
}

.have_btn {
    width: 50px;
}
select {
  height: 26px;
}
.th-no-padding th {
  padding: 0;
}
`]
})
export class LrvTableComponent implements OnInit {

  private _lrvtable: LrvTable;
  @Input() set lrvtable(_l: LrvTable) {
    if (_l != undefined) {
      this._lrvtable = _l;
      this._load();
    }

  }
  @Output() option = new EventEmitter();

  private pagination: Array<any>;
  private pages: Array<number> = [];
  private _page = 1;

  private TYPE: number = 0;
  private dataFilter: string = '';

  private _order = '';
  private _order_name = '';
  private _order_type = '';

  __str = []


  constructor(private http: Http) { }

  ngOnInit() {
  }

  private _load(): void {
    this._order_name = this._lrvtable.order.column.db_name;
    this._order_type = this._lrvtable.order.order == 1 ? 'ASC' : 'DESC';
    this._order = `&ordername=${this._order_name}&ordertype=${this._order_type}`;

    this._lrvtable.column.forEach(element => {
      if (this._lrvtable.order.column.db_name == element.db_name) {
        element.ord = this._lrvtable.order.order;
      } else {
        element.ord = -1;
      }
    });
    this.TYPE = 0;
    this.loadData();
  }

  private loadData() {
    if (this._lrvtable.service.METHOD == LrvTableService.GET) {
      this.GET(`${this._lrvtable.service.name}?page=${this._page}${this.dataFilter}${this._order}`).subscribe(res => {
        this.pagination = res["data"];
        this.pages = [];
        var it = 1;
        var limit = 10;
        var ex = 0;
        for (var _i = 1; _i <= limit; _i++) {
          ex++;
          var num = _i;
          if (this.pagination["current_page"] > 6) {
            num += this.pagination["current_page"] - 6;
          }
          if (num > this.pagination["last_page"]) {
            ex = ex - limit - 1;
            break;
          }
        }
        for (var _i = 1; _i <= limit; _i++) {
          var num = _i;
          if (ex < 0) {
            num = num + ex;
          }

          if (this.pagination["current_page"] > 6) {
            num += this.pagination["current_page"] - 6;
          }
          if (num > this.pagination["last_page"]) {
            break;
          }
          if (num > 0) {
            this.pages.push(num);
          }
        }
      }, err => {
        console.log(err);
      });
    }
  }

  private loadOrder(item: any) {
    this._lrvtable.column.forEach(element => {
      if (item.db_name == element.db_name) {
        switch (element.ord) {
          case -1:
            element.ord = 1;
            break;
          case 1:
            element.ord = 2;
            break;
          case 2:
            element.ord = 1;
            break;
        }
        this._order_name = element.db_name;
        this._order_type = element.ord == 1 ? 'ASC' : 'DESC';
        this._order = `&ordername=${this._order_name}&ordertype=${this._order_type}`;
        this.loadData();
      } else {
        element.ord = -1;
      }
    });
  }

  private GET(url: string): Observable<Object> {
    return this.http.get(url, { headers: this._lrvtable.service.header })
      .map(res => { return res.json() })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  private _selectRow(row: Object) {
    this.option.emit(row);
  }

  private onChange(str: string) {
    this._lrvtable.column.forEach(element => {
      if (element.db_name == str) {
        this.TYPE = element.TYPE;
      }
    });
  }

  private getPageNumber(url: String) {
    let p = url.split('page=')[1];
    this._page = parseInt(p, 10);
  }

  public update(): void {
    this.loadData();
  }

  private getValueByKey(key: string, data: Array<LrvTableColumnData>) {
    var rs = '';
    data.forEach((element, index) => {
      if (element.key == key) {
        rs = element.value;
      }
    });
    return rs;
  }

  private search(search: string, filter: string, sign: string, _index: number): void {
    this.__str.forEach((element, index) => {
      if (search != element && index != _index) {
        element = "";
        if (this._lrvtable.column[index].data == undefined) {
          this.__str[index] = '';
        } else {
          this.__str[index] = '-1';
        }
      }
    });
    if (search == '-1' || search == '') {
      this.dataFilter = ``;
    } else {
      this.dataFilter = `&search=${search}&filter=${filter}&sign=${sign}`;
    }
    this.loadData();
  }

}
