import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
<<<<<<< HEAD
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withJsonpSupport } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(),
    provideHttpClient(withJsonpSupport()), provideAnimationsAsync(),
=======
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors, withJsonpSupport } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { userReducer } from '../store/user/user.reducer';
import { authInterceptor } from './services/interceptor/auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    // provideClientHydration(withEventReplay()),
    provideHttpClient(withJsonpSupport(), withInterceptors([authInterceptor])),
    provideStore({user:userReducer})
>>>>>>> ff435484b4f0e6ee505303c5a4e3ffc0f910cb87
  ]
};
