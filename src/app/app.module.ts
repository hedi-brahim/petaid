import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { IconsModule } from '@progress/kendo-angular-icons';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AppBarComponent } from './components/app-bar/app-bar.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ReactiveFormsModule } from '@angular/forms';
import { PetComponent } from './components/forms/pet/pet.component';
import { LabelModule } from '@progress/kendo-angular-label';
import { PetDetails1Component } from './components/forms/pet/pet-details1/pet-details1.component';
import { PetDetails2Component } from './components/forms/pet/pet-details2/pet-details2.component';
import { PetDetails3Component } from './components/forms/pet/pet-details3/pet-details3.component';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { HttpClientModule } from '@angular/common/http';






@NgModule({
  declarations: [
    AppComponent,
    AppBarComponent,
    PetComponent,
    PetDetails1Component,
    PetDetails2Component,
    PetDetails3Component
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),    
    AppRoutingModule,
    NavigationModule,
    BrowserAnimationsModule,
    LayoutModule,
    IndicatorsModule,
    IconsModule,
    ButtonsModule,
    DialogsModule,
    InputsModule,
    ReactiveFormsModule,
    LabelModule,
    UploadsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
