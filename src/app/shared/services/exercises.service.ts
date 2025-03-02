import { Injectable, signal, WritableSignal } from '@angular/core';
import { ApiService } from '@app/shared/services/api.service';

@Injectable({
    providedIn: 'root',
})
export class ExercisesService {
    private _exercises: WritableSignal<any> = signal(new Map());
    public exercises = this._exercises.asReadonly();

    constructor(private apiService: ApiService) {}

    public getExercises(): void {
        this.apiService.get('/exercises').subscribe((data: Array<Record<string, any>>) => {
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

    public getExercise(id: number) {
        const [group, exercises]: any = this.exercises()
            .entries()
            .find(([_, exercises]) => {
                return (exercises as any).some((exercise: any) => exercise.id === id);
            });

        const result = exercises?.find((exercise) => exercise.id === id);

        return {
            id,
            name: result?.name ?? null,
            group: group ?? null,
        };
    }
}
