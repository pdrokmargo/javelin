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
import { ModalPharmaceuticalComponent, ModalStakeHolderComponent } from '../../modals';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'product-action-cmp',
    templateUrl: './product-action.component.html',
    styles: []
})

export class ProductActionComponent extends BaseModel implements OnInit {

    private action_active: boolean = false;
    private str_action: string = 'Guardar';
    private content_unit: any[] = [];
    private product_type: any[] = [];
    private makers: any[] = [];
    private importers: any[] = [];
    private suppliers: any[] = [];
    private healthrecordholder: any[] = [];
    private pharmaceuticalDialogRef: MdDialogRef<ModalPharmaceuticalComponent>;
    private modalStakeHolderDialogRef: MdDialogRef<ModalStakeHolderComponent>;

    constructor(private loaderService: LoaderService,
                private helperService: HelperService,
                public snackBar: MdSnackBar,
                private route: ActivatedRoute,
                private router: Router,
                private comp: ProductComponent,
                private dialog: MdDialog) {
        super();
        // paramatro enviado desde la url

    }

    ngOnInit() {
        this.clean();
        this.getCollection();
        this.getMaker();
        this.getImporter();
        this.getSupplier();
        this.getHealthRecordHolder();

        if (this.numId != null && this.numId !== '') {
            // this.numId=this.route.snapshot.params['id'];
            this.str_action = 'Actualizar';
            this.getDataById();
        } else {
            this.str_action = 'Guardar';
        }
    }

    /**
     * get the country and the tax regime with the collection of names
     */
    private getCollection(){
        this.loaderService.display(true);
        this.helperService.POST(`/api/collections`, ['CONTENT_UNIT', 'PRODUCT_TYPE'])
        .map((response: Response) => {

            const res = response.json();
            this.content_unit = res.CONTENT_UNIT;
            this.product_type = res.PRODUCT_TYPE;

        }).subscribe(
            (error) => {
                this.loaderService.display(false);
            },
            (done) => {
                this.loaderService.display(false);
            });
    }

    private getMaker() {
        this.loaderService.display(true);
        this.helperService.GET(`/api/maker`)
        .map((response: Response) => {

            const res = response.json();
            this.makers = res.data;

        }).subscribe(
            (error) =>{
                this.loaderService.display(false);
            },
            (done) => {
                this.loaderService.display(false);
            });
    }

    private getImporter(){
        this.loaderService.display(true);
        this.helperService.GET(`/api/importer`)
        .map((response: Response) => {

            const res = response.json();
            this.importers = res.data;

        }).subscribe(
            (error) => {
                this.loaderService.display(false);
            },
            (done) => {
                this.loaderService.display(false);
            });
    }

    private getSupplier(){
        this.loaderService.display(true);
        this.helperService.GET(`/api/supplier`)
        .map((response: Response) => {

            const res = response.json();
            this.suppliers = res.data;

        }).subscribe(
            (error) => {
                this.loaderService.display(false);
            },
            (done) => {
                this.loaderService.display(false);
            });
    }

    private getHealthRecordHolder() {
        this.loaderService.display(true);
        this.helperService.GET(`/api/healthrecordholder`)
        .map((response: Response) => {

            const res = response.json();
            this.healthrecordholder = res.data;

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
        if (this.model.id > 0) {
            this.loaderService.display(true);
            this.helperService.PUT(`/api/product/${this.numId}`, this.model)
            .map((response: Response) => {

                const res = response.json();
                if (res.status === 'success') {
                    this.snackBar.open(res.message, 'Actualización', {
                        duration: 3500,
                    });
                    // this.router.navigate(['app/product-list']);
                    this.comp.openList();
                }

            }).subscribe(
                (error) =>{
                    this.loaderService.display(false);
                },
                (done) => {
                    this.loaderService.display(false);
                });
        } else {
            /** Create */
            this.loaderService.display(true);
            this.helperService.POST(`/api/product`, this.model)
            .map((response: Response) => {

                const res = response.json();
                if (res.status === 'success') {
                    this.snackBar.open(res.message, 'Guardado', {
                        duration: 3500,
                    });
                    this.clean();
                    this.goList();
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
        this.helperService.GET(`/api/product/${this.numId}`)
        .map((response: Response) => {

            const res = response.json();
            this.model = res['data'];

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
            this.model.pharmaceutical_drugs.push(pharmaceuticalDrug);
        });
    }

    removePharmaceutical(obj) {
        const index = this.model.pharmaceutical_drugs.indexOf(obj);
        this.model.pharmaceutical_drugs.splice(index, 1);
    }

    openAddSanitaryRegistration() {
        this.modalStakeHolderDialogRef = this.dialog.open(ModalStakeHolderComponent,{
            hasBackdrop: false,
            data: {
                title: 'Titular registro sanitario',
                option: '6'
            }
        });

        this.modalStakeHolderDialogRef
        .afterClosed()
        .pipe(filter( (stakeHolder) => stakeHolder))
        .subscribe( (stakeHolder) => {
            this.model.sanitary_registration_holder_id = stakeHolder.x_id;
        });
    }

    openAddSupplier() {
        this.modalStakeHolderDialogRef = this.dialog.open(ModalStakeHolderComponent,{
            hasBackdrop: false,
            data: {
                title: 'Proveedores',
                option: '2'
            }
        });

        this.modalStakeHolderDialogRef
        .afterClosed()
        .pipe(filter( (stakeHolder) => stakeHolder))
        .subscribe( (stakeHolder) => {
            this.model.supplier_id = stakeHolder.x_id;
        });
    }

    openAddMaker() {
        this.modalStakeHolderDialogRef = this.dialog.open(ModalStakeHolderComponent,{
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
            this.model.manufacturer_id = stakeHolder.x_id;
        });
    }

    openAddImporter() {
        this.modalStakeHolderDialogRef = this.dialog.open(ModalStakeHolderComponent,{
            hasBackdrop: false,
            data: {
                title: 'Fabricantes',
                option: '5'
            }
        });

        this.modalStakeHolderDialogRef
        .afterClosed()
        .pipe(filter( (stakeHolder) => stakeHolder))
        .subscribe( (stakeHolder) => {
            this.model.importer_id = stakeHolder.x_id;
        });
    }

}