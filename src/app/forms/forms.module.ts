import { NgModule } from '@angular/core';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormsRoutingModule } from './forms-routing.module';
import { FormsComponent } from './forms.component';

import { FormAutocompleteComponent } from './autocomplete/autocomplete.component';
import { FormCheckboxComponent } from './checkbox/checkbox.component';
import { FormChipsComponent } from './chips/chips.component';
import { FormDatepickerComponent } from './datepicker/datepicker.component';
import { FormInputComponent } from './input/input.component';
import { FormRadioButtonComponent } from './radio-button/radio-button.component';
import { FormSelectComponent } from './select/select.component';
import { FormSlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { FormSliderComponent } from './slider/slider.component';

import { FormComponentsComponent } from './components.component';
import { FormLayoutsComponent } from './layouts/layouts.component';
import { FormValidationComponent } from './validation/validation.component';

@NgModule({
  imports: [
    MaterialModule,
    MdNativeDateModule,
    FormsRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FormsComponent,
    FormAutocompleteComponent,
    FormCheckboxComponent,
    FormChipsComponent,
    FormDatepickerComponent,
    FormInputComponent,
    FormRadioButtonComponent,
    FormSelectComponent,
    FormSlideToggleComponent,
    FormSliderComponent,
    FormComponentsComponent,
    FormLayoutsComponent,
    FormValidationComponent,
  ]
})

export class MyFormsModule {}
