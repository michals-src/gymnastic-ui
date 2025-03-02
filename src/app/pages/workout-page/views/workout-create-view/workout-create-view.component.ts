import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
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
import { Router } from '@angular/router';
import { ApiService } from '@app/shared/services/api.service';
import { ExercisesService } from '@app/shared/services/exercises.service';
import { filter } from 'rxjs';
import {
    ControlSelectComponent,
    IControlSelectOption,
} from '../../../../shared/components/controls/control-select/control-select.component';
import { HeroIconsComponent } from '../../../../shared/components/hero-icons/hero-icons.component';
import { OverlayControllerService } from '../../../../shared/services/overlay-controller.service';
import { WorkoutService } from '../../services/workout.service';
import { WORKOUT_PAGE_ROUTES_ENUM } from '../../workout-page.routes';

@Component({
    selector: 'app-workout-create-view',
    standalone: true,
    template: `
        <div class="w-full h-screen px-4 py-2 flex flex-col items-center justify-center">
            <div class="flex flex-col gap-4 items-center">
                <hero-icons [icon]="'rocket-launch'" [size]="48" />
                <h1 class="text-3xl font-bold leading-[130%] text-center">Tworzenie sesji treningowej</h1>
                <h1 class="text-sm eading-[150%] text-center">Dodaj pierwsze ćwiczenie<br />dzisiejszego planu</h1>
            </div>
            <div class="mt-12 w-full px-8">
                <p class="text-xs font-semibold leading-[150%] mb-1">Partia mięśniowa</p>
                <app-control-select [ngModel]="selectedMuscle()" [options]="muscleOptions()" />
            </div>
            <div class="mt-4 w-full px-8">
                <p class="text-xs font-semibold leading-[150%] mb-1">Ćwiczenie</p>
                <app-control-select [ngModel]="selectedExercise()" [options]="exercises()" />
            </div>
        </div>
    `,
    styleUrl: './workout-create-view.component.scss',
    imports: [FormsModule, HeroIconsComponent, ControlSelectComponent],
})
export class WorkoutCreateViewComponent {
    protected overlay = inject(Overlay);
    protected viewContainerRef = inject(ViewContainerRef);
    protected componentFactoryResolver = inject(ComponentFactoryResolver);
    protected apiService = inject(ApiService);
    protected router = inject(Router);
    protected workoutService = inject(WorkoutService);

    protected exercisesService = inject(ExercisesService);

    protected overlayController = inject(OverlayControllerService);

    protected selectedMuscle: WritableSignal<IControlSelectOption> = signal(null);
    protected selectedExercise: WritableSignal<number> = signal(null);

    protected exercisesCollection: Signal<Map<string, any>> = this.exercisesService.exercises;
    protected muscleOptions: Signal<{ id: string; value: string }[]> = computed(() =>
        // Array.from(this.exercisesCollection().keys())

        ['kawa', 'herbata', 'sok'].map((key: string) => ({
            id: key,
            value: `${key.substring(0, 1).toUpperCase()}${key.substring(1)}`,
        }))
    );
    protected exercises = computed(() => {
        return this.exercisesCollection().get(this.selectedMuscle()?.id);
    });

    public ngOnInit(): void {
        this.apiService.post('/workouts', {}).subscribe((id: number) => {
            if (!id) {
                this.router.navigate(['/']);
            } else {
                this.workoutService.setWorkoutId(id);
                import('../../sheets/workout-create-exercise-sheet/workout-create-exercise-sheet.component').then(
                    ({ WorkoutCreateExerciseSheetComponent }) => {
                        const reference = this.overlayController.open(
                            'WorkoutCreateExerciseSheetComponent',
                            new ComponentPortal(
                                WorkoutCreateExerciseSheetComponent,
                                this.viewContainerRef,
                                this.viewContainerRef.injector,
                                this.componentFactoryResolver
                            )
                        );
                        reference.instance.onCreate.subscribe((exerciseId) => {
                            this.workoutService
                                .createExercise(exerciseId)
                                .pipe(filter((id) => !!id))
                                .subscribe(() => {
                                    this.overlayController.close('WorkoutCreateExerciseSheetComponent');
                                });
                        });
                        reference.close.subscribe(() => {
                            this.router.navigate(['/', WORKOUT_PAGE_ROUTES_ENUM.DEFAULT, id], {
                                queryParams: { editable: true },
                            });
                        });
                    }
                );
            }
        });
    }
}
