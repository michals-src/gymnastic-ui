import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { IWorkout } from '../../../shared/interfaces/i-workout';
import { IWorkoutResponse, IWorkoutTimeline } from '../views/workout-details-view/workout-details-view.component';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable()
export class WorkoutService {
    private httpClient = inject(HttpClient);

    public workoutId: WritableSignal<number> = signal(null);
    public workoutDetails: WritableSignal<IWorkout> = signal(null);
    public workoutTimeline: WritableSignal<IWorkoutTimeline[]> = signal(null);

    public exerciseId: WritableSignal<number> = signal(null);

    setWorkoutId(id: number): void {
        this.workoutId.set(id);
    }

    getWorkout() {
        this.httpClient.get<IWorkoutResponse>('http://localhost:3000/workouts/' + this.workoutId()).subscribe((data) => {
            const _workout = data?.workout || null;
            if (_workout) {
                const timeline = data.timeline.map(({ exercise, series }) => {
                    const _reps = JSON.parse(series.reps);

                    return {
                        exercise,
                        series: {
                            ...series,
                            reps: _reps,
                        },
                    };
                });
                this.workoutDetails.set(_workout);
                this.workoutTimeline.set(timeline);
            }
        });
    }

    updateExercise() {
        const _series = this.workoutTimeline().find(({ exercise }) => exercise.id === this.exerciseId())?.series;
        if (_series) {
            return this.httpClient.put<number>('http://localhost:3000/series/' + _series.id, {
                reps: JSON.stringify(_series.reps),
            });
        }

        return of(null);
    }

    attachExercise(exerciseId: number): void {
        this.exerciseId.set(exerciseId);
    }

    detachExercise(): void {
        this.exerciseId.set(null);
    }

    insertSet(count: number, weight: number): void {
        this.workoutTimeline.update((state) => {
            const _el = state.find(({ exercise }) => exercise.id === this.exerciseId());

            if (_el) {
                const _reps = (_el.series?.reps as any) || [];
                _reps.push({
                    count: +count,
                    weight: +weight,
                });
                _el.series.reps = _reps;
            }

            return state;
        });
    }
}
