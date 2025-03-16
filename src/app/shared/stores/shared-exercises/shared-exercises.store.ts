import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { SharedExerciseModel, SharedExercisesStoreModel } from './shared-exercises.model';

export const SharedExercisesStore = signalStore(
    withState<SharedExercisesStoreModel>({
        dataSource: [],
    }),
    withMethods((store) => ({
        setExercises(dataSource: Array<SharedExerciseModel>): void {
            patchState(store, { dataSource });
        },
        getExercise(id: number): SharedExerciseModel {
            return store.dataSource().find((exercise) => exercise.id === id) ?? null;
        },
    }))
);
