import { Directive, Input, Output } from '@angular/core';
import { AsyncValidator, NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { HelperService } from '../../shared';

@Directive({
    selector: '[userEmailValid][formControlName],[userEmailValid][formControl],[userEmailValid][ngModel]',
    providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: UserEmailValid, multi: true }]
})
export class UserEmailValid implements AsyncValidator {

    @Input() userEmailValid: string;

    constructor(private service: HelperService) { }

    validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        if (this.validateEmail(control.value)) {

            return this.service.GET(`/api/users/search/by/email/${control.value}`).map(response => {
                if (this.userEmailValid) {
                    if (this.userEmailValid == control.value) {
                        return null;
                    }
                }
                let res = response.json()["data"];
                return (res && res.length > 0) ? { "userEmailValid": true } : null;
            });

        }
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
} 