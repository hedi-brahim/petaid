import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { BookListComponent } from './book-list/book-list.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { AuthGuardService } from './services/auth-guard.service';

// Import all the components for which navigation service has to be activated 
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthGuard } from "./shared/guard/auth.guard";
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

const routes: Routes = [
  /*
  { path:'auth/signup', component: SignupComponent },
  { path:'auth/signin', component: SigninComponent },
  { path:'books', canActivate:[AuthGuardService], component: BookListComponent },
  { path:'books/new', canActivate:[AuthGuardService], component: BookFormComponent },
  { path:'books/view/:id', canActivate:[AuthGuardService], component: SingleBookComponent },
  {path:'', redirectTo:'books', pathMatch:'full'},
  {path:'**',redirectTo:'books'},
  */
  /*
   { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
   { path: 'sign-in', component: SignInComponent},
   { path: 'register-user', component: SignUpComponent},
   { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
   { path: 'forgot-password', component: ForgotPasswordComponent },
   { path: 'verify-email-address', component: VerifyEmailComponent }
   */
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
