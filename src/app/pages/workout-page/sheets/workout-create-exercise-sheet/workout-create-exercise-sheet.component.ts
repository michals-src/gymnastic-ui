import { JsonPipe, NgClass } from '@angular/common';
import {
    Component,
    computed,
    EventEmitter,
    inject,
    Input,
    Output,
    Signal,
    signal,
    ViewChild,
    WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BottomSheetComponent } from '@app/shared/components/bottom-sheet/bottom-sheet.component';
import {
    ControlSelectComponent,
    IControlSelectOption,
} from '@app/shared/components/controls/control-select/control-select.component';
import { HeroIconsComponent } from '@app/shared/components/hero-icons/hero-icons.component';
import { ApiService } from '@app/shared/services/api.service';
import { ExercisesService } from '@app/shared/services/exercises.service';
import { OverlayControllerService } from '@app/shared/services/overlay-controller.service';
import { WorkoutService } from '../../services/workout.service';

@Component({
    selector: 'app-workout-create-exercise-sheet',
    standalone: true,
    templateUrl: './workout-create-exercise-sheet.component.html',
    styleUrl: './workout-create-exercise-sheet.component.scss',
    imports: [HeroIconsComponent, BottomSheetComponent, ControlSelectComponent, FormsModule, JsonPipe, NgClass],
})
export class WorkoutCreateExerciseSheetComponent {
    protected apiService = inject(ApiService);
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
    @Input() public closable: boolean = false;
    @Output() public onCreate: EventEmitter<number> = new EventEmitter();

    @ViewChild('addWorkoutExerciseBottomSheet') addWorkoutExerciseBottomSheet: BottomSheetComponent | undefined;

    protected exercises = computed(() => {
        return this.exercisesCollection().get(this.selectedMuscle()?.id);
    });

    constructor(protected exercisesService: ExercisesService) {}

    changeExercise(value: any) {
        if (value) {
            this.selectedMuscle.set(value);
        }
    }

    clickExercise(id: number): void {
        this.selectedExercise.update((state) => {
            if (state == id) return null;
            return id;
        });
    }

    clickCreate(): void {
        this.onCreate.emit(this.selectedExercise());
    }

    clickCancel(): void {
        this.close();
    }

    protected closeOverlay(): void {
        this.overlayController.close('WorkoutCreateExerciseSheetComponent');
    }

    private close(): void {
        // this.addWorkoutExerciseBottomSheet.onCloseHandler();
    }
}
