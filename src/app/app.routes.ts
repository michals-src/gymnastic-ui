import { Routes } from '@angular/router';
import { WORKOUT_PAGE_ROUTES } from './pages/workout-page/workout-page.routes';
import { ADMIN_PAGE_ROUTES } from './pages/admin-page/admin-page.routes';
import { HOME_PAGE_ROUTES } from './pages/home-page/home-page.routes';

export const routes: Routes = [...HOME_PAGE_ROUTES, ...WORKOUT_PAGE_ROUTES, ...ADMIN_PAGE_ROUTES];
