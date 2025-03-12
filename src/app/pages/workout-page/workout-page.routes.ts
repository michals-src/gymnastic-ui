import { Routes } from '@angular/router';
import { WorkoutDetailsViewComponent } from './views/workout-details-view/workout-details-view.component';
import { WorkoutCreateViewComponent } from './views/workout-create-view/workout-create-view.component';
import { WorkoutViewComponent } from './views/workout-view/workout-view.component';
import { WorkoutService } from './services/workout.service';

export enum WORKOUT_PAGE_ROUTES_ENUM {
    DEFAULT = `workout`,
    DETAILS_ID = `:id`,
    EXERCISE_DETAILS_ID = `:exerciseId`,
    CREATE = 'create',
    ADMIN = 'admin',
}

export const WORKOUT_PAGE_ROUTES: Routes = [
    {
        path: WORKOUT_PAGE_ROUTES_ENUM.DEFAULT,
        component: WorkoutViewComponent,
        providers: [WorkoutService],
        children: [
            {
                path: `${WORKOUT_PAGE_ROUTES_ENUM.CREATE}`,
                component: WorkoutCreateViewComponent,
            },
            {
                path: `${WORKOUT_PAGE_ROUTES_ENUM.DETAILS_ID}`,
                component: WorkoutDetailsViewComponent,
            },
            {
                path: `${WORKOUT_PAGE_ROUTES_ENUM.DETAILS_ID}/${WORKOUT_PAGE_ROUTES_ENUM.EXERCISE_DETAILS_ID}`,
                component: WorkoutDetailsViewComponent,
            },
        ],
    },
];
