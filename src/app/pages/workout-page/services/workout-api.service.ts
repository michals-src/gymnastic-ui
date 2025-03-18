import { Injectable, inject } from '@angular/core';
import {
    IWorkoutExerciseResponse,
    IWorkoutResponse,
    IWorkoutSetsResponse,
} from '@app/pages/workout-page/workout-view/workout-view.component';
import { ApiService } from '@app/shared/services/api.service';

@Injectable()
export class WorkoutApiService {
    private readonly apiService = inject(ApiService);

    public getWorkout(workoutId: number) {
        return this.apiService.get<IWorkoutResponse>(`/workouts/${workoutId}`);
    }

    public createExercise(workoutId: number, exerciseId: number) {
        return this.apiService.post<IWorkoutExerciseResponse>('/series', {
            workoutId: workoutId,
            exerciseId: exerciseId,
        });
    }

    public getLastExerciseSets(setsId: number, selectedWorkoutExerciseId: number) {
        return this.apiService.get<IWorkoutSetsResponse[]>(`/series/previous/${setsId}/${selectedWorkoutExerciseId}`);
    }

    public getLastExerciseSeries(seriesId: number, exerciseId: number) {
        return this.apiService.get<IWorkoutSetsResponse[]>(`/series/previous/${seriesId}/${exerciseId}`);
    }
}
