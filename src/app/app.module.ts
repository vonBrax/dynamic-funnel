import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app.material.module';

import { ClickOutsideDirective } from './directives/click-outside.directive';
import { BmiCalculatorService } from './services/bmi-calculator.service';
import { FormSyncService } from './services/form-sync.service';
import { HtmlPipe } from './models/html.pipe';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SvgCornerComponent } from './components/svg-corner/svg-corner.component';
import { PhoneSelectorComponent } from './components/phone-selector/phone-selector.component';
import { FormParentComponent } from './components/form-parent/form-parent.component';
import { FormStepComponent } from './components/form-step/form-step.component';

/* Form Input Components */
import { RadioComponent } from './components/form-inputs/radio/radio.component';
import { SliderComponent } from './components/form-inputs/slider/slider.component';
import { TextComponent } from './components/form-inputs/text/text.component';
import { TextareaComponent } from './components/form-inputs/textarea/textarea.component';
import { ButtonComponent } from './components/form-inputs/button/button.component';
import { ButtonToggleComponent } from './components/form-inputs/button-toggle/button-toggle.component';
import { CheckboxComponent } from './components/form-inputs/checkbox/checkbox.component';
import { ToolbarComponent } from './components/form-inputs/toolbar/toolbar.component';
import { SelectComponent } from './components/form-inputs/select/select.component';
import { HeroComponent } from './components/hero/hero.component';
import { FormHeroComponent } from './components/form-hero/form-hero.component';

@NgModule({
  declarations: [
    ClickOutsideDirective,
    HtmlPipe,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SvgCornerComponent,
    PhoneSelectorComponent,
    FormParentComponent,
    FormStepComponent,
    RadioComponent,
    SliderComponent,
    TextComponent,
    TextareaComponent,
    ButtonComponent,
    ButtonToggleComponent,
    CheckboxComponent,
    ToolbarComponent,
    SelectComponent,
    HeroComponent,
    FormHeroComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AppMaterialModule
  ],
  providers: [ BmiCalculatorService, FormSyncService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
