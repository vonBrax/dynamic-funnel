import { NgModule } from '@angular/core';
import {
    MatStepperModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSliderModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatCardModule,
    MatAutocompleteModule
  } from '@angular/material';

  const materialImports = [
        MatStepperModule,
        MatButtonModule,
        MatRadioModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatSliderModule,
        MatSelectModule,
        MatButtonToggleModule,
        MatToolbarModule,
        MatCardModule,
        MatAutocompleteModule
      ];

  @NgModule({
    imports: materialImports,
    exports: materialImports
  })
  export class AppMaterialModule { }
