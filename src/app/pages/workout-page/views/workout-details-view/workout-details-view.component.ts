import {
    Component,
    ComponentFactoryResolver,
    computed,
    inject,
    signal,
    ViewContainerRef,
    WritableSignal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap, take } from 'rxjs';
import { IWorkout } from '@app/shared/interfaces/i-workout';
import { HeroIconsComponent } from '@app/shared/components/hero-icons/hero-icons.component';
import { BottomBarComponent } from '@app/shared/components/bottom-bar/bottom-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkoutService } from '@pages/workout-page/services/workout.service';
import { WorkoutDetailsViewHeader } from '@app/pages/workout-page/views/workout-details-view/workout-details-view-header.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { OverlayControllerService } from '@app/shared/services/overlay-controller.service';
import { WorkoutDetailsViewExercise } from '@app/pages/workout-page/views/workout-details-view/workout-details-view-exercise.components';

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
        BottomBarComponent,
        FormsModule,
        ReactiveFormsModule,
        WorkoutDetailsViewHeader,
        WorkoutDetailsViewExercise,
    ],
})
export class WorkoutDetailsViewComponent {
    private activatedRoute = inject(ActivatedRoute);
    protected workoutService = inject(WorkoutService);

    protected workoutId = this.workoutService.workoutId;
    protected workoutDetails = this.workoutService.workoutDetails;
    protected workoutExercises = computed(() => {
        const exercises = this.workoutService.workoutExercises() || [];
        return exercises.reduce((_exercises, _exercise) => {
            const _group = _exercises.find((g) => g?.key === _exercise.group) || null;

            if (!_group) {
                _exercises.push({
                    key: _exercise.group,
                    values: [_exercise],
                });
            } else {
                _group.values.push(_exercise);
            }

            return _exercises;
        }, []);
    });

    protected overlayController = inject(OverlayControllerService);
    protected viewContainerRef = inject(ViewContainerRef);
    protected componentFactoryResolver = inject(ComponentFactoryResolver);

    protected chartData = [
        {
            count: '12',
            weight: '16',
        },
        {
            count: '12',
            weight: '14',
        },
        {
            count: '12',
            weight: '14',
        },
        {
            count: '12',
            weight: '14',
        },
        {
            count: '12',
            weight: '14',
        },
        {
            count: '12',
            weight: '16',
        },
        {
            count: '12',
            weight: '16',
        },
        {
            count: '12',
            weight: '16',
        },
        {
            count: '12',
            weight: '16',
        },
        {
            count: '10',
            weight: '16',
        },
        {
            count: '12',
            weight: '16',
        },
        {
            count: '8',
            weight: '20',
        },
        {
            count: '8',
            weight: '20',
        },
        {
            count: '12',
            weight: '20',
        },
        {
            count: '8',
            weight: '24',
        },
        {
            count: '6',
            weight: '24',
        },
    ];

    protected expadedTabId: WritableSignal<number> = signal(null);

    constructor() {
        const id = this.activatedRoute.snapshot.params?.['id'] || null;
        this.workoutService.setWorkoutId(id);
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

    protected clickExpandTab(id: number): void {
        this.expadedTabId.update((state) => {
            if (id === state) {
                return null;
            }
            return id;
        });
    }
}
