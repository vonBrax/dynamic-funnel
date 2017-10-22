import { NgModule } from '@angular/core';
import {
    MatStepperModule,
    MatButtonModule,
    MatRadioModule,
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  } from '@angular/material';

  @NgModule({
    imports: [
        MatStepperModule,
        MatButtonModule,
        MatRadioModule,
        MatTabsModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule
      ],
      exports: [
        MatStepperModule,
        MatButtonModule,
        MatRadioModule,
        MatTabsModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule
      ]
  })
  export class AppMaterialModule {}