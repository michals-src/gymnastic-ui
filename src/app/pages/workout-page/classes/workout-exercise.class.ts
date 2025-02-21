import { signal, WritableSignal } from '@angular/core';

export interface IWorkoutExerciseSeries {
    count: number;
    weight: number;
}

export class WorkoutExercise {
    public id: number = null;
    public workoutId: number = null;
    public seriesId: number = null;
    public name: string = null;
    public group: string = null;
    public createdAt: string = null;
    public series: WritableSignal<IWorkoutExerciseSeries[]> = signal([]);
    public previousWorkoutSeries: WritableSignal<IWorkoutExerciseSeries[]> = signal([]);

    constructor(
        id: number,
        workoutId: number,
        seriesId: number,
        name: string,
        group: string,
        series: IWorkoutExerciseSeries[],
        createdAt: string
    ) {
        this.id = id;
        this.workoutId = workoutId;
        this.seriesId = seriesId;
        this.name = name;
        this.group = group;
        this.createdAt = createdAt;
        series && this.setSeries(series);
    }

    public addPrviousWorkoutSeries(series: IWorkoutExerciseSeries[]) {
        this.previousWorkoutSeries.set(series);
    }

    public setSeries(value: IWorkoutExerciseSeries[]): void {
        this.series.set(value);
    }
}
