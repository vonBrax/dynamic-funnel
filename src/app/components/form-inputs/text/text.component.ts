import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Utils } from '../../../models/utils';


@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {

  @Input()
  data: any;

  @Input()
  parentGroup: FormGroup;

  @Output()
  addControlEvent: EventEmitter<any> = new EventEmitter();

  constructor(private utils: Utils) { }

  ngOnInit() {
    this.addControlEvent.emit({name: this.data.name, control:  this.utils.createSingleControl('', this.data.validators ), parent: true });
  }

  /**
   *
   *  this.formGroup.get('personal_information.email')
      .setValidators( Validators.compose(
        [Validators.required, this.emailValidator.validate()]
    ));
   */

  selectErrorMessage(): string {
    // return 'field required';

    /* return ( this.parentGroup.get(this.data.name).hasError('email') &&
              !this.parentGroup.get(this.data.name).hasError('required')) ?
                (this.data.error_message_email ? this.data.error_message_email : 'Please enter a valid email address') :
                  this.data.error_message; */

    return (this.parentGroup.get(this.data.name).errors && this.parentGroup.get(this.data.name).errors.message) || this.data.error_message;

  }
}
