
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-supplier-quotes',
  templateUrl: './modal-supplier-quotes.component.html'
})
export class ModalSupplierQuotesComponent implements OnInit {

  private model: any;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ModalSupplierQuotesComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) { }

  ngOnInit() {
  }

  add() {
    this.dialogRef.close(this.model);
  }

  private select(row: any) {
    this.model = row;
  }

}

