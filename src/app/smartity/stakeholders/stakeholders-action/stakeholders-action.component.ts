import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MdSnackBar, MdDialogRef, MdDialog } from '@angular/material';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { StakeholdersComponent } from '../stakeholders.component';
import { BaseModel } from '../../bases/base-model';
import { ModalConfirmationComponent, ModalSucursalComponent, ModalResolutionComponent, ModalInstitucionalSaleContractComponent, ModalBankAccountComponent } from '../../modals';
import { filter } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'stakeholders-action-cmp',
    templateUrl: 'stakeholders-action.component.html'
})
export class StakeholdersActionComponent extends BaseModel implements OnInit {

    private _model: any = {
        stakeholders_info: {},
        comercial_stakeholders_info: {
            codes: {}
        },
        customer: {
            purchases_contact: {},
            debt_contact: {},
            shipping_points: [],
            institutional_sale_contract: [],
            controlled_resolution: []
        },
        employee: {},
        supplier: {
            bank_accounts: []
        },
        profile: {}
    }
    private document_number_digit = undefined;
    private countries: any[] = [];
    private country_id: any;
    private departments: any[] = [];
    private department_id: any;
    private cities: any[] = [];
    /**
     * Array para los combos
     */
    private tax_regime: any[] = [];
    private document_type: any[] = [];
    private document_type_n: any[] = [];
    private document_type_j: any[] = [];
    private persons_type: any[] = [];
    private conditions_payment: any[] = [];
    private portfolio_type: any[] = [];
    private sales_representatives: any[] = [];
    private suppliers_class: any[] = [];
    private customers_class: any[] = [];
    private payment_method: any[] = [];
    /**
     *  Modalas
     */
    private sucursalDialogRef: MdDialogRef<ModalSucursalComponent>;
    private confirmDialogRef: MdDialogRef<ModalConfirmationComponent>;
    private resolutionDialogRef: MdDialogRef<ModalResolutionComponent>;
    private institutionalSaleDialogRef: MdDialogRef<ModalInstitucionalSaleContractComponent>;
    private bankAccountDialogRef: MdDialogRef<ModalBankAccountComponent>;
    /**
     *
     */
    constructor(
        private loaderService: LoaderService,
        private helperService: HelperService,
        public snackBar: MdSnackBar,
        private comp: StakeholdersComponent,
        private dialog: MdDialog
    ) {
        super();
    }


