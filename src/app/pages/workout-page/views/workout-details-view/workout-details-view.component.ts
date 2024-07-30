import { Component, inject, signal, WritableSignal } from '@angular/core';
import { HeroIconsComponent } from '../../../../shared/components/hero-icons/hero-icons.component';
import { BottomSheetComponent } from '../../../../shared/components/bottom-sheet/bottom-sheet.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { filter, take } from 'rxjs';
import { DatePipe } from '@angular/common';
import { IWorkout } from '../../../../shared/interfaces/i-workout';
import { WorkoutService } from '../../services/workout.service';
import { BottomBarComponent } from '../../../../shared/components/bottom-bar/bottom-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkoutCreateSeriesComponent } from '../../components/workout-create-series/workout-create-series.component';

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
    ],
})
export class WorkoutDetailsViewComponent {
    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);
    protected workoutService = inject(WorkoutService);

    protected workoutId = this.workoutService.workoutId.asReadonly();
    protected workoutDetails = this.workoutService.workoutDetails.asReadonly();
    protected workoutTimeline = this.workoutService.workoutTimeline.asReadonly();

    protected isEditMode: WritableSignal<boolean> = signal(false);

    constructor() {
        this.activatedRoute.params.pipe(take(1)).subscribe((params) => {
            const id = params?.['id'] || null;
            if (id) this.workoutService.setWorkoutId(id);
        });

        this.activatedRoute.queryParamMap.pipe(take(1)).subscribe((params) => {
            if (params.has('editable')) this.isEditMode.set(true);
        });
    }

    ngOnInit(): void {
        if (this.workoutId()) this.workoutService.getWorkout();
    }

    onStopClickHandler(): void {
        this.workoutService
            .updateExercise()
            .pipe(filter((res) => !!res))
            .subscribe(() => {
                this.workoutService.detachExercise();
                this.router.navigate(['/']);
            });
    }
}
