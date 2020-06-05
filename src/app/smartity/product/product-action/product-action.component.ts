import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { MatSnackBar, MatDialogRef, MatDialog, MAT_DATE_FORMATS, DateAdapter } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { ProductComponent } from '../product.component';
import { BaseModel } from '../../bases/base-model';
import { ModalPharmaceuticalComponent, ModalStakeholderComponent } from '../../modals';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'product-action-cmp',
    templateUrl: './product-action.component.html',
    styles: []
})

export class ProductActionComponent extends BaseModel implements OnInit {

    private content_unit: any[] = [];
    private product_type: any[] = [];
    private sanitary_registration_holder: any = {};
    private supplier: any = {};
    private manufacturer: any = {};
    private laboratory: any = '';
    private importer: any = {};
    private pharmaceuticalDialogRef: MatDialogRef<ModalPharmaceuticalComponent>;
    private modalStakeHolderDialogRef: MatDialogRef<ModalStakeholderComponent>;

    constructor(private loaderService: LoaderService,
        private helperService: HelperService,
        public snackBar: MatSnackBar,
        private route: ActivatedRoute,
        private router: Router,
        private comp: ProductComponent,
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


    private getCollection() {
        this.loaderService.display(true);
        this.helperService.POST(`/api/collections`, ['CONTENT_UNIT', 'PRODUCT_TYPE']).subscribe(rs => {
            const res = rs.json();
            this.content_unit = res.CONTENT_UNIT;
            this.product_type = res.PRODUCT_TYPE;
            this.loaderService.display(false);
        }, err => {
            this.loaderService.display(false);
        });
    }

    private save() {
        var product_name = this.model.product_detail.pharmaceuticaldrug.name + ' - ' + this.laboratory;
        this.model.name = product_name;
        this.model.product_detail.name = product_name;

        if (this.model.product_detail.pharmaceuticaldrug === undefined) {
            this.model.product_detail.pharmaceuticaldrug = {};
        }

        if (this.model.product_detail.pharmaceuticaldrug == null && this.model.product_profile_id == 30) {
            this.snackBar.open('Seleccione por lo menos un medicamento', 'Error', { duration: 4000 });
        } else {
            this.loaderService.display(true);
            this.model.product_detail.pharmaceutical_drug_id = this.model.product_detail.pharmaceuticaldrug.id;
            switch (this.strAction) {
                case 'Guardar':
                    this.helperService.POST(`/api/product`, this.model).subscribe(rs => {
                        const res = rs.json();
                        if (res.store) {
                            this.snackBar.open(res.message, 'Guardado', { duration: 4000 });
                            this.goList();
                        }
                    }, err => {
                        this.loaderService.display(false);
                        this.snackBar.open(err.message, 'Guardado', { duration: 4000 });
                    });
                    break;
                case 'Actualizar':
                    this.helperService.PUT(`/api/product/${this.numId}`, this.model).subscribe(rs => {
                        // const res = rs.text();
                        // console.log(res);
                        const res = rs.json();
                        if (res.update) {
                            this.snackBar.open(res.message, 'Actualización', { duration: 4000 });
                            this.comp.openList();
                        }
                    }, err => {
                        this.snackBar.open(err.message, 'Actualización', { duration: 4000 });
                        this.loaderService.display(false);
                    });
                    break;
                case 'Eliminar':
                    this.helperService.DELETE(`/api/product/${this.numId}`).subscribe(rs => {
                        const res = rs.json();
                        if (res.delete) {
                            this.snackBar.open(res.message, 'Eliminación', { duration: 4000 });
                            this.comp.openList();
                        }
                    }, err => {
                        this.snackBar.open(err.message, 'Eliminación', { duration: 4000 });
                        this.loaderService.display(false);
                    });
                    break;
            }
        }
    }

    private getDataById(): void {
        this.loaderService.display(true);
        this.helperService.GET(`/api/product/${this.numId}`).subscribe(rs => {
            const res = rs.json();
            this.model = res['data'];
            // this.model.product_detail.pharmaceuticaldrug = this.model.product_detail.pharmaceuticaldrug != null ? JSON.parse(this.model.product_detail.pharmaceuticaldrug) : [];
            this.importer = res['data']['importer'] || {};
            this.sanitary_registration_holder = res['data']['product_detail']['sanitary_registration_holder'] || {};
            this.supplier = res['data']['supplier'] || {};
            if (this.supplier.businessname == '') {
                this.supplier.businessname = this.supplier.fullname;
            }
            this.manufacturer = res['data']['manufacturer'] || {};
            this.laboratory = res['data']['laboratory_name'] || {};
            this.loaderService.display(false);
        }, err => {
            console.log(err);
            this.loaderService.display(false);
        });
    }

    private clean() {
        this.model = {"product_detail": {}};

        this.model.batch_control = false;
        this.model.serials_control = false;
        this.model.institutional_use = false;
        this.model.comercial = false;
        this.model.is_regulated = false;
        this.model.state = true;
        this.model.comercial_name = '';
        this.model.product_detail.pharmaceuticaldrug = null;
    }

    private goList() {
        this.comp.openList();
    }

    openAddPharmadrug() {
        this.pharmaceuticalDialogRef = this.dialog.open(ModalPharmaceuticalComponent, {
            hasBackdrop: false,
            data: {
                title: 'Medicamentos'
            }
        });
        this.pharmaceuticalDialogRef
            .afterClosed()
            .pipe(filter((pharmaceuticalDrug) => pharmaceuticalDrug))
            .subscribe((pharmaceuticalDrug) => {
                this.model.product_detail.pharmaceuticaldrug = pharmaceuticalDrug;
            });
        }

        addLaboratory() {
            this.modalStakeHolderDialogRef = this.dialog.open(ModalStakeholderComponent, {
                hasBackdrop: false,
                data: {
                    title: 'Laboratorio',
                    option: '7'
                }
            });
    
            this.modalStakeHolderDialogRef.afterClosed().pipe(filter((stakeHolder) => stakeHolder)).subscribe((stakeHolder) => {
                // if (stakeHolder.businessname == '') { stakeHolder.businessname = stakeHolder.name; }
                this.laboratory = stakeHolder['fullname'];
                this.model.product_detail.laboratory_id = stakeHolder.stk_id;
            });
            }
    removePharmaceutical() {
        this.model.product_detail.pharmaceuticaldrug = null;
    }

    openAddSanitaryRegistration() {
        this.modalStakeHolderDialogRef = this.dialog.open(ModalStakeholderComponent, {
            hasBackdrop: false,
            data: {
                title: 'Titular registro sanitario',
                option: '6'
            }
        });

        this.modalStakeHolderDialogRef.afterClosed().pipe(filter((stakeHolder) => stakeHolder)).subscribe((stakeHolder) => {
            if (stakeHolder.businessname == '') { stakeHolder.businessname = stakeHolder.name; }
            this.sanitary_registration_holder = stakeHolder;
            this.model.sanitary_registration_holder_id = stakeHolder.id;
        });
    }

    openAddSupplier() {
        this.modalStakeHolderDialogRef = this.dialog.open(ModalStakeholderComponent, {
            hasBackdrop: false,
            data: {
                title: 'Proveedores',
                option: '2'
            }
        });

        this.modalStakeHolderDialogRef.afterClosed().pipe(filter((stakeHolder) => stakeHolder)).subscribe((stakeHolder) => {
            if (stakeHolder.businessname == '') { stakeHolder.businessname = stakeHolder.name; }
            this.supplier = stakeHolder;
            this.model.supplier_id = stakeHolder.id;
        });
    }

    openAddMaker() {
        this.modalStakeHolderDialogRef = this.dialog.open(ModalStakeholderComponent, {
            hasBackdrop: false,
            data: {
                title: 'Fabricantes',
                option: '4'
            }
        });

        this.modalStakeHolderDialogRef
            .afterClosed()
            .pipe(filter((stakeHolder) => stakeHolder))
            .subscribe((stakeHolder) => {
                if (stakeHolder.businessname == '') { stakeHolder.businessname = stakeHolder.name; }
                this.manufacturer = stakeHolder;
                this.model.manufacturer_id = stakeHolder.id;
            });
    }

    openAddImporter() {
        this.modalStakeHolderDialogRef = this.dialog.open(ModalStakeholderComponent, {
            hasBackdrop: false,
            data: {
                title: 'Importador',
                option: '5'
            }
        });

        this.modalStakeHolderDialogRef.afterClosed().pipe(filter((stakeHolder) => stakeHolder)).subscribe((stakeHolder) => {
            if (stakeHolder.businessname == '') { stakeHolder.businessname = stakeHolder.name; }
            this.importer = stakeHolder;
            this.model.importer_id = stakeHolder.id;
        });
    }

}
export const APP_DATE_FORMATS =
{
    parse: {
        dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    },
    display: {
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'numeric' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
};