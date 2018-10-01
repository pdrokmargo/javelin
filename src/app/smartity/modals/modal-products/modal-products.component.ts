import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: './modal-products.component.html',
})
export class ModalProductsComponent {

  private model: any;
  radio = {
    option: '1',
  };

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MdDialogRef<ModalProductsComponent>,
    @Inject(MD_DIALOG_DATA) private data
  ) { }

  add() {
    this.dialogRef.close(this.model);
  }

  private select(row: any) {
    this.model = row;
  }

}
