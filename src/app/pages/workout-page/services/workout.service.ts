import { inject, Injectable } from '@angular/core';
import { of, tap } from 'rxjs';
import { ApiService } from '@app/shared/services/api.service';
import { WorkoutStore } from '@app/pages/workout-page/services/workout-store/workout.store';
import { WorkoutApiService } from '@app/pages/workout-page/services/workout-api.service';
import { WorkoutExercisesStore } from '@app/pages/workout-page/services/workout-exercises-store/workout-exercises.store';

@Injectable()
export class WorkoutService {
    private apiService = inject(ApiService);
    private workoutApiService = inject(WorkoutApiService);
    private workoutStore = inject(WorkoutStore);
    private workoutExercisesStore = inject(WorkoutExercisesStore);

    createExercise(exerciseId: number) {
        return this.workoutApiService
            .createExercise(this.workoutStore.workoutId(), exerciseId)
            .pipe(tap((response) => this.workoutExercisesStore.addExercise(response)));
    }

    getWorkout() {
        this.workoutApiService.getWorkout(this.workoutStore.workoutId()).subscribe((data) => {
            this.workoutStore.setWorkoutDetails(data?.workout || null);
            this.workoutExercisesStore.setExercises(data?.timeline || null);
        });
    }

    updateExercise() {
        // const selectedWorkoutExercise = this.selectedWorkoutExercise();
        // const _seriesId = selectedWorkoutExercise.seriesId;
        // const _series = selectedWorkoutExercise.series();
        // console.log(selectedWorkoutExercise);
        // if (_series) {
        //     return this.apiService.put<number>('/series/' + _seriesId, {
        //         reps: JSON.stringify(_series),
        //     });
        // }

        return of(null);
    }
}
