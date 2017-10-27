export class Weight {
    kg: any;
    lb: any;

    constructor( kg?: any, lb?: any) {
        this.kg = kg || {
            default: 70,
            min: 50,
            max: 250,
            step: 1,
            thumbLabel: true,
            tickInterval: false
        };
        this.lb = lb || {
            default: 154,
            min: 110,
            max: 550,
            step: 1,
            thumbLabel: true,
            tickInterval: false
        };
    }
}