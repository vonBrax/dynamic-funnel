import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Utils } from '../../../models/utils';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.css']
})
export class ButtonToggleComponent implements OnInit, OnDestroy {

  @Input()
  parentGroup: FormGroup;
  @Input()
  data: any;
  @Output()
  buttonToggleEvent: EventEmitter<MouseEvent|KeyboardEvent> = new EventEmitter();
  @Output()
  addControlEvent: EventEmitter<any> = new EventEmitter();

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  get formControl(): FormControl {
    return this.parentGroup.get(this.data.name) as FormControl;
  }

  constructor() { }

  ngOnInit() {
    this.addControlEvent.emit({
      name: this.data.name,
      control: Utils.createSingleControl(this.data.default, this.data.validators),
      parent: true
    });
    this.onChanges();
  }

  onChanges() {
    this.formControl.valueChanges
      .takeUntil(this.ngUnsubscribe)
      .subscribe(val => {
        this.buttonToggleEvent.emit(val);
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
