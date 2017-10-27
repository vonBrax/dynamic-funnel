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
    MatCheckboxModule,
    MatSliderModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatToolbarModule
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
        MatCheckboxModule,
        MatSliderModule,
        MatSelectModule,
        MatButtonToggleModule,
        MatToolbarModule
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
        MatCheckboxModule,
        MatSliderModule,
        MatSelectModule,
        MatButtonToggleModule,
        MatToolbarModule
      ]
  })
  export class AppMaterialModule {}