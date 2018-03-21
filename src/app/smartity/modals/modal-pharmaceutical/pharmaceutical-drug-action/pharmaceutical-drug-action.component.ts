import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { MdSnackBar, MdDialogRef, MdDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';
import { isNumber, isNullOrUndefined } from 'util';
import { filter } from 'rxjs/operators';
import { BaseModel } from '../../../bases/base-model';
import { LoaderService, HelperService } from '../../../../shared';
import { ModalActiveIngredientsComponent } from '../..';

@Component({
    selector: 'pharmaceutical-drug-action-cmp',
    templateUrl: './pharmaceutical-drug-action.component.html',
    styles: []
})

export class PharmaceuticalDrugActionComponent extends BaseModel implements OnInit {

    @Output() select = new EventEmitter();
    @Input() noaction: boolean;

    private action_active: boolean = false;
    private str_action: string = 'Guardar';
    private pharmaceutical_form: any[] = [];
    private routes_administration: any[] = [];
    private storage_condition: any[] = [];
    private arrActive_ingredients: any[] = [];
    private arrMeasurement_unit: any[] = [];

    constructor(private loaderService: LoaderService,
        private helperService: HelperService,
        public snackBar: MdSnackBar,
        private dialog: MdDialog) {
        super();
        // paramatro enviado desde la url

    }

    ngOnInit() {
        this.clean();
        this.getCollection();
        if (this.numId == undefined || this.numId == null || this.numId == '') {
            this.str_action = 'Guardar';
        } else {
            this.str_action = 'Actualizar';
            this.getDataById();
        }
    }

    /**
     * get the country and the tax regime with the collection of names
     */
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
        /** Update */
        if (!isNullOrUndefined(this.model.id) && this.model.id !== '') {
            this.loaderService.display(true);
            this.helperService.PUT(`/api/pharmaceuticaldrug/${this.numId}`, { "drug": this.model, "active_ingredients": this.arrActive_ingredients })
                .map((response: Response) => {

                    const res = response.json();
                    if (res.status === 'success') {
                        this.snackBar.open(res.message, 'Actualización', {
                            duration: 3500,
                        });
                    }

                }).subscribe(
                    (error) => {
                        this.loaderService.display(false);
                    },
                    (done) => {
                        this.loaderService.display(false);
                    });
        } else {
            /** Create */
            this.loaderService.display(true);
            this.helperService.POST(`/api/pharmaceuticaldrug`, { "drug": this.model, "active_ingredients": this.arrActive_ingredients })
                .map((response: Response) => {

                    const res = response.json();
                    if (res.status === 'success') {
                        this.snackBar.open(res.message, 'Guardado', {
                            duration: 3500,
                        });
                        this.clean();
                    }
                    if (this.noaction) {
                        this.select.emit(res.data);
                    }

                }).subscribe(
                    (error) => {
                        this.loaderService.display(false);
                    },
                    (done) => {
                        this.loaderService.display(false);
                    });
        }

    }

    private getDataById(): void {
        this.loaderService.display(true);
        this.helperService.GET(`/api/pharmaceuticaldrug/${this.numId}`)
            .map((response: Response) => {

                const res = response.json();
                this.model = res['data']["model"];
                this.arrActive_ingredients = res["data"]["active_ingredients"];
                this.arrActive_ingredients.forEach(element => {
                    element.name = element.active_ingredient.name;
                    element.id = element.active_ingredient.id;
                });

            }).subscribe(
                (error) => {
                    this.loaderService.display(false);
                },
                (done) => {
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


    private modalActiveIngredients: MdDialogRef<ModalActiveIngredientsComponent>;
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
}
