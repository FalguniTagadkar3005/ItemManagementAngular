import { ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { GlobalErrorHandler } from './errors/global-error-handler';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './errors/error.interceptor';
import { MaterialModule } from './material.module';
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(),provideHttpClient(),
    {
      provide:ErrorHandler,
      useClass:GlobalErrorHandler
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:ErrorInterceptor,
      multi:true
    },
    MaterialModule
  ]
  
};
