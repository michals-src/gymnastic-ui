import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, signal, WritableSignal } from '@angular/core';
import { FormArray, FormArrayName, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HeroIconsComponent } from '../../../../shared/components/hero-icons/hero-icons.component';
import { JsonPipe } from '@angular/common';
import { seed } from './seed';
import { delay } from 'rxjs';

@Component({
    selector: 'app-admin-workout-add',
    imports: [ReactiveFormsModule, HttpClientModule, HeroIconsComponent, JsonPipe],
    templateUrl: './admin-workout-add.component.html',
    styleUrl: './admin-workout-add.component.scss',
    providers: [HttpClient],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminWorkoutAddComponent {
    _exercises: WritableSignal<any> = signal(null);
    exercises = computed(() => {
        return Object.entries({ ...(this._exercises() || {}) }).map(([group, exercises]) => {
            return {
                group,
                exercises,
            } as {
                group: string;
                exercises: any[];
            };
        });
    });

    fg: FormGroup = new FormGroup({
        workoutMuscleGroup: new FormControl(null),
        workoutSets: new FormArray([
            new FormArray([new FormControl(0), new FormControl(0)]),
            new FormArray([new FormControl(0), new FormControl(0)]),
            new FormArray([new FormControl(0), new FormControl(0)]),
        ]),
    });
    step: WritableSignal<number> = signal(0);

    workoutDate: FormControl<string> = new FormControl(null);
    workoutId: WritableSignal<number> = signal(null);

    private cacheKey: string = '_workout-session-id';

    constructor(private httpClient: HttpClient) {}

    ngOnInit(): void {
        this.httpClient.get('http://localhost:3000/exercises').subscribe((data: any) => {
            const aggregate = data.reduce((map, exercise) => {
                if (!map.hasOwnProperty(exercise.muscle)) {
                    map[exercise.muscle] = [];
                }
                map[exercise.muscle].push(exercise);
                return map;
            }, {});
            this._exercises.set(aggregate);
        });

        let cacheId: string = localStorage.getItem(this.cacheKey);
        if (cacheId) {
            this.workoutId.set(+cacheId);
            this.step.set(1);
        }

        // seed.forEach((workout) => {
        //     console.log(new Date(this.convertDate(workout.workoutDate)));
        //     this.httpClient
        //         .post('http://localhost:3000/workouts', {
        //             workoutDate: new Date(this.convertDate(workout.workoutDate)).toISOString(),
        //         })
        //         .subscribe((data) => {
        //             const id = data[0].id;
        //             workout.data.forEach((exercise) => {
        //                 this.httpClient
        //                     .post('http://localhost:3000/series', {
        //                         ...exercise,
        //                         workoutId: id,
        //                     })
        //                     .subscribe();
        //             });
        //         });
        // });
    }

    // convertDate(str: string): string {
    //     const [day, month, year] = str.split('-');
    //     return `${year}-${month}-${day}`;
    // }

    onAddSeriesHandler() {
        (this.fg.get('workoutSets') as FormArray).push(new FormArray([new FormControl(0), new FormControl(0)]));
    }

    onSubmitHandler() {
        if (this.workoutId()) {
            this.httpClient
                .post('http://localhost:3000/series', {
                    workoutId: this.workoutId(),
                    exerciseId: this.fg.get('workoutMuscleGroup').value,
                    reps: [...(this.fg.get('workoutSets').value || [])].map((sets) => ({
                        count: sets[0],
                        weight: sets[1],
                    })),
                })
                .subscribe(() => {
                    this.onStepChangeHandler(1);
                });

            this.formReset();
        }
    }

    onCreateWorkout(): void {
        this.httpClient
            .post('http://localhost:3000/workouts', {
                workoutDate: new Date(this.workoutDate.value).toISOString(),
            })
            .subscribe((id) => {
                this.workoutId.set(id[0].id);
                localStorage.setItem(this.cacheKey, `${id[0].id}`);
                this.onStepChangeHandler(1);
            });
    }

    onFinishClickHandler(): void {
        this.formReset();
        this.workoutId.set(null);
        this.step.set(0);
        localStorage.removeItem(this.cacheKey);
    }

    onStepChangeHandler(nextStep: number): void {
        this.step.set(nextStep);
    }

    formReset(): void {
        (this.fg.get('workoutSets') as FormArray).clear();
        (this.fg.get('workoutSets') as FormArray).setControl(0, new FormArray([new FormControl(0), new FormControl(0)]));
        (this.fg.get('workoutSets') as FormArray).setControl(1, new FormArray([new FormControl(0), new FormControl(0)]));
        (this.fg.get('workoutSets') as FormArray).setControl(2, new FormArray([new FormControl(0), new FormControl(0)]));
        this.fg.reset();
    }
}
