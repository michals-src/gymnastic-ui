import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedHeroIconsComponent } from '../../../../../shared/components/shared-hero-icons/shared-hero-icons.component';
import { CapitalizePipe } from '../../../../../shared/pipes/capitalize.pipe';

@Component({
    selector: 'app-home-workouts-list-item',
    template: `
        <div class="calendar-review__list flex flex-col gap-4 bg-gray-100 p-8">
            <a class="calendar-review__list-item border-b border-b-gray-200 pb-4 flex gap-4 flex-nowrap items-center">
                <div class="flex flex-col w-full">
                    <p class="text-sm font-bold leading-[150%]">
                        {{ '01-03-2025' | date: 'EEEE' | capitalize }}
                    </p>
                    <div class="flex flex-nowrap items-center gap-2 leading-[150%]">
                        <p class="text-sm text-gray-400">{{ '01-03-2025' | date: 'dd MMMM, y' }}</p>
                    </div>
                </div>
                <div class="flex justify-center items-center">
                    <shared-hero-icons
                        [icon]="'ChevronRightIcon'"
                        class="flex-[0_0_32px] w-[32px] h-[32px] p-1 bg-white rounded-lg shadow-sm flex items-center justify-center" />
                </div>
            </a>
        </div>
    `,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [DatePipe, SharedHeroIconsComponent, CapitalizePipe],
})
export class HomeWorkoutsListItemComponent {}
