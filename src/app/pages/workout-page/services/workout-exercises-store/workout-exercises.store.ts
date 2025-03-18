import { WorkoutExercisesStoreMethods } from '@app/pages/workout-page/services/workout-exercises-store/workout-exercises-store.methods';
import { signalStore, withState, withMethods } from '@ngrx/signals';

export type WorkoutExercisesStoreModel = {
    exercises: Array<{
        id: number;
        seriesId: number;
        name: string;
        muscleGroup: string;
        sets: Array<{
            weight: number;
            count: number;
        }>;
        createdAt: string;
    }>;
};

export const WorkoutExercisesStore = signalStore(
    withState<WorkoutExercisesStoreModel>({
        exercises: [],
    }),
    withMethods((state) => WorkoutExercisesStoreMethods(state))
);
