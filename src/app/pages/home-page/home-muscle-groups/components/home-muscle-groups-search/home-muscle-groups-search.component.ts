import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedHeroIconsComponent } from '@app/shared/components/shared-hero-icons/shared-hero-icons.component';

@Component({
    selector: 'app-home-muscle-groups-search',
    template: `
        <label class="flex gap-2 items-center relative" for="">
            <shared-hero-icons
                [icon]="'MagnifyingGlassIcon'"
                class="absolute top-1/2 -translate-y-[50%] left-[16px] size-4" />
            <input
                class="focus:outline-2 focus:outline-orange-600 pl-[42px] pr-6 py-3 rounded-2xl bg-neutral-200 text-sm w-full"
                type="text"
                name="search"
                placeholder="Szukaj ćwiczenia" />
        </label>
    `,
    styleUrls: [],
    imports: [SharedHeroIconsComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeMuscleGroupsSearchComponent {}
