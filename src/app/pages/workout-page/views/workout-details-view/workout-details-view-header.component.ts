import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeroIconsComponent } from '@app/shared/components/hero-icons/hero-icons.component';
import { SharedHeroIconsComponent } from '@app/shared/components/shared-hero-icons/shared-hero-icons.component';
import { CapitalizePipe } from '@app/shared/pipes/capitalize.pipe';

@Component({
    selector: 'app-workout-view-header',
    template: `
        <section class="pt-12 px-8 pb-4 bg-white sticky top-0">
            <a [routerLink]="['/']" class="block">
                <div class="flex items-center gap-2">
                    <shared-hero-icons [icon]="'ArrowLeftIcon'" class="size-4" />
                    <span class="text-sm leading-[150%]">Powrót</span>
                </div>
            </a>
        </section>
        <section class="pt-4 px-8 pb-8 ">
            <div class="mb-4 flex justify-between">
                <div>
                    <shared-hero-icons [icon]="'CalendarIcon'" class="size-5" />

                    <p class="col-span-11 font-bold leading-[130%]">
                        {{ workoutDetails?.createdAt | date: 'EEEE' | capitalize }}
                    </p>
                    <p class="col-span-11 col-start-2 text-sm leading-[130%]">
                        {{ workoutDetails?.createdAt | date: 'dd MMMM, yyyy' }}
                    </p>
                </div>
                <div>
                    <button
                        role="button"
                        class="flex items-center justify-center p-2 rounded-lg bg-red-800 border border-red-900 text-white">
                        <shared-hero-icons [icon]="'TrashIcon'" class="size-4" />
                    </button>
                </div>
            </div>
        </section>
    `,
    styleUrls: [],
    imports: [RouterModule, SharedHeroIconsComponent, CapitalizePipe, HeroIconsComponent, DatePipe],
    standalone: true,
})
export class WorkoutDetailsViewHeader {
    @Input() workoutDetails: any = null;
}