    ngOnInit() {
        this.clean();
        this.getCollection();
        this.getSalesRepresentative();
        if (this.numId !== undefined) {
            this.getDataById();
        }
    }
    private getCollection() {
        this.loaderService.display(true);
        this.helperService.POST(`/api/collections`, ['COUNTRIES', 'TAX_REGIME', 'TYPES_OF_DOCUMENTS', 'PORTFOLIO_TYPE', 'PERSONS_TYPE', 'PAYMENT_CONDITION', 'SUPPLIERS_CLASS', 'CUSTOMERS_CLASS', 'PAYMENT_METHOD']).subscribe(rs => {
            const res = rs.json();
            this.countries = res.COUNTRIES;
            this.tax_regime = res.TAX_REGIME;
            var document_type = res.TYPES_OF_DOCUMENTS;
            this.portfolio_type = res.PORTFOLIO_TYPE;
            this.persons_type = res.PERSONS_TYPE;
            this.conditions_payment = res.PAYMENT_CONDITION;
            this.suppliers_class = res.SUPPLIERS_CLASS;
            this.customers_class = res.CUSTOMERS_CLASS;
            this.payment_method = res.PAYMENT_METHOD;
            document_type.filter(item => { if (item.value !== 'NIT') { this.document_type_n.push(item); } });
            document_type.filter(item => { if (item.value == 'NIT') { this.document_type_j.push(item); } });
            this.loaderService.display(false);
        }, err => {
            console.log(err);
            this.loaderService.display(false);
        });
    }
    private getSalesRepresentative() {
        this.loaderService.display(true);
        this.helperService.GET(`/api/sales_representatives?all=all`).subscribe(rs => {
            const res = rs.json();
            this.sales_representatives = res.data;
            this.loaderService.display(false);
        }, err => {
            console.log(err);
            this.loaderService.display(false);
        });
    }
    private getDepartments() {
        this.loaderService.display(true);
        this.helperService.GET(`/api/departamentos?pais_id=${this.country_id}`).subscribe(rs => {
            const res = rs.json();
            this.departments = res['departamentos'];
            this.loaderService.display(false);
        }, err => {
            console.log(err);
            this.loaderService.display(false);
        });
    }
    private getCities() {
        this.loaderService.display(true);
        this.helperService.GET(`/api/ciudades?departamento_id=${this.department_id}`).subscribe(rs => {
            const res = rs.json();
            this.cities = res['ciudades'];
            this.loaderService.display(false);
        }, err => {
            console.log(err);
            this.loaderService.display(false);
        });
    }
    private save() {
        this.loaderService.display(true);
        const formData: FormData = new FormData();
        formData.append('data', JSON.stringify(this._model));
        if (this._model.customer) {
            if (this._model.customer.institutional_sale_contract) {
                this._model.customer.institutional_sale_contract.forEach((obj) => {
                    if (obj.is_file === true) {
                        formData.append(obj.contract_number + '_file', obj.file);
                    }
                });
            }
        }


        switch (this.strAction) {
            case 'Guardar':
                this.helperService.POSTFORMDATA(`/api/stakeholders`, formData).subscribe(rs => {
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
                this.helperService.POSTFORMDATA(`/api/update_stake_holder/${this.numId}`, formData).subscribe(rs => {
                    const res = rs.json();
                    if (res.update) {
                        this.snackBar.open(res.message, 'Actualización', { duration: 4000 });
                        this.comp.openList();
                    }
                }, err => {
                    this.snackBar.open(err.message, 'Actualización', { duration: 4000 });
                    this.loaderService.display(true);
                });
                break;
            case 'Eliminar':
                this.helperService.DELETE(`/api/stakeholders/${this.numId}`).subscribe(rs => {
                    const res = rs.json();
                    if (res.delete) {
                        this.snackBar.open(res.message, 'Eliminación', { duration: 4000 });
                        this.comp.openList();
                    }
                }, err => {
                    this.snackBar.open(err.message, 'Eliminación', { duration: 4000 });
                    this.loaderService.display(true);
                });
                break;
        }

    }
    private getDataById(): void {
        this.loaderService.display(true);
        this.helperService.GET(`/api/stakeholders/${this.numId}`).subscribe(rs => {
            const res = rs.json();
            this._model = res['data'];
            this.selectPersonType();
            this.country_id = res.country_id;
            this.getDepartments();
            this.department_id = res.department_id;
            this.getCities();
            this.getRutDigit();
        }, err => {
            this.loaderService.display(false);
        });
    }
    private clean() {
        this._model = {
            stakeholders_info: {},
            comercial_stakeholders_info: {
                codes: {}
            },
            customer: {
                purchases_contact: {},
                debt_contact: {},
                shipping_points: [],
                institutional_sale_contract: [],
                controlled_resolution: []
            },
            employee: {},
            supplier: {
                bank_accounts: []
            },
            profile: {}
        }
    }
    private goList() {
        this.comp.openList();
    }
    private openAddSucursal() {
        this.sucursalDialogRef = this.dialog.open(ModalSucursalComponent, { hasBackdrop: false });
        this.sucursalDialogRef.afterClosed().pipe(filter((shipping_point) => shipping_point)).subscribe((shipping_point) => {
            this._model.customer.shipping_points.push(shipping_point);
        });
    }
    private removeSucursal(obj: any) {
        this.confirmDialogRef = this.dialog.open(ModalConfirmationComponent, {
            hasBackdrop: false, data: {
                message: 'Desea remover la sucursal?',
                title: 'Confirmar',
                button_confirm: 'Si',
                button_close: 'No'
            }
        });
        this.confirmDialogRef.afterClosed().subscribe((confirmation) => {
            if (confirmation) {
                const index = this._model.customer.shipping_points.indexOf(obj);
                this._model.customer.shipping_points.splice(index, 1);
            }
        });
    }
    private openAddControlledResolution() {
        this.resolutionDialogRef = this.dialog.open(ModalResolutionComponent, {
            hasBackdrop: false,
            data: {
                shipping_points: this._model.customer.shipping_points,
                title: 'Agregar Resolución de controlado'
            }
        });
        this.resolutionDialogRef.afterClosed().pipe(filter(ctr_resolution => ctr_resolution)).subscribe(ctr_resolution => {
            this._model.customer.controlled_resolution.push(ctr_resolution);
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

        this.resolutionDialogRef.afterClosed().subscribe(confirmation => {
            if (confirmation) {
                var index = this._model.customer.controlled_resolution.indexOf(obj);
                this._model.customer.controlled_resolution.splice(index, 1);
            }
        });

    }
    private openAddMonopolyResolution() {
        this.resolutionDialogRef = this.dialog.open(ModalResolutionComponent, {
            hasBackdrop: false,
            data: {
                shipping_points: this._model.customer.shipping_points,
                title: 'Agregar Resolución de monopolio'
            }
        });

        this.resolutionDialogRef.afterClosed().pipe(filter(mnp_resolution => mnp_resolution)).subscribe(mnp_resolution => {
            this._model.customer.monopoly_resolution.push(mnp_resolution);
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

        this.resolutionDialogRef.afterClosed().subscribe(confirmation => {
            if (confirmation) {
                var index = this._model.customer.monopoly_resolution.indexOf(obj);
                this._model.customer.monopoly_resolution.splice(index, 1);
            }
        });

    }
    private openAddInstitucionalSale() {
        this.institutionalSaleDialogRef = this.dialog.open(ModalInstitucionalSaleContractComponent, {
            hasBackdrop: false,
            data: {
                title: 'Agregar Contrato institucional'
            }
        });

        this.institutionalSaleDialogRef
            .afterClosed()
            .pipe(filter(institutional_sale_contract => institutional_sale_contract))
            .subscribe(institutional_sale_contract => {
                this._model.customer.institutional_sale_contract.push(institutional_sale_contract);
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
                    var index = this._model.customer.institutional_sale_contract.indexOf(obj);
                    this._model.customer.institutional_sale_contract.splice(index, 1);
                }
            });

    }
    private openAddBankAccount() {
        this.bankAccountDialogRef = this.dialog.open(ModalBankAccountComponent, {
            hasBackdrop: false,
            data: {
                title: 'Cuenta bancaria'
            }
        });

        this.bankAccountDialogRef.afterClosed().pipe(filter(bank_account => bank_account)).subscribe(bank_account => {
            this._model.supplier.bank_accounts.push(bank_account);
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

        this.bankAccountDialogRef.afterClosed().subscribe(confirmation => {
            if (confirmation) {
                var index = this._model.supplier.bank_accounts.indexOf(obj);
                this._model.supplier.bank_accounts.splice(index, 1);
            }
        });

    }
    private changeRut(value) {
        this.document_type = [];
        let data: any[] = [];
        this.document_type.forEach((item) => {
            if (this._model.stakeholders_info.rut === true && item.id === 14) {
                data.push(item);
            } else if (this._model.stakeholders_info.rut === false && (item.id === 13 || item.id === 12)) {
                data.push(item);
            }
        });
        this.document_type = data;
    }
    private zero_fill(i_valor, num_ceros) {
        let relleno = '';
        let i = 1;
        let salir = 0;
        while (!salir) {
            let total_caracteres = i_valor.length + i;
            if (i > num_ceros || total_caracteres > num_ceros) {
                salir = 1;
            } else {
                relleno = relleno + "0";
            }
            i++
        }

        i_valor = relleno + i_valor
        return i_valor
    }
    private getRutDigit() {
        if (this._model.stakeholders_info.document_type_id == 14) {
            let i_rut = this._model.stakeholders_info.document_number;
            let pesos = [71, 67, 59, 53, 47, 43, 41, 37, 29, 23, 19, 17, 13, 7, 3];
            let rut_fmt = this.zero_fill(i_rut, 15)
            let suma = 0;
            let digitov;
            for (let i = 0; i <= 14; i++) {
                suma += rut_fmt.substring(i, i + 1) * pesos[i];
            }

            let resto = suma % 11;
            if (resto === 0 || resto === 1) {
                digitov = resto;
            } else {
                digitov = 11 - resto;
            }

            this.document_number_digit = digitov;
        } else {
            this.document_number_digit = undefined;
        }
    }
    private selectPersonType() {
        //this._model.stakeholders_info.document_type_id = undefined;
        if (this._model.stakeholders_info.person_type_id == 39) {
            this.document_type = this.document_type_j;
        } else {
            this.document_type = this.document_type_n;
        }
    }

}
