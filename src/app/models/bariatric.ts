import { Step } from './step';

//import * as data from './bariatric.json';

export class Bariatric {
    funnel: Step[] = [];

    constructor(steps:any) {
        //const json = <any>data;
        steps.forEach(el => {
            let step = new Step(el);
            this.funnel.push(el);
        });
    }
}
