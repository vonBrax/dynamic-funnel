import {
  Directive,
  AfterViewInit,
  ElementRef,
  Host,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
  Output,
  EventEmitter
} from '@angular/core';
import { NgControl } from '@angular/forms';

// tslint:disable-next-line:directive-selector
@Directive({selector: '[convertUnits]'})
export class ConvertUnitsDirective {

  private _children: ConvertUnitsInputDirective[] = [];

  // tslint:disable-next-line:no-input-rename
  @Input('convertUnits') dimension: string;
  @Output() valueChanged: EventEmitter<any> = new EventEmitter<any>();

  private _constants = {
    'in': 12,
    'lbs': 14
  };

  constructor() { }

  updateValues(smallChild: ConvertUnitsInputDirective): void {
    const bigChild = this._children.filter(input => input !== smallChild);
    if (!bigChild) {
      return;
    }
    const bigChildValue = bigChild[0].element.value;
    const curr = +smallChild.element.value;
    const constant = this._constants[smallChild.unit];

    let emitValue = 0;

    if (curr < constant && bigChildValue) {
      emitValue = +bigChildValue * constant + +smallChild.element.value;
      this.valueChanged.emit({value: emitValue, dimension: this.dimension});
      return;
    }
    const big = Math.floor(curr / constant);
    const small = curr % constant;
    bigChild[0].control.control.setValue(big);
    smallChild.control.control.setValue(small);
    this.valueChanged.emit({value: curr, dimension: this.dimension});
  }
  registerChild(child: ConvertUnitsInputDirective): void {
    this._children.push(child);
  }
}

// tslint:disable-next-line:directive-selector
@Directive({selector: '[convertUnitsInput]'})
export class ConvertUnitsInputDirective implements AfterViewInit {

  element: HTMLInputElement;
  control: NgControl;
  // tslint:disable-next-line:no-input-rename
  @Input('convertUnitsInput') unit: string;

  constructor(
    el: ElementRef,
    private renderer: Renderer2,
    control: NgControl,
    @Host() private convertUnits: ConvertUnitsDirective
  ) {
    this.element = el.nativeElement;
    this.control = control;
    this.convertUnits.registerChild(this);
  }

  ngAfterViewInit() {
    if (this.unit === 'in' || this.unit === 'lbs') {
      this.renderer.listen(this.element, 'change', () => this.onChange() );
    }
  }

  onChange() {
    this.convertUnits.updateValues(this);
  }


}
