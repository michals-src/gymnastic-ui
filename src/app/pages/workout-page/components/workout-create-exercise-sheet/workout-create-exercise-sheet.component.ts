import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { HeroIconsComponent } from '../../../../shared/components/hero-icons/hero-icons.component';
import { BottomSheetComponent } from '../../../../shared/components/bottom-sheet/bottom-sheet.component';
import {
    ControlSelectComponent,
    IControlSelectOption,
} from '../../../../shared/components/controls/control-select/control-select.component';
import { ExercisesService } from '../../../../shared/services/exercises.service';
import { FormsModule } from '@angular/forms';
import { JsonPipe, NgClass } from '@angular/common';
import { OverlayControllerService } from '../../../../shared/services/overlay-controller.service';
import { WorkoutService } from '../../services/workout.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-workout-create-exercise-sheet',
    standalone: true,
    templateUrl: './workout-create-exercise-sheet.component.html',
    styleUrl: './workout-create-exercise-sheet.component.scss',
    imports: [HeroIconsComponent, BottomSheetComponent, ControlSelectComponent, FormsModule, JsonPipe, NgClass],
})
export class WorkoutCreateExerciseSheetComponent {
    protected httpClient = inject(HttpClient);
    protected overlayController = inject(OverlayControllerService);
    protected workoutService = inject(WorkoutService);

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
        return this.exercisesCollection().get(this.selectedMuscle()?.id);
    });

    constructor(protected exercisesService: ExercisesService) {}

    onMuscleChangeHandler(value: any) {
        if (value) {
            this.selectedMuscle.set(value);
        }
    }

    onExerciseClickHandler(id: number): void {
        this.selectedExercise.update((state) => {
            if (state == id) return null;
            return id;
        });
    }

    onCreateClickHandler(): void {
        this.httpClient
            .post('http://localhost:3000/series', {
                workoutId: this.workoutService.workoutId(),
                exerciseId: this.selectedExercise(),
            })
            .subscribe((id: number) => {
                if (id) {
                    this.workoutService.attachExercise(this.selectedExercise());
                    this.overlayController.close('WorkoutCreateExerciseSheetComponent');
                }
            });
    }
}
