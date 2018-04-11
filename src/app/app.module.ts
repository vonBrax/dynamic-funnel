import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app.material.module';

import { ClickOutsideDirective } from './directives/click-outside.directive';
import { FormSyncService } from './services/form-sync.service';
import { EmailValidatorService } from './services/email.validator.service';
import { MixpanelService } from './services/mixpanel.service';
import { DataService } from './services/data.service';
import { Utils } from './models/utils';
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
import { TextComponent } from './components/form-inputs/text/text.component';
import { TextareaComponent } from './components/form-inputs/textarea/textarea.component';
import { ButtonComponent } from './components/form-inputs/button/button.component';
import { CheckboxComponent } from './components/form-inputs/checkbox/checkbox.component';
import { SelectComponent } from './components/form-inputs/select/select.component';
import { HeroComponent } from './components/hero/hero.component';
import { FormHeroComponent } from './components/form-hero/form-hero.component';
import { IntlTelInputComponent } from './components/intl-tel-input/intl-tel-input.component';

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
    TextComponent,
    TextareaComponent,
    ButtonComponent,
    CheckboxComponent,
    SelectComponent,
    HeroComponent,
    FormHeroComponent,
    IntlTelInputComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
    AppMaterialModule
  ],
  providers: [
    FormSyncService,
    EmailValidatorService,
    Utils,
    MixpanelService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
