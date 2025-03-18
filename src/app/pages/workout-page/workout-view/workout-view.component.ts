import {
    ChangeDetectionStrategy,
    Component,
    ComponentFactoryResolver,
    computed,
    inject,
    signal,
    ViewContainerRef,
    WritableSignal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IWorkout } from '@app/shared/interfaces/i-workout';
import { OverlayControllerService } from '@app/shared/services/overlay-controller.service';
import { WorkoutService } from '../services/workout.service';
import { WorkoutHeaderComponent } from '@app/pages/workout-page/workout-view/components/workout-header.component';

export interface IWorkoutResponse {
    workout: IWorkout;
    timeline: Array<WorkoutTimelineResponseModel>;
}

export type WorkoutTimelineResponseModel = {
    series: IWorkoutSetsResponse;
    exercise: IWorkoutExerciseResponse;
};

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
    selector: 'app-workout-view',
    template: `
        @if (workoutDetails()) {
            <div class="px-4 min-h-screen">
                <app-workout-header [workoutDetails]="workoutDetails()" />
                <div class="flex flex-col gap-6">
                    @for (workoutExercise of workoutExercises(); track $index) {
                        <div class="rounded-3xl px-2 pt-3 pb-2">
                            <div class="mb-4 flex items-center gap-2 px-6 py-3">
                                <p class="font-bold leading-[130%]">{{ workoutExercise.key }}</p>
                            </div>

                            <div class="flex flex-col">
                                @for (exercise of workoutExercise.values; track $index) {
                                    <app-workout-exercise
                                        class="block border-b border-b-gray-100 rounded-2xl px-6 py-4"
                                        [dataSource]="exercise" />
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div
                class="px-8 sticky bottom-0 bg-gray-900 pt-8 pb-4 after:content-[''] after:absolute after:left-0 after:-top-[1px] after:w-full after:h-[20px] after:bg-white after:rounded-b-full">
                <button
                    role="button"
                    class="bg-gray-800 text-white rounded-full h-[40px] leading-[150%] inline-flex gap-2 items-center justify-center pl-4 pr-6"
                    (click)="clickNewExercise()">
                    <shared-hero-icons [icon]="'PlusIcon'" [size]="20" />
                    <span class="text-xs">Ćwiczenie</span>
                </button>
            </div>
            <app-bottom-bar> </app-bottom-bar>
        }
    `,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [WorkoutHeaderComponent],
})
export class WorkoutViewComponent {
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
        // this.workoutService.setSelectedWorkoutExerciseId(workoutId);
        // import('../../sheets/workout-exercise-sheet/workout-exercise-sheet.component').then(
        //     ({ WorkoutExerciseSheetComponent }) => {
        //         const reference = this.overlayController.open(
        //             'WorkoutExerciseSheetComponent',
        //             new ComponentPortal(
        //                 WorkoutExerciseSheetComponent,
        //                 this.viewContainerRef,
        //                 this.viewContainerRef.injector,
        //                 this.componentFactoryResolver
        //             )
        //         );
        //         reference.instance.onClose.subscribe((type) => {
        //             if ('save' === type) {
        //                 this.updateExerciseSeries();
        //             }
        //             this.overlayController.close('WorkoutExerciseSheetComponent');
        //         });
        //     }
        // );
    }

    protected clickNewExercise(): void {
        // import('../../sheets/workout-create-exercise-sheet/workout-create-exercise-sheet.component').then(
        //     ({ WorkoutCreateExerciseSheetComponent }) => {
        //         const reference = this.overlayController.open(
        //             'WorkoutCreateExerciseSheetComponent',
        //             new ComponentPortal(
        //                 WorkoutCreateExerciseSheetComponent,
        //                 this.viewContainerRef,
        //                 this.viewContainerRef.injector,
        //                 this.componentFactoryResolver
        //             )
        //         );
        //         reference.instance.onCreate.subscribe((exerciseId) => {
        //             this.workoutService
        //                 .createExercise(exerciseId)
        //                 .pipe(
        //                     filter((id) => !!id),
        //                     switchMap(() =>
        //                         reference.instance.addWorkoutExerciseBottomSheet.onCloseHandler().pipe(take(1))
        //                     )
        //                 )
        //                 .subscribe(() => {
        //                     this.overlayController.close('WorkoutCreateExerciseSheetComponent');
        //                 });
        //         });
        //         reference.close.subscribe(() => this.workoutService.getWorkout());
        //     }
        // );
    }

    private updateExerciseSeries(): void {
        // this.workoutService
        //     .updateExercise()
        //     .pipe(filter((res) => !!res))
        //     .subscribe();
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
