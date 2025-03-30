import { Routes } from '@angular/router';
import { HOME_PAGE_ROUTES } from './pages/home-page/home-page.routes';
import { WORKOUT_PAGE_ROUTES } from './pages/workout-page/workout-page.routes';

export const routes: Routes = [...HOME_PAGE_ROUTES, ...WORKOUT_PAGE_ROUTES];
