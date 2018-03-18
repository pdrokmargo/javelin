import { LoaderService, HelperService } from '../../shared';
import { Response } from '@angular/http';

export abstract class BaseList {
  public list: any[] = [];
  public defaultPagination: number;
  public advancedPagination: number;
  public paginationSize: number;
  public disabledPagination: number;
  public isDisabled: boolean;
  public maxSize: number;
  public pageSize: number;
  public search: string = '';
  public urlApi: string = '';
  public key: string = null;
  public reverse: boolean = false;
  public orderType: string = null;

  constructor(
    public loaderService: LoaderService,
    public helperService: HelperService
  ) {
    this.loadPagination();
  }

  public loadPagination() {
    this.defaultPagination = 1;
    this.advancedPagination = 1;
    this.disabledPagination = 1;
    this.isDisabled = true;
    this.maxSize = 6;
  }

  public fillPagination(data: any) {
    this.paginationSize = data.total;
    this.pageSize = data.per_page;
  }

  public getAll() {
    this.loaderService.display(true);
    let url = `${this.urlApi}?page=${this.advancedPagination}&search=${this.search}`;
    if (this.orderType != null && this.key != null) {
      url = `${this.urlApi}?page=${this.advancedPagination}&search=${
        this.search
        }&ordername=${this.key}&ordertype=${this.orderType}`;
    }

    this.helperService
      .GET(url)
      .map((response: Response) => {
        const res = response.json();
        this.list = res.data;
        this.fillPagination(res.data);
      })
      .subscribe(
        (error) => {
          this.loaderService.display(false);
        },
        (done) => {
          this.loaderService.display(false);
        }
      );
  }

  private enter(event: any) {
    if (event.keyCode === 13) {
      this.getAll();
    }
  }

  public sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
    this.orderType = this.reverse ? 'DESC' : 'ASC';
    this.getAll();
  }

}
