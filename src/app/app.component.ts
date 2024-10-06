import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroIconsComponent } from './shared/components/hero-icons/hero-icons.component';
import { BottomSheetComponent } from './shared/components/bottom-sheet/bottom-sheet.component';
import { ExercisesService } from './shared/services/exercises.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, HeroIconsComponent, BottomSheetComponent],
})
export class AppComponent {
    title = 'gymnastic';

    constructor(protected exercisesService: ExercisesService) {
        this.exercisesService.getExercises();
    }
}
