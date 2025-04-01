import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedHeroIconsComponent } from '../../../../../shared/components/shared-hero-icons/shared-hero-icons.component';

@Component({
    selector: 'app-home-muscle-groups-list-header',
    template: `
        <div class="flex gap-2 justify-between mb-2">
            <p class="leading-[130%]">Atlas ćwiczeń</p>
            <button
                class="text-xs px-3 py-1 bg-orange-600 text-white rounded-full flex gap-2 items-center justify-center">
                <shared-hero-icons [icon]="'PlusIcon'" class="size-4" />
                Dodaj
            </button>
        </div>

        <div class="flex flex-nowrap items-center gap-2 leading-[150%] text-xs text-neutral-400">
            Wybierz grubę mięśniową, aby przejść do wybranej listy ćwiczeń.
        </div>
    `,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SharedHeroIconsComponent],
})
export class HomeMuscleGroupsListHeaderComponent {}
