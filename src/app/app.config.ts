import { ApplicationConfig, isDevMode, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import localePl from '@angular/common/locales/pl';
import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { provideHttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePl);

export const appConfig: ApplicationConfig = {
    providers: [
        {
            provide: LOCALE_ID,
            useValue: 'pl',
        },
        provideRouter([...routes]),
        provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000',
        }),
        provideHttpClient(),
    ],
};
