import { IWorkout } from '@app/shared/interfaces/i-workout';
import { patchState } from '@ngrx/signals';

export const WorkoutStoreMethods = (state) => ({
    setWorkoutId(id: number): void {
        patchState(state, { workoutId: id });
    },
    setWorkoutDetails(value: IWorkout): void {
        patchState(state, { workoutDetails: value });
    },
    setLoading(value: boolean): void {
        patchState(state, { isLoading: value });
    },
});
