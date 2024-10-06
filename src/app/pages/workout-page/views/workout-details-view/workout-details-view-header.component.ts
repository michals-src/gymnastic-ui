import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { HeroIconsComponent } from '@app/shared/components/hero-icons/hero-icons.component';

@Component({
    selector: 'app-workout-view-header',
    template: `
        <div class="mb-5 px-4">
            <div class="mb-2">
                <h1 class="text-2xl leading-[130%] font-bold">Trening</h1>
            </div>
            <div class="flex items-center gap-2 mb-1">
                <hero-icons [icon]="'calendar'" [size]="14" />
                <p class="text-sm font-bold leading-[130%]">{{ workoutDetails?.createdAt | date : 'fullDate' }}</p>
            </div>
            <div class="flex items-center text-gray-400 gap-2">
                <hero-icons [icon]="'clock'" [size]="14" />
                <p class="text-sm leading-[150%]">{{ workoutDetails?.durationTime ?? 0 }} czas trwania</p>
            </div>
        </div>
    `,
    styleUrls: [],
    imports: [HeroIconsComponent, DatePipe],
    standalone: true,
})
export class WorkoutDetailsViewHeader {
    @Input() workoutDetails: any = null;
}
