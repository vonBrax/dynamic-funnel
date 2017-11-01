import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppMaterialModule } from './app.material.module';

//import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';

import { ClickOutsideDirective } from './directives/click-outside.directive';
import { BmicalculatorService } from './services/bmicalculator.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FormComponent } from './components/form/form.component';
import { StepComponent } from './components/step/step.component';
import { FooterComponent } from './components/footer/footer.component';
import { SvgCornerComponent } from './components/svg-corner/svg-corner.component';
import { PhoneSelectorComponent } from './components/phone-selector/phone-selector.component';


import { FormParentComponent } from './components/form-parent/form-parent.component';
import { FormStepComponent } from './components/form-parent/form-step/form-step.component';
import { RadioComponent } from './components/form-parent/radio/radio.component';
import { SliderComponent } from './components/form-parent/slider/slider.component';
import { TextComponent } from './components/form-parent/text/text.component';
import { TextareaComponent } from './components/form-parent/textarea/textarea.component';
import { ButtonComponent } from './components/form-parent/button/button.component';
import { ButtonToggleComponent } from './components/form-parent/button-toggle/button-toggle.component';
import { CheckboxComponent } from './components/form-parent/checkbox/checkbox.component';
import { ToolbarComponent } from './components/form-parent/toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormComponent,
    StepComponent,
    FooterComponent,
    SvgCornerComponent,
    PhoneSelectorComponent,
    ClickOutsideDirective,
    FormParentComponent,
    FormStepComponent,
    RadioComponent,
    SliderComponent,
    TextComponent,
    TextareaComponent,
    ButtonComponent,
    ButtonToggleComponent,
    CheckboxComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppMaterialModule
  ],
  providers: [ BmicalculatorService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
