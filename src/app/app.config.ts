import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {HttpHandler, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors} from '@angular/common/http';
import {Observable} from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([baseUrlInterceptor]),
    )
  ]
};

function baseUrlInterceptor(request: HttpRequest<any>, next: HttpHandlerFn): Observable<any> {
  const apiReq = request.clone({ url: `http://localhost:3000${request.url}` });

  return next(apiReq)
}
