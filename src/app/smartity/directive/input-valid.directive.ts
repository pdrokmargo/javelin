import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Directive({
    selector: '[inputValid][ngModel]',
})

export class InputValidDirective  {

    
    @Input() set inputValid(b: boolean) {
        if(b != undefined){
            console.log(b);
            this.formControl.control.setErrors(b ? { "inputValid": true  } : null);
            console.log(this.formControl.control.errors);
        }
    };

    constructor(public formControl: NgControl) {
        this.formControl.control.setErrors({ "inputValid": true  });
    }
}