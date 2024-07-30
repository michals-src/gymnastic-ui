import { Component, ComponentFactoryResolver, inject, ViewContainerRef } from '@angular/core';
import { HeroIconsComponent } from '../../../../shared/components/hero-icons/hero-icons.component';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OverlayControllerService } from '../../../../shared/services/overlay-controller.service';
import { WORKOUT_PAGE_ROUTES_ENUM } from '../../workout-page.routes';
import { WorkoutService } from '../../services/workout.service';

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
    protected httpClient = inject(HttpClient);
    protected router = inject(Router);
    protected workoutService = inject(WorkoutService);

    protected overlayControllerService = inject(OverlayControllerService);

    public ngOnInit(): void {
        this.httpClient.post('http://localhost:3000/workouts', {}).subscribe((id: number) => {
            if (!id) {
                this.router.navigate(['/']);
            } else {
                this.workoutService.setWorkoutId(id);

                import('../../components/workout-create-exercise-sheet/workout-create-exercise-sheet.component').then(
                    ({ WorkoutCreateExerciseSheetComponent }) => {
                        const reference = this.overlayControllerService.open(
                            'WorkoutCreateExerciseSheetComponent',
                            new ComponentPortal(
                                WorkoutCreateExerciseSheetComponent,
                                this.viewContainerRef,
                                this.viewContainerRef.injector,
                                this.componentFactoryResolver
                            )
                        );
                        reference.close$.subscribe(() => {
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
