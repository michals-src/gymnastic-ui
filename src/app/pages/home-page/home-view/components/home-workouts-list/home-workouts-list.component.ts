import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedHeroIconsComponent } from '@app/shared/components/shared-hero-icons/shared-hero-icons.component';
import { CapitalizePipe } from '@app/shared/pipes/capitalize.pipe';

@Component({
    selector: 'app-home-workouts-list',
    template: `
        <div class="flex flex-col gap-4 px-8">
            <a
                class="bg-white px-6 py-3 rounded-4xl border-b border-b-gray-200 pb-4 flex gap-4 flex-nowrap items-center">
                <div class="flex flex-col w-full">
                    <p class="text-sm leading-[150%]">
                        {{ '01-03-2025' | date: 'EEEE' | capitalize }}
                    </p>
                    <div class="flex flex-nowrap items-center gap-2 leading-[150%]">
                        <p class="text-xs text-gray-400">{{ '01-03-2025' | date: 'dd MMMM, y' }}</p>
                    </div>
                </div>
                <div class="flex justify-center items-center">
                    <shared-hero-icons [icon]="'ChevronRightIcon'" class="size-4 flex items-center justify-center" />
                </div>
            </a>
            <button class="w-full text-neutral-400 py-4 text-sm inline-flex items-center gap-2 justify-center">
                Więcej
                <shared-hero-icons [icon]="'ChevronDownIcon'" class="size-4" />
            </button>
        </div>
    `,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [DatePipe, SharedHeroIconsComponent, CapitalizePipe],
})
export class HomeWorkoutsListComponent {}
