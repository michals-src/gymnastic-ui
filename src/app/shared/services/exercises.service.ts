import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ExercisesService {
    private _exercises: WritableSignal<any> = signal(null);
    public exercises = this._exercises.asReadonly();

    constructor(private httpClient: HttpClient) {}

    public getExercises(): void {
        this.httpClient.get('http://localhost:3000/exercises').subscribe((data: Array<Record<string, any>>) => {
            const aggregate = data.reduce((aggr: Record<string, any>, val: any) => {
                const { muscle, ...props } = val;
                const muscleName = muscle.toLowerCase();

                if (!aggr.hasOwnProperty(muscleName)) {
                    aggr[muscleName] = [];
                }

                aggr[muscleName].push(props);
                return aggr;
            }, {});

            this._exercises.set(new Map(Object.entries(aggregate)));
        });
    }
}
