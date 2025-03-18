import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedHeroIconsComponent } from '@app/shared/components/shared-hero-icons/shared-hero-icons.component';

@Component({
    selector: 'app-workout-header',
    template: `
        <section class="pt-12 px-8 bg-white sticky top-0">
            <a [routerLink]="['/']" class="block">
                <div class="flex items-center gap-2">
                    <shared-hero-icons [icon]="'ArrowLeftIcon'" class="size-4" />
                    <span class="text-sm leading-[150%]">Powrót</span>
                </div>
            </a>
        </section>
        <section class="pt-4 px-8 pb-4">
            <div class="mb-4 flex gap-4 items-center">
                <shared-hero-icons [icon]="'CalendarIcon'" class="size-6" />
                <div class="flex w-full gap-2 items-end">
                    <p class="font-bold col-start-2 leading-[130%] text-2xl">
                        {{ workoutDetails?.createdAt | date: 'EEEE' }}
                    </p>
                    <p class="col-start-2 font-semibold leading-[150%]">
                        {{ workoutDetails?.createdAt | date: 'dd MMMM' }}
                    </p>
                </div>
                <!-- <div>
                    <button
                        role="button"
                        class="flex items-center justify-center p-2 rounded-lg bg-red-800 border border-red-900 text-white">
                        <shared-hero-icons [icon]="'TrashIcon'" class="size-4" />
                    </button>
                </div> -->
            </div>
        </section>
    `,
    styleUrls: [],
    imports: [RouterModule, SharedHeroIconsComponent, DatePipe],
})
export class WorkoutHeaderComponent {
    @Input() workoutDetails: any = null;
}
