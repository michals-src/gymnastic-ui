import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedHeroIconsComponent } from '@app/shared/components/shared-hero-icons/shared-hero-icons.component';

@Component({
    selector: 'app-home-muscle-groups-list',
    template: `
        <div class="flex flex-col gap-4">
            <a
                [routerLink]="'1'"
                class="bg-white px-6 py-3 rounded-2xl border-b border-b-gray-200 pb-4 flex gap-4 flex-nowrap items-center">
                <div class="flex flex-col w-full">
                    <p class="text-sm leading-[150%]">Plecy</p>
                    <p class="text-xs text-neutral-400 leading-[150%]">4 ćwiczenia</p>
                </div>
                <div class="flex justify-center items-center">
                    <shared-hero-icons [icon]="'ChevronRightIcon'" class="size-4 flex items-center justify-center" />
                </div>
            </a>
            <a
                [routerLink]="'atlas/1'"
                class="bg-white px-6 py-3 rounded-2xl border-b border-b-gray-200 pb-4 flex gap-4 flex-nowrap items-center">
                <div class="flex flex-col w-full">
                    <p class="text-sm leading-[150%]">Klatka piersiowa</p>
                    <p class="text-xs text-neutral-400 leading-[150%]">4 ćwiczenia</p>
                </div>
                <div class="flex justify-center items-center">
                    <shared-hero-icons [icon]="'ChevronRightIcon'" class="size-4 flex items-center justify-center" />
                </div>
            </a>
            <a
                class="bg-white px-6 py-3 rounded-2xl border-b border-b-gray-200 pb-4 flex gap-4 flex-nowrap items-center">
                <div class="flex flex-col w-full">
                    <p class="text-sm leading-[150%]">Barki</p>
                    <p class="text-xs text-neutral-400 leading-[150%]">4 ćwiczenia</p>
                </div>
                <div class="flex justify-center items-center">
                    <shared-hero-icons [icon]="'ChevronRightIcon'" class="size-4 flex items-center justify-center" />
                </div>
            </a>
            <a
                class="bg-white px-6 py-3 rounded-2xl border-b border-b-gray-200 pb-4 flex gap-4 flex-nowrap items-center">
                <div class="flex flex-col w-full">
                    <p class="text-sm leading-[150%]">Biceps</p>
                    <p class="text-xs text-neutral-400 leading-[150%]">4 ćwiczenia</p>
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
    imports: [RouterLink, SharedHeroIconsComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeMuscleGroupsListComponent {}
