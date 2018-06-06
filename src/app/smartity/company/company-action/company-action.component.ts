import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { CompanyComponent } from '../company.component';
import { BaseModel } from '../../bases/base-model';
import { read } from 'fs';

@Component({
  selector: 'company-action-cmp',
  templateUrl: './company-action.component.html',
  styles: []
})
export class CompanyActionComponent extends BaseModel implements OnInit {
  private countries: any[] = [];
  private departments: any[] = [];
  private cities: any[] = [];
  private tax_regime: any[] = [];
  private withholding: any[] = [];

  constructor(
    private loaderService: LoaderService,
    private helperService: HelperService,
    public snackBar: MdSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private comp: CompanyComponent
  ) {
    super();
    // paramatro enviado desde la url
  }

  ngOnInit() {
    this.clean();
    this.getCollection();

    if (this.numId != undefined) {
      this.getDataById();
    }
  }

  /**
   * get the country and the tax regime with the collection of names
   */
  private getCollection() {
    this.helperService
      .POST(`/api/collections`, ['COUNTRIES', 'TAX_REGIME', 'WITHHOLDING_TYPE'])
      .map((response: Response) => {
        const res = response.json();
        this.countries = res.COUNTRIES;
        this.tax_regime = res.TAX_REGIME;
        this.withholding = res.WITHHOLDING_TYPE;
      })
      .subscribe(
        (error) => {
          // this.loaderService.display(false);
        },
        (done) => {
          // this.loaderService.display(false);
        }
      );
  }

  private getDepartments() {
    this.loaderService.display(true);
    this.helperService
      .GET(`/api/departamentos?pais_id=${this.model.country_id}`)
      .map((response: Response) => {
        const res = response.json();
        this.departments = res['departamentos'];
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

  private getCities() {
    this.loaderService.display(true);
    this.helperService
      .GET(`/api/ciudades?departamento_id=${this.model.department_id}`)
      .map((response: Response) => {
        const res = response.json();
        this.cities = res['ciudades'];
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

  private save() {
    this.loaderService.display(true);
    switch (this.strAction) {
      case 'Guardar':
        this.helperService.POST(`/api/company`, this.model).subscribe(rs => {
          let res = rs.json();
          if (res.store) {
            this.snackBar.open(res.message, 'Guardado', { duration: 4000 });
            this.comp.openList();
            this.loaderService.display(false);
          }
        }, err => {
          this.snackBar.open(err.message, 'Guardado', { duration: 4000 });
          this.loaderService.display(false);
        });
        break;
      case 'Actualizar':
        this.helperService.PUT(`/api/company/${this.numId}`, this.model).subscribe(rs => {
          let res = rs.json();
          if (res.update) {
            this.snackBar.open(res.message, 'Actualización', { duration: 4000 });
            this.comp.openList();
            this.loaderService.display(false);
          }
        }, err => {
          this.snackBar.open(err.message, 'Actualización', { duration: 4000 });
          this.loaderService.display(false);
        });
        break;
      case 'Eliminar':
        this.helperService.DELETE(`/api/company/${this.numId}`).subscribe(rs => {
          let res = rs.json();
          if (res.delete) {
            this.snackBar.open(res.message, 'Eliminación', { duration: 4000 });
            this.comp.openList();
            this.loaderService.display(false);
          }
        }, err => {
          this.snackBar.open(err.message, 'Eliminación', { duration: 4000 });
          this.loaderService.display(false);
        });
        break;
    }

    /** Update */
    if (this.model.id > 0) {
      this.loaderService.display(true);
      this.helperService
        .PUT(`/api/company/${this.numId}`, this.model)
        .map((response: Response) => {
          const res = response.json();
          if (res.status === 'success') {
            this.snackBar.open(res.message, 'Actualización', {
              duration: 3500
            });
            // this.router.navigate(['app/company-list']);
            this.comp.openList();
          }
        })
        .subscribe(
          (error) => {
            this.loaderService.display(false);
          },
          (done) => {
            this.loaderService.display(false);
          }
        );
    } else {
      /** Create */

    }
  }

  private getDataById(): void {
    this.loaderService.display(true);
    this.helperService
      .GET(`/api/company/${this.numId}`)
      .map((response: Response) => {
        const res = response.json();
        this.model = res['data'];
        this.departments.push(this.model.geolocation.department);
        this.cities.push(this.model.geolocation.city);
        this.model.country_id = this.model.geolocation.country_id;
        this.model.department_id = this.model.geolocation.department_id;
        this.model.city_id = this.model.geolocation.city_id;
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

  private clean() {
    this.cities = [];
    this.departments = [];
    this.model = {};
    this.model.big_contributor = true;
    this.model.selfholder = true;
  }

  private goList() {
    this.comp.openList();
  }
}
