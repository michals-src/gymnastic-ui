import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedHeroIconsComponent } from '@app/shared/components/shared-hero-icons/shared-hero-icons.component';
import { HomeMuscleGroupDetailsHeaderComponent } from './components/home-muscle-group-details-header.component';
import { HomeMuscleGroupDetailsListComponent } from './components/home-muscle-group-details-list.component';

@Component({
    selector: 'app-home-muscle-groups',
    template: `
        <section class="mt-8 px-12">
            <a class="text-xs flex gap-2 items-center" [routerLink]="'/atlas'">
                <shared-hero-icons [icon]="'ArrowLeftIcon'" class="size-4" />
                Powrót do partii mięśniowych
            </a>
        </section>
        <app-home-muscle-group-details-header class="block px-14 mt-8 mb-4" />
        <section>
            <app-home-muscle-group-details-list class="block px-8" />
        </section>
    `,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        RouterLink,
        SharedHeroIconsComponent,
        HomeMuscleGroupDetailsHeaderComponent,
        HomeMuscleGroupDetailsListComponent,
    ],
})
export class HomeMuscleGroupDetailsComponent {}
