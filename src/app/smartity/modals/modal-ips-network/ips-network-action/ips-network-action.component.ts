import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from "@angular/core";
import { DataTableResource } from "angular-4-data-table";
import { FormControl } from "@angular/forms";
import "rxjs/add/operator/startWith";
import { MatSnackBar, MatDialogRef, MatDialog } from "@angular/material";
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';
import { filter } from 'rxjs/operators';
import { BaseModel } from '../../../bases/base-model';
import { LoaderService, HelperService } from '../../../../shared';

@Component({
    selector: "ips-network-action-cmp",
    templateUrl: "ips-network-action.component.html",
    styles: []
})

export class IpsNetworkActionComponent extends BaseModel implements OnInit {

    @Output() select = new EventEmitter();

    private action_active: boolean;
    private str_action: string = 'Guardar';

    constructor(public snackBar: MatSnackBar,
        private loaderService: LoaderService,
        private helperService: HelperService,
        private dialog: MatDialog
    ) {
        super();
    }


    ngOnInit() {
        this.clean();
        this.str_action = 'Guardar';

    }





    private save() {

        this.model.delivery_contracts = '';
        this.loaderService.display(true);
        this.helperService.POST(`/api/ips-network`, this.model)
            .subscribe(rs => {

                let res = rs.json();
                if (res.store) {
                    this.snackBar.open(res.message, 'Guardado', {
                        duration: 3500,
                    });
                    this.clean();
                    this.loaderService.display(false);
                }

            }, err => {
                this.loaderService.display(false);
            });



    }

    

    private clean() {
        this.model = {};
        this.model.state = true;
    }


}