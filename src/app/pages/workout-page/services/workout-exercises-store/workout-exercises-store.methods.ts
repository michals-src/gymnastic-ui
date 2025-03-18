import {
    IWorkoutExerciseResponse,
    IWorkoutSetsResponse,
    WorkoutTimelineResponseModel,
} from '@app/pages/workout-page/workout-view/workout-view.component';
import { patchState } from '@ngrx/signals';

function exercise(value: IWorkoutExerciseResponse, series: IWorkoutSetsResponse) {
    const _exercise_sets = Boolean(series?.reps) ? JSON.parse(series?.reps) : [];
    return {
        id: value?.id,
        seriesId: series?.id ?? null,
        name: value?.name ?? null,
        muscleGroup: value.muscle ?? null,
        sets: _exercise_sets,
        createdAt: value?.createdAt ?? null,
    };
}

export const WorkoutExercisesStoreMethods = (state) => ({
    setExercises(value: Array<WorkoutTimelineResponseModel>): void {
        if (Boolean(value)) {
            const _exercises = value.map(({ exercise: exerciseResponse, series }) => {
                return exercise(exerciseResponse, series);
            });
            patchState(state, { exercises: _exercises });
        }
    },
    addExercise(value: IWorkoutExerciseResponse): void {
        const _exercises = state.exercises;
        _exercises.push(exercise(value, null));
        patchState(state, { exercises: [..._exercises] });
    },
    updateExercise(value: Partial<IWorkoutExerciseResponse>): void {
        const _exercise = state.exercises.find((exercise) => exercise.id === value.id);
        if (Boolean(_exercise)) {
            const _exercises = state.exercises.filter((exercise) => exercise.id !== value.id);
            _exercises.push({
                ..._exercise,
                ...value,
            });
            patchState(state, { exercises: [..._exercises] });
        }
    },
});
