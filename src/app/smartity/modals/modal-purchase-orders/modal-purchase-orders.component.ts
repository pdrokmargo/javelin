import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-purchase-orders',
  templateUrl: './modal-purchase-orders.component.html'
})
export class ModalPurchaseOrdersComponent implements OnInit {

  private model: any;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ModalPurchaseOrdersComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) { }

  ngOnInit() {
  }

  add() {
    this.dialogRef.close(this.model);
  }

  private select(row: any) {
    this.model = row;
    console.log(row);
  }
}
