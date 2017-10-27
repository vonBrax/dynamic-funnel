import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppMaterialModule } from './app.material.module';

//import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';

import { ClickOutsideDirective } from './directives/click-outside.directive';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FormComponent } from './components/form/form.component';
import { StepComponent } from './components/step/step.component';
import { FooterComponent } from './components/footer/footer.component';
import { SvgCornerComponent } from './components/svg-corner/svg-corner.component';
import { PhoneSelectorComponent } from './components/phone-selector/phone-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormComponent,
    StepComponent,
    FooterComponent,
    SvgCornerComponent,
    PhoneSelectorComponent,
    ClickOutsideDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppMaterialModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
