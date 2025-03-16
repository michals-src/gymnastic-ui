import { Routes } from '@angular/router';
import { WorkoutService } from './services/workout.service';
import { WorkoutCreateViewComponent } from './workout-create-view/workout-create-view.component';
import { WorkoutDetailsViewComponent } from './workout-details-view/workout-details-view.component';
import { WorkoutPageComponent } from './workout-page.component';
import { WorkoutViewComponent } from './workout-view/workout-view.component';

export enum WORKOUT_PAGE_ROUTES_ENUM {
    DEFAULT = `workout`,
    WORKOUT_ID = `:id`,
    EXERCISE_DETAILS_ID = `:exerciseId`,
    CREATE = 'create',
    ADMIN = 'admin',
}

export const WORKOUT_PAGE_ROUTES: Routes = [
    {
        path: WORKOUT_PAGE_ROUTES_ENUM.DEFAULT,
        component: WorkoutPageComponent,
        providers: [WorkoutService],
        children: [
            {
                path: `${WORKOUT_PAGE_ROUTES_ENUM.CREATE}`,
                component: WorkoutCreateViewComponent,
            },
            {
                path: `${WORKOUT_PAGE_ROUTES_ENUM.WORKOUT_ID}`,
                component: WorkoutViewComponent,
            },
            {
                path: `${WORKOUT_PAGE_ROUTES_ENUM.WORKOUT_ID}/${WORKOUT_PAGE_ROUTES_ENUM.EXERCISE_DETAILS_ID}`,
                component: WorkoutDetailsViewComponent,
            },
        ],
    },
];
