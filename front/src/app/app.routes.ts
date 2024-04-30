import { Routes } from '@angular/router';
import { GridPageComponent } from './pages/grid-page/grid-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

export const routes: Routes = [
  { path: 'Grid', component: GridPageComponent },
  { path: 'sign-up', component: SignUpPageComponent },
  { path: 'login', component: LoginPageComponent },
  {
    path: '**',
    redirectTo: '/Grid',
  },
];
