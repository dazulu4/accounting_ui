import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { UserService } from './domain/ports/user.service';
import { UserApiService } from './data/services/user-api.service';
import { TaskService } from './domain/ports/task.service';
import { TaskApiService } from './data/services/task-api.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    { provide: UserService, useClass: UserApiService },
    { provide: TaskService, useClass: TaskApiService }
  ]
};
