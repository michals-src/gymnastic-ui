import { WorkoutStoreMethods } from '@app/pages/workout-page/services/workout-store/workout-store.method';
import { IWorkout } from '@app/shared/interfaces/i-workout';
import { signalStore, withMethods, withState } from '@ngrx/signals';

export const WorkoutStore = signalStore(
    withState<{
        workoutId: number;
        workoutDetails: IWorkout;
        isLoading: boolean;
    }>({
        workoutId: null,
        workoutDetails: null,
        isLoading: false,
    }),
    withMethods((state) => WorkoutStoreMethods(state))
);
