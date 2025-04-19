import { Component, computed, signal, Signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
    ControlSelectComponent,
    IControlSelectOption,
} from '@app/shared/components/controls/control-select/control-select.component';
import { SharedHeroIconsComponent } from '../../../shared/components/shared-hero-icons/shared-hero-icons.component';

const Atlas = {
    get: () => ({
        default: [],
        handler: 'atlas',
    }),
    create: () => ({
        default: null,
        handler: '',
    }),
};

const WorkoutApi = {};

const ApiClient = () => {};

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
                class="px-4 py-3 rounded-xl bg-black text-white font-bold text-sm flex items-center justify-center gap-2">
                <shared-hero-icons [icon]="'PlusCircleIcon'" class="size-5" />
                @if (workoutCreateResource.isLoading()) {
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
    protected readonly workoutAtlasResource = ApiClient(WorkoutApi.Atlas);
    protected readonly workoutCreateResource = ApiClient(WorkoutApi.create);

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

    constructor() {
        this.atlasResource.handle();
    }

    protected selectMuscle(value: IControlSelectOption): void {
        this.selectedMuscle.set(value);
    }

    protected selectExercise(value: IControlSelectOption): void {
        this.selectedExercise.set(+value.id);
    }

    protected clickCreateWorkout(): void {
        this.workoutCreateResource.handle({
            muscleId: this.selectedMuscle().id,
            exerciseId: this.selectedExercise(),
        });
    }
}
