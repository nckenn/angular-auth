import { Routes } from '@angular/router';

export default [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('../home/home.component').then((m) => m.HomeComponent),
    title: 'Home',
  },
] as Routes;
