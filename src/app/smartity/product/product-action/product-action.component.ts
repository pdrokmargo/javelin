import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { MdSnackBar, MdDialogRef, MdDialog } from '@angular/material';
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
    private importer: any = {};
    private pharmaceuticalDialogRef: MdDialogRef<ModalPharmaceuticalComponent>;
    private modalStakeHolderDialogRef: MdDialogRef<ModalStakeholderComponent>;

    constructor(private loaderService: LoaderService,
        private helperService: HelperService,
        public snackBar: MdSnackBar,
        private route: ActivatedRoute,
        private router: Router,
        private comp: ProductComponent,
        private dialog: MdDialog
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


    private getCollection(){
        this.loaderService.display(true);
        this.helperService.POST(`/api/collections`, ['CONTENT_UNIT', 'PRODUCT_TYPE']).subscribe(rs =>{
            const res = rs.json();
            this.content_unit = res.CONTENT_UNIT;
            this.product_type = res.PRODUCT_TYPE;
            this.loaderService.display(false);
        }, err =>{
            this.loaderService.display(false);
        });
    }

    private save() {
        this.model.name = '';

        this.loaderService.display(true);
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

    private getDataById(): void {
        this.loaderService.display(true);
        this.helperService.GET(`/api/product/${this.numId}`).subscribe(rs => {
            const res = rs.json();
            this.model = res['data'];
            this.importer = res['data']['importer'] || {};
            this.sanitary_registration_holder = res['data']['sanitary_registration_holder'] || {};
            this.supplier = res['data']['supplier'] || {};
            this.manufacturer = res['data']['manufacturer'] || {};
            this.loaderService.display(false);
        }, err => {
            console.log(err);            
            this.loaderService.display(false);
        });
    }

    private clean() {
        this.model = {};
        this.model.pharmaceutical_drugs = [];
        this.model.batch_control = false;
        this.model.serials_control = false;
        this.model.institutional_use = false;
        this.model.comercial = false;
        this.model.is_regulated = false;
        this.model.state = true;
        this.model.comercial_name = '';
    }

    private goList(){
        this.comp.openList();
    }

    openAddBankAccount() {
        this.pharmaceuticalDialogRef = this.dialog.open(ModalPharmaceuticalComponent,{
            hasBackdrop: false,
            data: {
                title: 'Medicamentos'
            }
        });

        this.pharmaceuticalDialogRef
        .afterClosed()
        .pipe(filter( (pharmaceuticalDrug) => pharmaceuticalDrug))
        .subscribe( (pharmaceuticalDrug) => {
            console.log(pharmaceuticalDrug);
            
            this.model.pharmaceutical_drugs.push(pharmaceuticalDrug);
        });
    }

    removePharmaceutical(obj) {
        const index = this.model.pharmaceutical_drugs.indexOf(obj);
        this.model.pharmaceutical_drugs.splice(index, 1);
    }

    openAddSanitaryRegistration() {
        this.modalStakeHolderDialogRef = this.dialog.open(ModalStakeholderComponent,{
            hasBackdrop: false,
            data: {
                title: 'Titular registro sanitario',
                option: '6'
            }
        });

        this.modalStakeHolderDialogRef.afterClosed().pipe(filter((stakeHolder) => stakeHolder)).subscribe((stakeHolder) => {
            this.sanitary_registration_holder = stakeHolder;
            this.model.sanitary_registration_holder_id = stakeHolder.id;
        });
    }

    openAddSupplier() {
        this.modalStakeHolderDialogRef = this.dialog.open(ModalStakeholderComponent,{
            hasBackdrop: false,
            data: {
                title: 'Proveedores',
                option: '2'
            }
        });

        this.modalStakeHolderDialogRef.afterClosed().pipe(filter( (stakeHolder) => stakeHolder)).subscribe( (stakeHolder) => {
            this.supplier = stakeHolder;
            this.model.supplier_id = stakeHolder.id;
        });
    }

    openAddMaker() {
        this.modalStakeHolderDialogRef = this.dialog.open(ModalStakeholderComponent,{
            hasBackdrop: false,
            data: {
                title: 'Fabricantes',
                option: '4'
            }
        });

        this.modalStakeHolderDialogRef
        .afterClosed()
        .pipe(filter( (stakeHolder) => stakeHolder))
        .subscribe( (stakeHolder) => {
            this.manufacturer = stakeHolder;
            this.model.manufacturer_id = stakeHolder.id;
        });
    }

    openAddImporter() {
        this.modalStakeHolderDialogRef = this.dialog.open(ModalStakeholderComponent,{
            hasBackdrop: false,
            data: {
                title: 'Fabricantes',
                option: '5'
            }
        });

        this.modalStakeHolderDialogRef.afterClosed().pipe(filter( (stakeHolder) => stakeHolder)).subscribe( (stakeHolder) => {
            this.importer = stakeHolder;
            this.model.importer_id = stakeHolder.id;
        });
    }

}