import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { PharmaceuticalDrugComponent } from '../pharmaceutical-drug.component';
import { BaseModel } from '../../bases/base-model';
import { isNumber, isNullOrUndefined } from 'util';
import { ModalActiveIngredientsComponent } from '../../modals/modal-active-ingredients/modal-active-ingredients.component';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'pharmaceutical-drug-action-cmp',
    templateUrl: './pharmaceutical-drug-action.component.html',
    styles: []
})

export class PharmaceuticalDrugActionComponent extends BaseModel implements OnInit {

    measurement_unit_id;
    measurement_unit = {};
    private modalActiveIngredients: MatDialogRef<ModalActiveIngredientsComponent>;
    private pharmaceutical_form: any[] = [];
    private routes_administration: any[] = [];
    private storage_condition: any[] = [];
    private arrActive_ingredients: any[] = [];
    private arrMeasurement_unit: any[] = [];
    all_concentration = 0;

    constructor(
        private loaderService: LoaderService,
        private helperService: HelperService,
        public snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router,
        private comp: PharmaceuticalDrugComponent,
        private dialog: MatDialog
    ) {
        super();
    }

    ngOnInit() {
        this.clean();
        this.getCollection();
        if (this.numId !== undefined) {
            this.getDataById();
        }
    }

    getMeasurement_unit() {
        this.measurement_unit = this.arrMeasurement_unit.filter(x => x.id === this.measurement_unit_id)[0];
    }

    private getCollection() {
        this.loaderService.display(true);
        this.helperService.POST(`/api/collections`, ['PHARMACEUTICAL_FORM', 'ROUTES_ADMINISTRATION', 'STORAGE_CONDITION', 'MEASUREMENT_UNIT'])
            .map((response: Response) => {

                const res = response.json();
                this.pharmaceutical_form = res.PHARMACEUTICAL_FORM;
                this.routes_administration = res.ROUTES_ADMINISTRATION;
                this.storage_condition = res.STORAGE_CONDITION;
                this.arrMeasurement_unit = res.MEASUREMENT_UNIT;

            }).subscribe(
                (error) => {
                    this.loaderService.display(false);
                },
                (done) => {
                    this.loaderService.display(false);
                });
    }

    private save() {
        this.arrActive_ingredients.forEach(element => {
            element.measurement_unit_id = this.measurement_unit_id;
        });

        this.loaderService.display(true);
        switch (this.strAction) {
            case 'Guardar':
                this.helperService.POST(`/api/pharmaceuticaldrug`, { "drug": this.model, "active_ingredients": this.arrActive_ingredients }).subscribe(rs => {
                    const res = rs.json();
                    if (res.store) {
                        this.snackBar.open(res.message, 'Guardado', { duration: 4000 });
                        this.goList();
                    }
                }, err => {
                    this.snackBar.open(err.message, 'Guardado', { duration: 4000 });
                    this.loaderService.display(false);
                });
                break;
            case 'Actualizar':
                this.helperService.PUT(`/api/pharmaceuticaldrug/${this.numId}`, { "drug": this.model, "active_ingredients": this.arrActive_ingredients }).subscribe(rs => {
                    const res = rs.json();
                    if (res.update) {
                        this.snackBar.open(res.message, 'Actualización', { duration: 4000 });
                        this.comp.openList();
                    }
                }, err => {
                    this.loaderService.display(false);
                    this.snackBar.open(err.message, 'Actualización', { duration: 4000 });
                });
                break;
            case 'Eliminar':
                this.helperService.DELETE(`/api/pharmaceuticaldrug/${this.numId}`).subscribe(rs => {
                    const res = rs.json();
                    if (res.delete) {
                        this.snackBar.open(res.message, 'Eliminación', { duration: 4000 });
                        this.comp.openList();
                    }
                }, err => {
                    this.loaderService.display(false);
                    this.snackBar.open(err.message, 'Eliminación', { duration: 4000 });
                });
                break;
        }



    }

    private getDataById(): void {
        this.loaderService.display(true);
        this.helperService.GET(`/api/pharmaceuticaldrug/${this.numId}`).subscribe(rs => {
            const res = rs.json();
            this.model = res['data']["model"];
            this.arrActive_ingredients = res["data"]["active_ingredients"];
            this.measurement_unit_id = res["data"]["active_ingredients"][0]["measurement_unit_id"];
            this.all();
            this.arrActive_ingredients.forEach(element => {
                element.name = element.active_ingredient.name;
                element.id = element.active_ingredient.id;
            });
            this.getMeasurement_unit();
            this.loaderService.display(false);
        }, err => {
            this.loaderService.display(false);
        });
    }

    private clean() {
        this.model = {};
        this.arrActive_ingredients = [];
        this.model.is_pos = false;
        this.model.is_controlled = false;
        this.model.is_monopoly = false;
        this.model.state = true;
    }

    private goList() {
        this.comp.openList();
    }

    private openModalActiveIngredients() {
        this.modalActiveIngredients = this.dialog.open(ModalActiveIngredientsComponent, {
            hasBackdrop: false,
            data: {
                title: 'Principio activo',
            }
        });

        this.modalActiveIngredients.afterClosed().pipe(filter((data) => data)).subscribe((data) => {

            if (this.arrActive_ingredients.length == 0) {
                this.arrActive_ingredients.push(data);
            } else {
                var exist = false;
                this.arrActive_ingredients.forEach((element, index) => {
                    if (element.name == data.name) {
                        exist = true;
                    }
                    if (this.arrActive_ingredients.length - 1 == index) {
                        if (!exist) {
                            this.arrActive_ingredients.push(data);
                        }
                    }
                });
            }

        });

    }

    private all() {
        this.all_concentration = 0;
        this.arrActive_ingredients.forEach(element => {
            this.all_concentration += parseInt(element.concentration);
        });
    }
}
