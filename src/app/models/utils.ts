// TODO: Rename this class and move it to the services folder

import { Injectable } from '@angular/core';
import { FormControl, Validators, ValidatorFn, FormBuilder } from '@angular/forms';
import { EmailValidatorService } from '../services/email.validator.service';

/** TODO: REMOVE ONCE ANGULAR FIX IT (TYPE NOT YET EXPORTED!) */
export type FormHooks = 'change' | 'blur' | 'submit';

@Injectable()
export class Utils {

    constructor(private emailValidator: EmailValidatorService, private fb: FormBuilder) {}

    public createSingleControl(val: string, rules: string[], updateOn: FormHooks = 'change' ): FormControl {
        const validatorsArr: ValidatorFn[] = this.createValidators(rules);
        const ctrl = new FormControl(val, {validators: Validators.compose(validatorsArr), updateOn: updateOn });
        // return new FormControl(val, {validators: Validators.compose(validatorsArr), updateOn: updateOn});
        // return this.fb.control(val, { validators: Validators.compose(validatorsArr), updateOn: 'blur'});
        return ctrl;
    }

    private createValidators(rules: string[]): ValidatorFn[] {
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
