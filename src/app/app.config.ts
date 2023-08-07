import {
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { HotToastModule } from '@ngneat/hot-toast';
import { appInitializerProviders } from './core/initializers';
import { NgxPermissionsModule } from 'ngx-permissions';

import { API_URL } from './shared/data-access/api/api-url.token';
import { environment } from 'src/environments/environment';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    appInitializerProviders,
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: API_URL, useValue: environment.api_url },
    importProvidersFrom(
      HotToastModule.forRoot(),
      NgxPermissionsModule.forRoot()
    ),
  ],
};
