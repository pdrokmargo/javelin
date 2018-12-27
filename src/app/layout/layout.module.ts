import { NgModule } from '@angular/core';

import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from '../shared/shared.module';
import { 
  MatIconModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  NativeDateModule,
  MatMenuModule,
  MatDialogModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatSlideToggleModule,
  MatButtonModule,
  MatInputModule,
  MatSnackBarModule,
  MatFormFieldModule,

} from '@angular/material';



@NgModule({
  imports: [
    LayoutRoutingModule,
    SharedModule,
    MatIconModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  NativeDateModule,
  MatMenuModule,
  MatDialogModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatSlideToggleModule,
  MatButtonModule,
  MatInputModule,
  MatSnackBarModule,
  MatFormFieldModule,
  ],
  declarations: []
})

export class LayoutModule {}
