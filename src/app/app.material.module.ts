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
    MatCardModule
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
        MatCardModule
      ];

  @NgModule({
    imports: materialImports,
    exports: materialImports
  })
  export class AppMaterialModule {}