import { inject, Injectable } from '@angular/core';
import { IWorkoutResponse, IWorkoutSetsResponse } from '../views/workout-details-view/workout-details-view.component';
import { of, tap } from 'rxjs';
import { ApiService } from '@app/shared/services/api.service';
import { WorkoutExercise } from '@app/pages/workout-page/classes/workout-exercise.class';
import { WorkoutStore } from '@app/pages/workout-page/services/workout-store.service';

@Injectable()
export class WorkoutService extends WorkoutStore {
    private apiService = inject(ApiService);

    public readonly workoutId = this._workoutId.asReadonly();
    public readonly workoutDetails = this._workoutDetails.asReadonly();
    public readonly workoutExercises = this._workoutExercises.asReadonly();
    public readonly selectedWorkoutExerciseId = this._selectedWorkoutExerciseId.asReadonly();

    createExercise(exerciseId: number) {
        return this.apiService
            .post('/series', {
                workoutId: this.workoutId(),
                exerciseId: exerciseId,
            })
            .pipe(tap((id: number) => this.setSelectedWorkoutExerciseId(id)));
    }

    getLastExerciseSeries() {
        return this.apiService.get<IWorkoutSetsResponse[]>(
            '/series/previous/' + this.selectedWorkoutExercise().seriesId + '/' + this.selectedWorkoutExerciseId()
        );
    }

    getWorkout() {
        this.apiService.get<IWorkoutResponse>('/workouts/' + this.workoutId()).subscribe((data) => {
            const _workout = data?.workout || null;
            if (_workout) {
                const exercises = [];

                data.timeline.forEach(({ exercise, series }) => {
                    const _reps = JSON.parse(series.reps);
                    exercises.push(
                        new WorkoutExercise(
                            exercise.id,
                            _workout.id,
                            series.id,
                            exercise.name,
                            exercise.muscle,
                            _reps,
                            series.createdAt
                        )
                    );
                });

                this.setWorkoutDetails(_workout);
                this.setWWorkoutExercises(exercises);
            }
        });
    }

    updateExercise() {
        const selectedWorkoutExercise = this.selectedWorkoutExercise();
        const _seriesId = selectedWorkoutExercise.seriesId;
        const _series = selectedWorkoutExercise.series();
        console.log(selectedWorkoutExercise);
        if (_series) {
            return this.apiService.put<number>('/series/' + _seriesId, {
                reps: JSON.stringify(_series),
            });
        }

        return of(null);
    }
}
