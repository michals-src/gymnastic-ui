import {
    Component,
    ComponentFactoryResolver,
    inject,
    Injector,
    signal,
    ViewContainerRef,
    WritableSignal,
} from '@angular/core';
import { HeroIconsComponent } from '../../../../shared/components/hero-icons/hero-icons.component';
import { WorkoutService } from '../../services/workout.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { filter, map } from 'rxjs';
import { OverlayControllerService } from '../../../../shared/services/overlay-controller.service';

@Component({
    selector: 'app-workout-create-series',
    standalone: true,
    imports: [HeroIconsComponent, FormsModule, ReactiveFormsModule],
    templateUrl: './workout-create-series.component.html',
    styleUrl: './workout-create-series.component.scss',
})
export class WorkoutCreateSeriesComponent {
    protected viewContainerRef = inject(ViewContainerRef);
    protected componentFactoryResolver = inject(ComponentFactoryResolver);
    protected overlay = inject(Overlay);
    protected injector = inject(Injector);
    protected workoutService = inject(WorkoutService);
    protected overlayControllerService = inject(OverlayControllerService);

    repetitions: WritableSignal<number> = signal(0);
    weight: WritableSignal<number> = signal(0);

    protected lastExerciseSeries: WritableSignal<any> = signal(null);

    public ngOnInit(): void {
        this.workoutService
            .getLastExerciseSeries()
            .pipe(
                filter((data) => !!data),
                map((data) => data.pop())
            )
            .subscribe((data) => {
                this.lastExerciseSeries.set({
                    ...data,
                    reps: JSON.parse(data.reps),
                });
            });
    }

    protected onInputChange(type: string, value: number): void {
        if (type === 'repetitions') this.repetitions.set(value);
        if (type === 'weight') this.weight.set(value);
    }

    protected onSaveClickHandler(): void {
        const count = this.repetitions();
        const weight = this.weight();

        // this.workoutService.insertSet(count, weight);

        this.repetitions.set(0);
        this.weight.set(0);
    }

    protected onNextExerciseClickHandler(): void {
        this.workoutService
            .updateExercise()
            .pipe(filter((res) => !!res))
            .subscribe(() => {
                import('../../sheets/workout-create-exercise-sheet/workout-create-exercise-sheet.component').then(
                    ({ WorkoutCreateExerciseSheetComponent }) => {
                        this.overlayControllerService
                            .open(
                                'WorkoutCreateExerciseSheetComponent',
                                new ComponentPortal(
                                    WorkoutCreateExerciseSheetComponent,
                                    this.viewContainerRef,
                                    this.viewContainerRef.injector,
                                    this.componentFactoryResolver
                                )
                            )
                            .close.subscribe(() => this.workoutService.getWorkout());
                    }
                );
            });
    }
}
