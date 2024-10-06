import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeroIconsComponent } from '@app/shared/components/hero-icons/hero-icons.component';

@Component({
    selector: 'app-workout-view',
    standalone: true,
    imports: [RouterModule, HeroIconsComponent],
    template: ` <section>
        <div class="p-4 bg-blue-950 text-white rounded-b-2xl sticky top-0 shadow-sm">
            <a [routerLink]="['/']">
                <div class="flex items-center gap-2">
                    <hero-icons [icon]="'arrow-left'" [size]="14" />
                    <span class="text-sm leading-[150%]">Powrót</span>
                </div>
            </a>
        </div>
        <router-outlet></router-outlet>
    </section>`,
    styleUrl: './workout-view.component.scss',
})
export class WorkoutViewComponent {}
