import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import { MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';
import { filter } from 'rxjs/operators';
import { ModalSucursalComponent, ModalConfirmationComponent, ModalResolutionComponent, ModalInstitucionalSaleContractComponent, ModalBankAccountComponent } from '../..';
import { BaseModel } from '../../../bases/base-model';
import { LoaderService, HelperService } from '../../../../shared';

@Component({
    selector: 'customers-action-cmp',
    templateUrl: 'customers-action.component.html',
    styles: [
        `
        h2 {
          width: 100%;
          border-top: 1px solid #ccc !important;
          padding: 20px 0 !important;
          margin: 20px 0 !important;
        }
        .justify-content-end { display: flex;justify-content: flex-end;}
      `
    ]
})
export class CustomersActionComponent extends BaseModel implements OnInit {
    
    @Output() select = new EventEmitter();
    @Input() type: string;
    private countries: any[] = [];
    private departments: any[] = [];
    private cities: any[] = [];
    private countries_customer: any[] = [];
    private departments_customer: any[] = [];
    private cities_customer: any[] = [];
    private tax_regime: any[] = [];
    private withholding: any[] = [];
    private document_type: any[] = [];
    private document_type_n: any[] = [];
    private document_type_j: any[] = [];
    private persons_type: any[] = [];
    private action_active: boolean = false;
    private str_action: string = 'Guardar';
    private comercial_stakeholders_info: any = {};
    private customer: any = {};
    private supplier: any = {};
    private seller: any = {};
    private sucursalDialogRef: MatDialogRef<ModalSucursalComponent>;
    private confirmDialogRef: MatDialogRef<ModalConfirmationComponent>;
    private resolutionDialogRef: MatDialogRef<ModalResolutionComponent>;
    private institutionalSaleDialogRef: MatDialogRef<ModalInstitucionalSaleContractComponent>;
    private bankAccountDialogRef: MatDialogRef<ModalBankAccountComponent>;
    private conditions_payment: any[] = [];
    private portfolio_type: any[] = [];
    private sales_representatives: any[] = [];
    private suppliers_class: any[] = [];
    private customers_class: any[] = [];

    /**
     *
     */
    constructor(private loaderService: LoaderService,
        private helperService: HelperService,
        public snackBar: MatSnackBar,
        private dialog: MatDialog) {
        super();

    }

    ngOnInit() {

        this.clean();
        this.getCollection();
        this.getSalesRepresentative();
        this.model.is_customer = false;
        this.model.is_supplier = false;
        this.model.is_seller = false;
        this.model.is_employee = false;

        this.str_action = 'Guardar';
    }

    /**
     * get the country and the tax regime with the collection of names
     */
    private getCollection() {
        this.loaderService.display(true);
        this.helperService.POST(`/api/collections`, ['COUNTRIES', 'TAX_REGIME',
            'TYPES_OF_DOCUMENTS', 'PORTFOLIO_TYPE', 'PERSONS_TYPE', 'PAYMENT_CONDITION',
            'SUPPLIERS_CLASS', 'CUSTOMERS_CLASS'])
            .map((response: Response) => {

                const res = response.json();
                this.countries = res.COUNTRIES;
                this.tax_regime = res.TAX_REGIME;
                var document_type = res.TYPES_OF_DOCUMENTS;
                this.portfolio_type = res.PORTFOLIO_TYPE;
                this.persons_type = res.PERSONS_TYPE;
                this.conditions_payment = res.PAYMENT_CONDITION;
                this.suppliers_class = res.SUPPLIERS_CLASS;
                this.customers_class = res.CUSTOMERS_CLASS;

                document_type.filter(item => {
                    if (item.value !== 'NIT') {
                        this.document_type_n.push(item);
                    }
                });
                document_type.filter(item => {
                    if (item.value == 'NIT') {
                        this.document_type_j.push(item);
                    }
                });
            }).subscribe(
                (error) => {
                    this.loaderService.display(false);
                },
                (done) => {
                    this.loaderService.display(false);
                });
    }

    private getSalesRepresentative() {
        this.loaderService.display(true);
        this.helperService.GET(`/api/sales_representatives?all=all`)
            .map((response: Response) => {

                const res = response.json();
                this.sales_representatives = res.data;

            }).subscribe(
                (error) => {
                    this.loaderService.display(false);
                },
                (done) => {
                    this.loaderService.display(false);
                });
    }

    private getDepartments() {
        this.loaderService.display(true);
        this.helperService.GET(`/api/departamentos?pais_id=${this.model.country_id}`)
            .map((response: Response) => {

                const res = response.json();
                this.departments = res['departamentos'];

            }).subscribe(
                (error) => {
                    this.loaderService.display(false);
                },
                (done) => {
                    this.loaderService.display(false);
                });
    }

    private getCities() {
        this.loaderService.display(true);
        this.helperService.GET(`/api/ciudades?departamento_id=${this.model.department_id}`)
            .map((response: Response) => {

                const res = response.json();
                this.cities = res['ciudades'];

            }).subscribe(
                (error) => {
                    this.loaderService.display(false);
                },
                (done) => {
                    this.loaderService.display(false);
                });
    }

    private save() {

        /** Create */
        this.model.customer = this.customer;
        this.model.comercial_stakeholders_info = this.comercial_stakeholders_info;
        this.model.supplier = this.supplier;

        const formData: FormData = new FormData();
        formData.append('data', JSON.stringify(this.model));
        if (this.model.customer.institutional_sale_contract !== null) {
            this.model.customer.institutional_sale_contract.forEach((obj) => {
                if (obj.is_file === true) {
                    formData.append(obj.contract_number + '_file', obj.file);
                }
            });
        }

        this.loaderService.display(true);
        this.helperService.POSTFORMDATA(`/api/stakeholders`, formData)
            .map((response: Response) => {

                const res = response.json();
                if (res.status === 'success') {
                    this.snackBar.open(res.message, 'Guardado', {
                        duration: 3500,
                    });
                    this.clean();
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



    private clean() {
        this.cities = [];
        this.departments = [];
        this.model = {};
        this.model.id = '';
        this.model.rut = false;
        this.model.big_contributor = true;
        this.model.selfholder = true;

        this.comercial_stakeholders_info = {};
        this.comercial_stakeholders_info.codes = {};
        this.comercial_stakeholders_info.retention_for_rent = false;
        this.comercial_stakeholders_info.big_contributor = false;

        this.customer.purchases_contact = {};
        this.customer.debt_contact = {};
        this.customer.institutional_sale_contract = [];
        this.customer.controlled_resolution = [];
        this.customer.monopoly_resolution = [];
        this.customer.shipping_points = [];
        this.customer.credit_limit_blocking = false;
        this.customer.late_payment_blocking = false;

        this.supplier.bank_accounts = [];
        this.supplier.sales_contact = {};
        this.supplier.purchase_order = false;

        this.model.is_customer = false;
        this.model.is_supplier = false;
        this.model.is_seller = false;
        this.model.is_employee = false;
        this.model.is_holder_sanitary = false;
        this.model.is_maker = false;
        this.model.is_importer = false;

    }

    openAddSucursal() {
        this.sucursalDialogRef = this.dialog.open(ModalSucursalComponent, {
            hasBackdrop: false,
            // height: 'auto',
            // width: '700px',
        });

        this.sucursalDialogRef
            .afterClosed()
            .pipe(filter((shipping_point) => shipping_point))
            .subscribe((shipping_point) => {
                this.customer.shipping_points.push(shipping_point);
            });

    }

    private checked(opcion: any) {
        if (opcion === 1) {
            this.model.is_customer = !this.model.is_customer;
        } else if (opcion === 2) {
            this.model.is_supplier = !this.model.is_supplier;
        } else if (opcion === 3) {
            this.model.is_seller = !this.model.is_seller;
        } else if (opcion === 4) {
            this.model.is_employee = !this.model.is_employee;
        } else if (opcion === 5) {
            this.model.is_holder_sanitary = !this.model.is_holder_sanitary;
        } else if (opcion === 6) {
            this.model.is_maker = !this.model.is_maker;
        } else if (opcion === 7) {
            this.model.is_importer = !this.model.is_importer;
        }

    }

    private removeSucursal(obj: any) {

        this.confirmDialogRef = this.dialog.open(ModalConfirmationComponent, {
            hasBackdrop: false,
            data: {
                message: 'Desea remover la sucursal?',
                title: 'Confirmar',
                button_confirm: 'Si',
                button_close: 'No'
            }
        });

        this.confirmDialogRef
            .afterClosed()
            // .pipe(filter(confirmation => confirmation))
            .subscribe((confirmation) => {
                if (confirmation) {
                    const index = this.customer.shipping_points.indexOf(obj);
                    this.customer.shipping_points.splice(index, 1);
                }
            });

    }

    openAddControlledResolution() {
        this.resolutionDialogRef = this.dialog.open(ModalResolutionComponent, {
            hasBackdrop: false,
            data: {
                shipping_points: this.customer.shipping_points,
                title: 'Agregar Resolución de controlado'
            }
            // height: 'auto',
            // width: '700px',
        });

        this.resolutionDialogRef
            .afterClosed()
            .pipe(filter(ctr_resolution => ctr_resolution))
            .subscribe(ctr_resolution => {
                this.customer.controlled_resolution.push(ctr_resolution);
            });

    }

    private removeControlledResolution(obj: any) {

        this.resolutionDialogRef = this.dialog.open(ModalResolutionComponent, {
            hasBackdrop: false,
            data: {
                message: 'Desea remover el registro?',
                title: 'Confirmar',
                button_confirm: 'Si',
                button_close: 'No'
            }
        });

        this.resolutionDialogRef
            .afterClosed()
            // .pipe(filter(confirmation => confirmation))
            .subscribe(confirmation => {
                if (confirmation) {
                    var index = this.customer.controlled_resolution.indexOf(obj);
                    this.customer.controlled_resolution.splice(index, 1);
                }
            });

    }

    openAddMonopolyResolution() {

        this.resolutionDialogRef = this.dialog.open(ModalResolutionComponent, {
            hasBackdrop: false,
            data: {
                shipping_points: this.customer.shipping_points,
                title: 'Agregar Resolución de monopolio'
            }
            // height: 'auto',
            // width: '700px',
        });

        this.resolutionDialogRef
            .afterClosed()
            .pipe(filter(mnp_resolution => mnp_resolution))
            .subscribe(mnp_resolution => {
                this.customer.monopoly_resolution.push(mnp_resolution);
            });

    }

    private removeMonopolyResolution(obj: any) {

        this.resolutionDialogRef = this.dialog.open(ModalResolutionComponent, {
            hasBackdrop: false,
            data: {
                message: 'Desea remover el registro?',
                title: 'Confirmar',
                button_confirm: 'Si',
                button_close: 'No'
            }
        });

        this.resolutionDialogRef
            .afterClosed()
            // .pipe(filter(confirmation => confirmation))
            .subscribe(confirmation => {
                if (confirmation) {
                    var index = this.customer.monopoly_resolution.indexOf(obj);
                    this.customer.monopoly_resolution.splice(index, 1);
                }
            });

    }

    openAddInstitucionalSale() {
        this.institutionalSaleDialogRef = this.dialog.open(ModalInstitucionalSaleContractComponent, {
            hasBackdrop: false,
            data: {
                title: 'Agregar Contrato institucional'
            }
            // height: 'auto',
            // width: '700px',
        });

        this.institutionalSaleDialogRef
            .afterClosed()
            .pipe(filter(institutional_sale_contract => institutional_sale_contract))
            .subscribe(institutional_sale_contract => {
                this.customer.institutional_sale_contract.push(institutional_sale_contract);
            });
    }

    private removeInstitucionalSale(obj: any) {

        this.institutionalSaleDialogRef = this.dialog.open(ModalInstitucionalSaleContractComponent, {
            hasBackdrop: false,
            data: {
                message: 'Desea remover el registro?',
                title: 'Confirmar',
                button_confirm: 'Si',
                button_close: 'No'
            }
        });

        this.institutionalSaleDialogRef
            .afterClosed()
            // .pipe(filter(confirmation => confirmation))
            .subscribe(confirmation => {
                if (confirmation) {
                    var index = this.customer.institutional_sale_contract.indexOf(obj);
                    this.customer.institutional_sale_contract.splice(index, 1);
                }
            });

    }

    openAddBankAccount() {
        this.bankAccountDialogRef = this.dialog.open(ModalBankAccountComponent, {
            hasBackdrop: false,
            data: {
                title: 'Cuenta bancaria'
            }
            // height: 'auto',
            // width: '700px',
        });

        this.bankAccountDialogRef
            .afterClosed()
            .pipe(filter(bank_account => bank_account))
            .subscribe(bank_account => {
                this.supplier.bank_accounts.push(bank_account);
            });
    }

    private removeBankAccount(obj: any) {

        this.bankAccountDialogRef = this.dialog.open(ModalBankAccountComponent, {
            hasBackdrop: false,
            data: {
                message: 'Desea remover el registro?',
                title: 'Confirmar',
                button_confirm: 'Si',
                button_close: 'No'
            }
        });

        this.bankAccountDialogRef
            .afterClosed()
            // .pipe(filter(confirmation => confirmation))
            .subscribe(confirmation => {
                if (confirmation) {
                    var index = this.supplier.bank_accounts.indexOf(obj);
                    this.supplier.bank_accounts.splice(index, 1);
                }
            });

    }

    private selectPersonType() {
        if (this.model.person_type_id == 39) {
            this.model.rut = true;
            this.document_type = this.document_type_j;
        } else {
            this.model.rut = false;
            this.document_type = this.document_type_n;
        }
    }

} 
