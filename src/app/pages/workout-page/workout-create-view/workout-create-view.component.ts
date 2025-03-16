import { Overlay } from '@angular/cdk/overlay';
import {
    Component,
    ComponentFactoryResolver,
    computed,
    inject,
    signal,
    Signal,
    ViewContainerRef,
    WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
    ControlSelectComponent,
    IControlSelectOption,
} from '@app/shared/components/controls/control-select/control-select.component';
import { ApiService } from '@app/shared/services/api.service';
import { ExercisesService } from '@app/shared/services/exercises.service';
import { SharedHeroIconsComponent } from '../../../shared/components/shared-hero-icons/shared-hero-icons.component';
import { WorkoutService } from '../services/workout.service';

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
                    [options]="exercises()"
                    [disabled]="!selectedMuscle()" />
            </div>
            <button
                (click)="clickCreateWorkout()"
                class="px-4 py-3 rounded-xl bg-black text-white font-bold text-sm flex items-center justify-center gap-2">
                <shared-hero-icons [icon]="'PlusCircleIcon'" class="size-5" />
                Utwórz
            </button>
        </div>
    `,
    styleUrls: [],
    imports: [RouterModule, FormsModule, SharedHeroIconsComponent, ControlSelectComponent],
})
export class WorkoutCreateViewComponent {
    protected overlay = inject(Overlay);
    protected viewContainerRef = inject(ViewContainerRef);
    protected componentFactoryResolver = inject(ComponentFactoryResolver);
    protected apiService = inject(ApiService);
    protected router = inject(Router);
    protected workoutService = inject(WorkoutService);

    protected exercisesService = inject(ExercisesService);

    protected selectedMuscle: WritableSignal<IControlSelectOption> = signal(null);
    protected selectedExercise: WritableSignal<number> = signal(null);

    protected exercisesCollection: Signal<Map<string, any>> = this.exercisesService.exercises;
    protected muscleOptions: Signal<{ id: string; value: string }[]> = computed(() =>
        Array.from(this.exercisesCollection().keys()).map((key: string) => ({
            id: key,
            value: `${key.substring(0, 1).toUpperCase()}${key.substring(1)}`,
        }))
    );
    protected exercises = computed(() => {
        return (this.exercisesCollection().get(this.selectedMuscle()?.id) || []).map((exercise) => ({
            id: exercise.id,
            value: exercise.name,
        }));
    });

    protected selectMuscle(value: IControlSelectOption): void {
        this.selectedMuscle.set(value);
    }

    protected selectExercise(value: IControlSelectOption): void {
        this.selectedExercise.set(+value.id);
    }

    protected clickCreateWorkout(): void {}
}
