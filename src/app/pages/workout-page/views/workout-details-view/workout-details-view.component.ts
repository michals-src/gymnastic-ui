import { Component, ComponentFactoryResolver, inject, ViewContainerRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { filter, switchMap, take } from 'rxjs';
import { IWorkout } from '@app/shared/interfaces/i-workout';
import { HeroIconsComponent } from '@app/shared/components/hero-icons/hero-icons.component';
import { BottomSheetComponent } from '@app/shared/components/bottom-sheet/bottom-sheet.component';
import { BottomBarComponent } from '@app/shared/components/bottom-bar/bottom-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkoutService } from '@pages/workout-page/services/workout.service';
import { WorkoutCreateSeriesComponent } from '@pages/workout-page/components/workout-create-series/workout-create-series.component';
import { WorkoutDetailsViewHeader } from '@app/pages/workout-page/views/workout-details-view/workout-details-view-header.component';
import { WorkoutExerciseSheetComponent } from '@app/pages/workout-page/sheets/workout-exercise-sheet/workout-exercise-sheet.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { OverlayControllerService } from '@app/shared/services/overlay-controller.service';

export interface IWorkoutResponse {
    workout: IWorkout;
    timeline: {
        series: IWorkoutSetsResponse;
        exercise: IWorkoutExerciseResponse;
    }[];
}

export interface IWorkoutSetsResponse {
    id: number;
    status: number;
    reps: string;
    exerciseId: number;
    workoutId: number;
    createdAt: string;
}

export interface IWorkoutExerciseResponse {
    id: number;
    name: string;
    muscle: string;
    createdAt: string;
}

export interface IWorkoutTimeline {
    series: {
        id: number;
        status: number;
        reps: {
            count: number;
            weight: number;
        };
        exerciseId: number;
        workoutId: number;
        createdAt: string;
    };
    exercise: {
        id: number;
        name: string;
        muscle: string;
        createdAt: string;
    };
}

@Component({
    selector: 'app-workout-details-view',
    standalone: true,
    templateUrl: './workout-details-view.component.html',
    styleUrl: './workout-details-view.component.scss',
    imports: [
        HeroIconsComponent,
        BottomSheetComponent,
        DatePipe,
        RouterLink,
        BottomBarComponent,
        FormsModule,
        ReactiveFormsModule,
        WorkoutCreateSeriesComponent,
        WorkoutDetailsViewHeader,
        WorkoutExerciseSheetComponent,
    ],
})
export class WorkoutDetailsViewComponent {
    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);
    protected workoutService = inject(WorkoutService);

    protected workoutId = this.workoutService.workoutId;
    protected workoutDetails = this.workoutService.workoutDetails;
    protected workoutExercises = this.workoutService.workoutExercises;

    protected overlayController = inject(OverlayControllerService);
    protected viewContainerRef = inject(ViewContainerRef);
    protected componentFactoryResolver = inject(ComponentFactoryResolver);

    constructor() {
        this.activatedRoute.params.pipe(take(1)).subscribe((params) => {
            const id = params?.['id'] || null;
            if (id) this.workoutService.setWorkoutId(id);
        });
    }
    ngOnInit(): void {
        if (this.workoutId()) this.workoutService.getWorkout();
    }

    onWorkoutExerciseClickHandler(workoutId: number) {
        this.workoutService.setSelectedWorkoutExerciseId(workoutId);
        import('../../sheets/workout-exercise-sheet/workout-exercise-sheet.component').then(
            ({ WorkoutExerciseSheetComponent }) => {
                const reference = this.overlayController.open(
                    'WorkoutExerciseSheetComponent',
                    new ComponentPortal(
                        WorkoutExerciseSheetComponent,
                        this.viewContainerRef,
                        this.viewContainerRef.injector,
                        this.componentFactoryResolver
                    )
                );
                reference.instance.onClose.subscribe((type) => {
                    if ('save' === type) {
                        this.updateExerciseSeries();
                    }
                    this.overlayController.close('WorkoutExerciseSheetComponent');
                });
            }
        );
    }

    protected clickNewExercise(): void {
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
                        .pipe(
                            filter((id) => !!id),
                            switchMap(() =>
                                reference.instance.addWorkoutExerciseBottomSheet.onCloseHandler().pipe(take(1))
                            )
                        )
                        .subscribe(() => {
                            this.overlayController.close('WorkoutCreateExerciseSheetComponent');
                        });
                });

                reference.close.subscribe(() => this.workoutService.getWorkout());
            }
        );
    }

    private updateExerciseSeries(): void {
        this.workoutService
            .updateExercise()
            .pipe(filter((res) => !!res))
            .subscribe();
    }
}
