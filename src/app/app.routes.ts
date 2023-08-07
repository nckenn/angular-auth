import { Routes } from '@angular/router';
import { AuthGuard } from './core/authentication/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadComponent: () => import('./layout/layout.component'),
    loadChildren: () => import('./layout/layout.routes'),
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./auth/auth.component').then((m) => m.AuthComponent),
    loadChildren: () =>
      import('./auth/auth.routes').then((auth) => auth.AUTH_ROUTES),
  },
  { path: '**', redirectTo: 'home' },
];
