import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BmiComponent } from './bmi.component';
import { ConvertUnitsDirective, ConvertUnitsInputDirective } from './bmi.directive';
import { KeyValuePipe } from '../../pipes/keyvalue.pipe';

import {
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatButtonToggleModule
    ],
    declarations: [
      BmiComponent,
      ConvertUnitsDirective,
      ConvertUnitsInputDirective,
      KeyValuePipe
    ],
    exports: [ BmiComponent ]
})
export class BmiModule { }
