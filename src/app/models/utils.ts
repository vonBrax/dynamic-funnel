// TODO: Rename this class and move it to the services folder

import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { EmailValidatorService } from '../services/email.validator.service';

@Injectable()
export class Utils {

    constructor(private emailValidator: EmailValidatorService, private fb: FormBuilder) {}

    public createSingleControl(val: any, rules: any): FormControl {
        const validatorsArr: ValidatorFn[] = this.createValidators(rules);
        // return this.fb.control(val, Validators.compose(validators));

        const ctrl = new FormControl('', {
            validators: Validators.compose(validatorsArr),
            updateOn: 'blur'
        });

        // return new FormControl( val, Validators.compose(validatorsArr));
        return ctrl;
    }

    private createValidators(rules: any): ValidatorFn[] {
        if (!rules) {
            return;
        }
        const arr = [];
            rules.forEach(rule => {
                if (rule === 'email') {
                    arr.push(this.emailValidator.validate());
                } else {
                    arr.push(Validators[rule]);
                }
        });
        return arr;
    }
}
