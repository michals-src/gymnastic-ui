import { SharedExerciseModel } from '@app/shared/stores/shared-exercises/shared-exercises.model';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export const WorkoutCreateAtlasExercisesStore = signalStore(
    withState<{
        dataSource: Array<any>;
        isLoading: boolean;
    }>({
        dataSource: [],
        isLoading: false,
    }),
    withMethods((store) => ({
        setExercises(dataSource: Array<SharedExerciseModel>): void {
            patchState(store, { dataSource });
        },
        getExercise(id: number): SharedExerciseModel | null {
            return store.dataSource().find((exercise) => exercise.id === id) ?? null;
        },
    }))
);
