import { FormBuilder, FormControl, Validators, ValidatorFn } from '@angular/forms';

export class Utils {

    public static createSingleControl(val:any, rules: any): FormControl {
        let fb = new FormBuilder();
        let validators: ValidatorFn[] = Utils.createValidators(rules);
        return fb.control(val, Validators.compose(validators)) ;
    }

    public static createValidators(rules: any): ValidatorFn[] {
        
        if(!rules) {
            return;
        }
        
        let arr = [];
            rules.forEach(rule => {
            arr.push(Validators[rule]);
        });
        return arr;
    }
}
