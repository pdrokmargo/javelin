import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA, MdSnackBar } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoaderService, HelperService } from '../../../shared';
import { Response } from '@angular/http';
import { isNumber, isNullOrUndefined } from 'util';
import { BaseList } from '../../bases/base-list';

@Component({
    templateUrl: './modal-stakeholder.component.html'
})

export class ModalStakeholderComponent {

    private model: any;
    private option = '';
    radio = {
        option: '1',
    };

    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MdDialogRef<ModalStakeholderComponent>,
        @Inject(MD_DIALOG_DATA) private data
    ) { 
        this.option = data.option;
    }

    add() {
        this.dialogRef.close(this.model);
    }

    private select(row: any) {
        this.model = row;
    }

}