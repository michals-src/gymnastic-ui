import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedHeroIconsComponent } from '@app/shared/components/shared-hero-icons/shared-hero-icons.component';
import { BottomSheetComponent } from '../../../../shared/components/bottom-sheet/bottom-sheet.component';

@Component({
    selector: 'app-home-muscle-group-details-list',
    template: `
        <div class="flex flex-col gap-4">
            <a
                [routerLink]="'1'"
                class="bg-white px-6 py-3 rounded-2xl border-b border-b-gray-200 pb-4 flex gap-4 flex-nowrap items-center">
                <div class="flex flex-col w-full">
                    <p class="text-sm leading-[150%]">Ściąganie drążka z góry do klatki</p>

                    <p class="text-xs text-neutral-400 leading-[150%]">4 ćwiczenia</p>
                </div>
                <div class="flex justify-center items-center">
                    <shared-hero-icons
                        [icon]="'EllipsisHorizontalIcon'"
                        class="size-4 flex items-center justify-center" />
                </div>
            </a>
            <a
                [routerLink]="'atlas/1'"
                class="bg-white px-6 py-3 rounded-2xl border-b border-b-gray-200 pb-4 flex gap-4 flex-nowrap items-center">
                <div class="flex flex-col w-full">
                    <p class="text-sm leading-[150%]">Wiosłowanie hantliami</p>
                    <p class="text-xs text-neutral-400 leading-[150%]">Dodano 01/01/2025</p>
                </div>
                <div class="flex justify-center items-center">
                    <shared-hero-icons
                        [icon]="'EllipsisHorizontalIcon'"
                        class="size-4 flex items-center justify-center" />
                </div>
            </a>
            <a
                class="bg-white px-6 py-3 rounded-2xl border-b border-b-gray-200 pb-4 flex gap-4 flex-nowrap items-center">
                <div class="flex flex-col w-full">
                    <p class="text-sm leading-[150%]">Wiosłowanie sztangą</p>
                    <p class="text-xs text-neutral-400 leading-[150%]">Dodano 01/01/2025</p>
                </div>
                <div class="flex justify-center items-center">
                    <shared-hero-icons
                        [icon]="'EllipsisHorizontalIcon'"
                        class="size-4 flex items-center justify-center" />
                </div>
            </a>
            <button class="w-full text-neutral-400 py-4 text-sm inline-flex items-center gap-2 justify-center">
                Więcej
                <shared-hero-icons [icon]="'ChevronDownIcon'" class="size-4" />
            </button>
        </div>

        <app-bottom-sheet>
            <div class="relative">
                <div class="absolute -top-[14px] -right-[14px]">
                    <button
                        class="aspect-square flex items-center justify-center w-[24px] h-[24px] bg-gray-100 rounded-full">
                        <shared-hero-icons [icon]="'XMarkIcon'" class="size-3" />
                    </button>
                </div>

                <div class="py-6 flex flex-col gap-2">
                    <label class="flex flex-col gap-2 relative" for="">
                        <span class="block px-4 text-xs leading-[150%]">Nazwa ćwiczenia</span>
                        <input
                            class="focus:outline-2 focus:outline-orange-600 px-4 py-3 rounded-2xl bg-neutral-200 text-sm w-full"
                            type="text"
                            name="search"
                            value="Wiosłowanie sztangą"
                            placeholder="Szukaj ćwiczenia" />
                    </label>

                    <button class="px-3 h-[40px] text-gray-800 text-xs rounded-2xl bg-orange-600 text-white">
                        Zapisz
                    </button>
                </div>

                <div class="flex flex-col">
                    <div class="mb-4">
                        <p class="leading-[150%] text-xs font-semibold">Dodatkowe akcje</p>
                        <p class="leading-[150%] text-xs">Więcej opcji do zarządzania ćwiczeniem</p>
                    </div>
                    <a
                        href=""
                        class="py-2 flex gap-2 justify-between items-center text-xs border-b border-b-neutral-200">
                        <div class="flex flex-col">
                            <span class="leading-[150%]">Szczegóły</span>
                            <span class="leading-[150%] text-neutral-400">Historia ćwiczenia</span>
                        </div>
                        <shared-hero-icons [icon]="'ArrowRightIcon'" class="size-4" />
                    </a>
                    <button class="py-2 flex gap-2 text-red-600 text-xs w-full">Usuń</button>
                </div>
            </div>
        </app-bottom-sheet>
    `,
    styleUrls: [],
    imports: [RouterLink, SharedHeroIconsComponent, BottomSheetComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class HomeMuscleGroupDetailsListComponent {}
