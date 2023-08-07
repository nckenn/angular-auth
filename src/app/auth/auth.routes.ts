import { Routes } from '@angular/router';
import { LoginComponent } from './feature/login/login.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./auth.component').then((m) => m.AuthComponent),
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];
