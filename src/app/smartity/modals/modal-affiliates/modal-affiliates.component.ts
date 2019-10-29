import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-affiliates',
  templateUrl: './modal-affiliates.component.html'
})
export class ModalAffiliatesComponent implements OnInit {

  private model: any;
  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ModalAffiliatesComponent>,
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
