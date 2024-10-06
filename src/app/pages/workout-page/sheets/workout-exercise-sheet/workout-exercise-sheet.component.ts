import { NgClass } from '@angular/common';
import {
    Component,
    ComponentFactoryResolver,
    computed,
    EventEmitter,
    inject,
    Output,
    Signal,
    signal,
    ViewChild,
    ViewContainerRef,
    WritableSignal,
} from '@angular/core';
import { WorkoutService } from '@app/pages/workout-page/services/workout.service';
import { BottomSheetComponent } from '@app/shared/components/bottom-sheet/bottom-sheet.component';
import { HeroIconsComponent } from '@app/shared/components/hero-icons/hero-icons.component';
import { filter, map, take } from 'rxjs';
import { SheetAccordionComponent } from '@app/shared/components/bottom-sheet/components/sheet-accordion/sheet-accordion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SheetAccordionTabComponent } from '../../../../shared/components/bottom-sheet/components/sheet-accordion/sheet-accordion-tab.component';
import { OverlayControllerService } from '@app/shared/services/overlay-controller.service';
import { IWorkoutExerciseSeries } from '@app/pages/workout-page/classes/workout-exercise.class';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay } from '@angular/cdk/overlay';
import { ExercisesService } from '@app/shared/services/exercises.service';

@Component({
    selector: 'app-workout-exercise-sheet',
    standalone: true,
    imports: [
        BottomSheetComponent,
        HeroIconsComponent,
        NgClass,
        ReactiveFormsModule,
        FormsModule,
        SheetAccordionComponent,
        SheetAccordionTabComponent,
    ],
    templateUrl: './workout-exercise-sheet.component.html',
    styleUrl: './workout-exercise-sheet.component.scss',
})
export class WorkoutExerciseSheetComponent {
    protected overlayController = inject(OverlayControllerService);
    protected overlay = inject(Overlay);
    protected viewContainerRef = inject(ViewContainerRef);
    protected componentFactoryResolver = inject(ComponentFactoryResolver);
    protected exercisesService = inject(ExercisesService);
    protected workoutService = inject(WorkoutService);

    protected selectedWorkoutExercise = this.workoutService.selectedWorkoutExercise;

    private _exercise: WritableSignal<Array<{ id: number; name: string; group: string }>> = signal([]);
    protected isExerciseChanged = computed(() => {
        return this._exercise().length > 1;
    });
    protected exercise = computed(() => {
        return this._exercise()[this._exercise().length - 1];
    });

    private _exerciseSeries: WritableSignal<IWorkoutExerciseSeries[]> = signal([]);
    protected exerciseSeries: Signal<IWorkoutExerciseSeries[]> = this._exerciseSeries.asReadonly();
    protected lastExerciseSeries: WritableSignal<any> = signal(null);

    protected repetitions: WritableSignal<number> = signal(null);
    protected weight: WritableSignal<number> = signal(null);

    protected placeholder = computed(() => {
        const seriesLength = this.exerciseSeries().length;
        const previousWorkoutSeries = this.selectedWorkoutExercise().previousWorkoutSeries();
        const previousworkoutSerie = previousWorkoutSeries.slice(seriesLength, seriesLength + 1);
        if (previousworkoutSerie.length === 0) {
            return [{ count: 0, weight: 0 }];
        }
        return previousworkoutSerie;
    });

    private editSeriesIndex: number = null;

    @ViewChild('workoutExerciseEditSheet') protected workoutExerciseEditSheet: BottomSheetComponent | undefined;

    @Output() onClose: EventEmitter<'cancel' | 'save'> = new EventEmitter();

    ngOnInit(): void {
        this.fetchLastExerciseSeries();
        this.createCopyExerciseSeries();
    }

    protected onInputChange(type: string, value: number): void {
        if (type === 'repetitions') this.repetitions.set(value);
        if (type === 'weight') this.weight.set(value);
    }

    protected clearInputValue(type: string): void {
        if (type === 'repetitions') this.repetitions.set(null);
        if (type === 'weight') this.weight.set(null);
    }

    protected clickExerciseName(): void {
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
                reference.setInput('closable', true);
                reference.instance.onCreate.subscribe((exerciseId) => {
                    this._exercise.update((state) => {
                        state.push(this.exercisesService.getExercise(exerciseId) as any);
                        return [...state];
                    });
                    this.overlayController.close('WorkoutCreateExerciseSheetComponent');
                });
            }
        );
    }

    protected addSeriesHandler(): void {
        this._exerciseSeries.update((state) => {
            const element = {
                count: this.repetitions(),
                weight: this.weight(),
            };
            if (null === this.editSeriesIndex) {
                state.push(element);
            } else {
                state.splice(this.editSeriesIndex, 1, element);
                this.editSeriesIndex = null;
            }
            return [...state];
        });
    }

    protected clickEditSeries(count: number, weight: number, index: number): void {
        this.editSeriesIndex = index;
        this.onInputChange('repetitions', count);
        this.onInputChange('weight', weight);
    }

    protected clickCancel(): void {
        this.workoutExerciseEditSheet
            .onCloseHandler()
            .pipe(take(1))
            .subscribe(() => {
                this.onClose.emit('cancel');
            });
    }

    protected clickSave(): void {
        this.selectedWorkoutExercise().setSeries(this.exerciseSeries());
        this.workoutExerciseEditSheet
            .onCloseHandler()
            .pipe(take(1))
            .subscribe(() => {
                this.onClose.emit('save');
            });
    }

    protected closeBottomSheet(): void {
        this.overlayController.close('WorkoutExerciseSheetComponent');
    }

    protected clickExerciseClear(event: MouseEvent | TouchEvent): void {
        event.stopImmediatePropagation();
        this._exercise.update((state) => {
            return state.splice(0, 1);
        });
    }

    private createCopyExerciseSeries(): void {
        if (!this.selectedWorkoutExercise()) return;
        this._exercise.update((state) => {
            state.splice(1, state.length - 1, {
                id: this.selectedWorkoutExercise().id,
                name: this.selectedWorkoutExercise().name,
                group: this.selectedWorkoutExercise().group,
            });

            return state;
        });
    }

    private fetchLastExerciseSeries(): void {
        this.workoutService
            .getLastExerciseSeries()
            .pipe(
                filter((data) => !!data),
                map((data) => data.pop())
            )
            .subscribe((data) => {
                const previousWorkoutSeries = JSON.parse(data.reps) ?? [];
                this.selectedWorkoutExercise().addPrviousWorkoutSeries(previousWorkoutSeries);
            });
    }
}
