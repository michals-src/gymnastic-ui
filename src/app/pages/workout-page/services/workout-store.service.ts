import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { WorkoutExercise } from '@app/pages/workout-page/classes/workout-exercise.class';
import { IWorkout } from '@app/shared/interfaces/i-workout';

@Injectable()
export class WorkoutStore {
    protected _workoutId: WritableSignal<number> = signal(null);
    protected _workoutDetails: WritableSignal<IWorkout> = signal(null);
    protected _workoutExercises: WritableSignal<WorkoutExercise[]> = signal(null);

    protected _selectedWorkoutExerciseId: WritableSignal<number> = signal(0);
    public selectedWorkoutExercise = computed(() => {
        return this._workoutExercises().find((_exercise) => _exercise.id == this._selectedWorkoutExerciseId());
    });

    public setWorkoutId(id: number) {
        this._workoutId.set(id);
    }

    public setWorkoutDetails(workout: IWorkout) {
        this._workoutDetails.set(workout);
    }

    public setWWorkoutExercises(workoutExercise: WorkoutExercise[]) {
        this._workoutExercises.set(workoutExercise);
    }

    public setSelectedWorkoutExerciseId(id: number) {
        this._selectedWorkoutExerciseId.set(id);
    }
}
