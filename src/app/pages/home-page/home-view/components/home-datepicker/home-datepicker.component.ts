import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedHeroIconsComponent } from '../../../../../shared/components/shared-hero-icons/shared-hero-icons.component';

@Component({
    selector: 'app-home-datepicker',
    template: `
        <div class="flex flex-col gap-4">
            <div class="flex gap-8 items-end justify-between">
                <div class="flex items-center gap-4">
                    <shared-hero-icons [icon]="'CalendarIcon'" class="size-4" />
                    <p class="leading-[150%]">2025</p>
                </div>
                <div class="flex  gap-2">
                    <button class="w-[32px] h-[32px] rounded-full bg-neutral-200 flex items-center justify-center">
                        <shared-hero-icons [icon]="'ChevronLeftIcon'" class="size-3" />
                    </button>
                    <button class="w-[32px] h-[32px] rounded-full bg-neutral-200 flex items-center justify-center">
                        <shared-hero-icons [icon]="'ChevronRightIcon'" class="size-3" />
                    </button>
                </div>
            </div>
            <div class="flex gap-2 justify-around items-center">
                <button
                    class="w-full h-[28px] rounded-full  text-neutral-800 bg-neutral-200 flex items-center justify-center text-xs leading-[150%]">
                    Sty
                </button>
                <button
                    class="w-full h-[28px] rounded-full  text-neutral-800 bg-neutral-200 flex items-center justify-center text-xs leading-[150%]">
                    Lut
                </button>
                <button
                    class="w-full h-[28px] rounded-full  text-neutral-800 bg-neutral-200 flex items-center justify-center text-xs leading-[150%]">
                    Mar
                </button>
                <button
                    class="w-full h-[28px] rounded-full  text-white bg-orange-600 flex items-center justify-center text-xs leading-[150%]">
                    Kwi
                </button>
            </div>
        </div>
    `,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SharedHeroIconsComponent],
    standalone: true,
})
export class HomeDatePickerComponent {}
