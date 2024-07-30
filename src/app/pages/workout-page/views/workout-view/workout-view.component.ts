import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-workout-view',
    standalone: true,
    imports: [RouterModule],
    template: `<router-outlet></router-outlet>`,
    styleUrl: './workout-view.component.scss',
})
export class WorkoutViewComponent {}
