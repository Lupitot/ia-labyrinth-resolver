import { Routes } from '@angular/router';
import { GridPageComponent } from './pages/grid-page/grid-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import {ObstaclesPageComponent} from './pages/obstacles-page/obstacles-page.component';
import {AllGridPageComponent} from './pages/all-grid-page/all-grid-page.component';
import { GuardComponent } from './components/guard/guard.component';



export const routes: Routes = [
  { path: 'Grid', component: GridPageComponent, canActivate: [GuardComponent] },
  { path: 'sign-up', component: SignUpPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'obstacles', component: ObstaclesPageComponent, canActivate: [GuardComponent]},
  { path: 'all-grid', component: AllGridPageComponent, canActivate: [GuardComponent]},
  {
    path: '**',
    redirectTo: '/login',
  },
];
