import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeroIconsComponent } from '@app/shared/components/hero-icons/hero-icons.component';

@Component({
    selector: 'app-workout-view',
    standalone: true,
    imports: [RouterModule, HeroIconsComponent],
    template: ` <section>
        <router-outlet></router-outlet>
    </section>`,
    styleUrl: './workout-view.component.scss',
})
export class WorkoutViewComponent {}
