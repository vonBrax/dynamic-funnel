import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { EmailValidator, FormGroup, Validators } from '@angular/forms';

import { EmailValidatorService } from '../../../services/email.validator.service';
import { Utils } from '../../../models/utils';


@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextComponent implements OnInit {

  @Input()
  data: any;
  @Input()
  parentGroup: FormGroup;
  @Output()
  addControlEvent: EventEmitter<any> = new EventEmitter();

  lastEmailValue: string;
  warningMessage: string;

  constructor(private utils: Utils, private emailValidator: EmailValidatorService ) { }

  ngOnInit() {
    this.addControlEvent.emit({
      name: this.data.name,
      control:  this.utils.createSingleControl('', this.data.validators, 'blur' ),
      parent: true
    });
    this.emailValidator.emailWarning$.subscribe(message => this.warningMessage = message);
  }

  /**
   *
   *  this.formGroup.get('personal_information.email')
      .setValidators( Validators.compose(
        [Validators.required, this.emailValidator.validate()]
    ));
   */

  revalidateEmail(evt) {
    const value = evt.target.value;
    if (!this.lastEmailValue) {
      this.lastEmailValue = value;
    } else if (this.lastEmailValue === value) {
      this.parentGroup.get('email').updateValueAndValidity({onlySelf: true});
    }
    this.lastEmailValue = value;
  }


  selectErrorMessage(): string {
    // return 'field required';

    /* return ( this.parentGroup.get(this.data.name).hasError('email') &&
              !this.parentGroup.get(this.data.name).hasError('required')) ?
                (this.data.error_message_email ? this.data.error_message_email : 'Please enter a valid email address') :
                  this.data.error_message; */

    return (
      this.parentGroup.get(this.data.name).errors && this.parentGroup.get(this.data.name).errors.message
    ) || this.data.error_message;

  }
}
