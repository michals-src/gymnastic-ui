import { Routes } from '@angular/router';
import { AdminWorkoutAddComponent } from './views/admin-workout-add/admin-workout-add.component';
import { WORKOUT_PAGE_ROUTES_ENUM } from '../workout-page/workout-page.routes';

export enum ADMIN_PAGE_ROUTES_ENUM {
    DEFAULT = `admin`,
}

export const ADMIN_PAGE_ROUTES: Routes = [
    {
        path: ADMIN_PAGE_ROUTES_ENUM.DEFAULT,
        component: AdminWorkoutAddComponent,
    },
];
