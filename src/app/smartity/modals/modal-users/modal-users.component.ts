import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { isNumber, isNullOrUndefined } from 'util';
import { BaseList } from '../../bases/base-list';

@Component({
    templateUrl: './modal-users.component.html'
})

export class ModalUsersComponent {

    private model: any;
    radio = {
        option: '1',
    };

    constructor(
        public formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<ModalUsersComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) { 
        console.log(data.type);        
    }

    add() {
        this.dialogRef.close(this.model);
    }

    private select(row: any) {
        this.model = row;
    }

}
