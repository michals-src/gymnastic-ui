import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExercisesService } from './shared/services/exercises.service';

@Component({
    selector: 'app-root',
    template: `<router-outlet />`,
    styleUrl: './app.component.scss',
    imports: [RouterOutlet],
})
export class AppComponent {
    title = 'gymnastic';

    constructor(protected exercisesService: ExercisesService) {
        this.exercisesService.getExercises();
    }

    ngAfterViewInit(): void {}
}
