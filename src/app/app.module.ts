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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PetComponent } from './components/forms/pet/pet.component';
import { LabelModule } from '@progress/kendo-angular-label';
import { PetDetails1Component } from './components/forms/pet/pet-details1/pet-details1.component';
import { PetDetails2Component } from './components/forms/pet/pet-details2/pet-details2.component';
import { PetDetails3Component } from './components/forms/pet/pet-details3/pet-details3.component';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { HttpClientModule } from '@angular/common/http';
import { GridModule } from '@progress/kendo-angular-grid';
import { MainGridComponent } from './components/main-grid/main-grid.component';

import { CategoriesService } from './northwind.service';
import { FireCRUDService } from './fire-crud.service';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book-list/book-list.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { HeaderComponent } from './header/header.component';

import { AuthService } from './shared/services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { BooksService } from './services/books.service';

// App components
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

// Firebase services + enviorment module
//import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MenuModule } from '@progress/kendo-angular-menu';
import { AddBookComponent } from './forms/add-book/add-book.component';
import { BookDetailsComponent } from './forms/add-book/book-details/book-details.component';
import { BookCoverComponent } from './forms/add-book/book-cover/book-cover.component';

//import { environment } from '../environments/environment';

/*

const firebaseConfig = {
        apiKey: "AIzaSyD68ysdlWJT8yLB7kSUcCuxlrWBqUPX4Tg",
        authDomain: "kendo-grid-crud.firebaseapp.com",
        databaseURL: "https://kendo-grid-crud.firebaseio.com",
        projectId: "kendo-grid-crud",
        storageBucket: "kendo-grid-crud.appspot.com",
        messagingSenderId: "1005892024994",
        appId: "1:1005892024994:web:e74d331eb7cd46f13335fb"
    };

*/
/*
const config = {
  apiKey: 'AIzaSyB4-_5thshb6BpSoERI9aRfdF5w3weQnCY',
  authDomain: 'api-project-400013235268.firebaseapp.com',
  databaseURL: 'https://api-project-400013235268.firebaseio.com',
  projectId: 'api-project-400013235268',
  storageBucket: 'api-project-400013235268.appspot.com',
  messagingSenderId: '400013235268'
};
*/
@NgModule({
  declarations: [
    AppComponent,
    AppBarComponent,
    PetComponent,
    PetDetails1Component,
    PetDetails2Component,
    PetDetails3Component,
    MainGridComponent,
    /* books app */
    SignupComponent,
    SigninComponent,
    BookListComponent,
    SingleBookComponent,
    BookFormComponent,
    /* auth app */
    HeaderComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    AddBookComponent,
    BookDetailsComponent,
    BookCoverComponent
  ],
  imports: [
    BrowserModule,
    //AngularFireModule.initializeApp(config),      
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
    FormsModule,
    ReactiveFormsModule,
    LabelModule,
    UploadsModule,
    HttpClientModule,
    GridModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    MenuModule
  ],
  //providers: [ CategoriesService, FireCRUDService, AuthService, BooksService,AuthGuardService ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
