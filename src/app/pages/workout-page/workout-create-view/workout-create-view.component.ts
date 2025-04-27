import { Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
    ControlSelectComponent,
    IControlSelectOption,
} from '@app/shared/components/controls/control-select/control-select.component';
import { ApiService } from '@app/shared/services/api.service';
import { catchError, filter, finalize, Observable, of, OperatorFunction } from 'rxjs';
import { SharedHeroIconsComponent } from '../../../shared/components/shared-hero-icons/shared-hero-icons.component';

const AtlasApi = {
    getAtlas: () => ({
        default: {
            atlasMuscles: [],
            atlasExercises: {},
        },
        handler: 'atlas',
    }),
    createMuscle: () => ({
        default: null,
        handler: 'atlas/newMuscle',
        method: 'POST',
    }),
    createExercise: () => ({
        default: null,
        handler: 'atlas/newExercise',
        method: 'POST',
    }),
    removeMuscle: (id: number) => ({
        default: null,
        handler: `atlas/removeMuscle/${id}`,
        method: 'DELETE',
    }),
    removeExercise: (id: number) => ({
        default: null,
        handler: `atlas/removeExercise/${id}`,
        method: 'DELETE',
    }),
};

export namespace WorkoutApiModel {
    export namespace Request {
        export interface Create {
            workoutId: number;
            exerciseId: number;
        }
    }
}

const ApiSchema = <
    Fn extends (...args: any[]) => {
        handler: string;
        initial: any;
        method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
        payload?: any;
    },
>(
    params: Fn
) => {
    const a = inject(ApiService);
    return new (class {
        private _isLoading: WritableSignal<Boolean> = signal(false);
        public readonly isLoading = this._isLoading.asReadonly();

        private _pipe = (source$: Observable<any>): Observable<any> => {
            return (source$.pipe as (...args: OperatorFunction<any, any>[]) => Observable<any>)();
        };

        constructor(private readonly schema: Fn) {}

        pipe<T>(...args: [...OperatorFunction<T, T>[]]) {
            this._pipe = (source$: Observable<T>): Observable<T> => {
                return (source$.pipe as (...args: OperatorFunction<T, T>[]) => Observable<T>)(...args);
            };
            return this;
        }

        snapshot<O>(...args: Exclude<Parameters<Fn>, 'method'>): Observable<O> {
            this._isLoading.set(true);
            const params = this.schema(...args);
            const request = (url: string) => {
                switch (params?.method) {
                    case 'GET':
                        return a.get(url);
                    case 'POST':
                        return a.post(url, params?.payload ?? {});
                    case 'PUT':
                        return a.put(url, params?.payload ?? {});
                    case 'DELETE':
                        return a.delete(url, params?.payload ?? {});
                    default:
                        return a.get(url);
                }
            };
            return request(params.handler).pipe(
                catchError(() => of(params.initial)),
                finalize(() => this._isLoading.set(false)),
                this._pipe
            );
        }
    })(params);
};

const WorkoutApi = () => {
    return {
        getWorkout: ApiSchema((id: number) => ({
            handler: `workout/${id}`,
            initial: null,
        })),
    };
};

@Component({
    selector: 'app-workout-create-view',
    template: `
        <div class="w-full h-screen px-8 flex flex-col pt-12">
            <a [routerLink]="['/']" class="flex gap-2 items-center text-xs mb-12">
                <shared-hero-icons [icon]="'ArrowLeftIcon'" class="size-4" />
                Powrót
            </a>
            <div class="flex flex-col gap-4">
                <shared-hero-icons [icon]="'RocketLaunchIcon'" class="size-5" />
                <h1 class="text-3xl font-bold leading-[130%]r">Tworzenie sesji treningowej</h1>
                <h1 class="text-base leading-[150%] ">Dodaj pierwsze ćwiczenie<br />dzisiejszego planu</h1>
            </div>
            <div class="mt-12 w-full">
                <p class="text-xs font-semibold leading-[150%] mb-1">Partia mięśniowa</p>
                <app-control-select
                    [ngModel]="selectedMuscle()"
                    (ngModelChange)="selectMuscle($event)"
                    [options]="muscleOptions()" />
            </div>
            <div class="mt-4 mb-12 w-full">
                <p class="text-xs font-semibold leading-[150%] mb-1">Ćwiczenie</p>
                <app-control-select
                    [ngModel]="selectedExercise()"
                    (ngModelChange)="selectExercise($event)"
                    [options]="exercisesOptions()"
                    [disabled]="!selectedMuscle()" />
            </div>
            <button
                (click)="clickCreateWorkout()"
                class="px-4 py-3 rounded-xl bg-black text-white font-bold text-sm flex items-center justifyj-center gap-2">
                <shared-hero-icons [icon]="'PlusCircleIcon'" class="size-5" />
                @if (workoutApi.getWorkout.isLoading()) {
                    Pending ...
                }
                Utwórz
            </button>
        </div>
    `,
    styleUrls: [],
    imports: [RouterModule, FormsModule, SharedHeroIconsComponent, ControlSelectComponent],
})
export class WorkoutCreateViewComponent {
    private readonly router = inject(Router);
    protected readonly workoutApi = WorkoutApi();
    // protected readonly atlasApi = AtlasApi();

    protected selectedMuscle: WritableSignal<IControlSelectOption> = signal(null);
    protected selectedExercise: WritableSignal<number> = signal(null);

    protected exercisesCollection: Signal<Map<string, any>> = signal(new Map());
    protected muscleOptions: Signal<{ id: string; value: string }[]> = computed(() =>
        Array.from(this.exercisesCollection().keys()).map((key: string) => ({
            id: key,
            value: `${key.substring(0, 1).toUpperCase()}${key.substring(1)}`,
        }))
    );
    protected exercisesOptions = computed(() => {
        return (this.exercisesCollection().get(this.selectedMuscle()?.id) || []).map((exercise) => ({
            id: exercise.id,
            value: exercise.name,
        }));
    });

    private readonly customId: number = 32;
    protected selectMuscle(value: IControlSelectOption): void {
        this.selectedMuscle.set(value);
    }

    protected selectExercise(value: IControlSelectOption): void {
        this.selectedExercise.set(+value.id);
    }

    protected clickCreateWorkout(): void {
        this.workoutApi.getWorkout
            .snapshot(10)
            .pipe(filter((response: any) => Boolean(response?.id)))
            .subscribe((response) => this.router.navigate(['workout', response.id]));
    }
}
