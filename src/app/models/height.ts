export class Height {
    cm: any;

    in: any;

  constructor( cm?: any, _in?: any ) {
    
    this.cm = cm || {
      default: 150,
      min: 100,
      max: 220,
      step: 1,
      thumbLabel: true,
      tickInterval: false
    };

    this.in = _in || {
      default: 60,
      min: 36,
      max: 84,
      step: 1,
      thumbLabel: true,
      tickInterval: 12
    };
  }

}