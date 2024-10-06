import { Component, ComponentFactoryResolver, inject, ViewContainerRef } from '@angular/core';
import { HeroIconsComponent } from '../../../../shared/components/hero-icons/hero-icons.component';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Router } from '@angular/router';
import { OverlayControllerService } from '../../../../shared/services/overlay-controller.service';
import { WORKOUT_PAGE_ROUTES_ENUM } from '../../workout-page.routes';
import { WorkoutService } from '../../services/workout.service';
import { ApiService } from '@app/shared/services/api.service';
import { filter } from 'rxjs';

@Component({
    selector: 'app-workout-create-view',
    standalone: true,
    template: `
        <div class="w-full h-screen px-4 py-2 flex items-center justify-center">
            <div class="flex flex-col gap-4 items-center">
                <hero-icons [icon]="'rocket-launch'" [size]="48" />
                <h1 class="text-3xl font-bold leading-[130%] text-center">Tworzenie sesji treningowej</h1>
                <h1 class="text-sm eading-[150%] text-center">Dodaj pierwsze ćwiczenie<br />dzisiejszego planu</h1>
            </div>
        </div>
    `,
    styleUrl: './workout-create-view.component.scss',
    imports: [HeroIconsComponent],
})
export class WorkoutCreateViewComponent {
    protected overlay = inject(Overlay);
    protected viewContainerRef = inject(ViewContainerRef);
    protected componentFactoryResolver = inject(ComponentFactoryResolver);
    protected apiService = inject(ApiService);
    protected router = inject(Router);
    protected workoutService = inject(WorkoutService);

    protected overlayController = inject(OverlayControllerService);

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
