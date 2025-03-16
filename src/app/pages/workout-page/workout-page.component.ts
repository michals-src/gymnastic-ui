import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-workout-view',
    imports: [RouterModule],
    template: `
        <section>
            <router-outlet></router-outlet>
        </section>
    `,
    styleUrls: [],
})
export class WorkoutPageComponent {}
