import { ChangeDetectionStrategy, Component, Input, signal, WritableSignal } from '@angular/core';
import { WorkoutExercise } from '@app/pages/workout-page/classes/workout-exercise.class';
import { BottomSheetComponent } from '../../../../shared/components/bottom-sheet/bottom-sheet.component';
import { SharedHeroIconsComponent } from '../../../../shared/components/shared-hero-icons/shared-hero-icons.component';

@Component({
    selector: 'app-workout-exercise',
    template: `
        <div class="w-full">
            <div class="flex items-center gap-2 justify-between">
                <p class="w-full text-sm leading-[150%]">{{ dataSource.name }}</p>
                <div
                    class="px-2 h-[32px] inline-flex justify-center items-center rounded-md text-xs font-bold text-white bg-yellow-700">
                    {{ dataSource.series()?.length || 0 }}
                </div>
                <button
                    (click)="togglePreview()"
                    class="px-2 bg-gray-200 rounded-md h-[32px] text-gray-600 text-xs font-semibold flex gap-2 items-center">
                    <shared-hero-icons [format]="'outline'" [icon]="'EyeIcon'" class="size-4" />
                </button>
                <button
                    (click)="toggleMoreActions()"
                    class="ml-auto px-2 h-[32px] text-gray-600 text-xs font-semibold flex gap-2 items-center">
                    <shared-hero-icons [icon]="'EllipsisHorizontalIcon'" class="size-5" />
                </button>
            </div>
        </div>

        @if (preview()) {
            <app-bottom-sheet>
                <div class="relative">
                    <div class="absolute -top-[14px] -right-[14px]">
                        <button
                            class="aspect-square flex items-center justify-center w-[24px] h-[24px] bg-gray-100 rounded-full"
                            (click)="togglePreview()">
                            <shared-hero-icons [icon]="'XMarkIcon'" class="size-3" />
                        </button>
                    </div>
                    <div class="text-center">
                        <p class="font-bold leading-[130%] mb-1">Podgląd ćwiczenia</p>
                        <p class="text-xs leading-[150%] mb-6">{{ dataSource.name }}</p>
                    </div>

                    <div class="flex flex-col gap-2">
                        @for (set of dataSource.series(); track idx; let isEven = $even, idx = $index) {
                            <div
                                [class.bg-gray-200]="isEven"
                                class="px-4 py-2 text-gray-800 text-xs rounded-2xl grid grid-cols-12">
                                <p class="col-span-2 text-xs leading-[150%]">{{ idx + 1 }} set</p>
                                <div class="col-span-8 pr-3 border-r border-r-gray-300">
                                    <p class=" text-xs leading-[150%] text-right">
                                        <span class="font-semibold">{{ set.count }}</span>
                                        powtórzeń
                                    </p>
                                </div>

                                <p class="col-span-2 text-xs leading-[150%] text-right">
                                    <span class="font-semibold">{{ set.weight }}</span>
                                    kg
                                </p>
                            </div>
                        } @empty {
                            <div class="py-8 flex items-center justify-center gap-2">
                                <shared-hero-icons [icon]="'BellAlertIcon'" [format]="'outline'" class="size-5 block" />
                                <p class="col-span-6 text-xs leading-[150%]">Nic tutaj nie znaleźliśmy</p>
                            </div>
                        }
                    </div>
                </div>
            </app-bottom-sheet>
        }

        @if (moreActions()) {
            <app-bottom-sheet>
                <div class="relative">
                    <div class="absolute -top-[14px] -right-[14px]">
                        <button
                            class="aspect-square flex items-center justify-center w-[24px] h-[24px] bg-gray-100 rounded-full"
                            (click)="toggleMoreActions()">
                            <shared-hero-icons [icon]="'XMarkIcon'" class="size-3" />
                        </button>
                    </div>
                    <div class="text-center">
                        <p class="font-bold leading-[130%] mb-1">Dodatkowe akcje</p>
                        <p class="text-xs leading-[150%] mb-6">{{ dataSource.name }}</p>
                    </div>

                    <div class="flex flex-col gap-4 justify-center">
                        <button class="px-3 h-[40px] text-gray-800 text-xs rounded-2xl bg-gray-200">Szczegóły</button>
                        <button class="h-[32px] text-red-600 text-xs">Usuń</button>
                    </div>
                </div>
            </app-bottom-sheet>
        }
    `,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SharedHeroIconsComponent, BottomSheetComponent],
})
export class WorkoutExerciseComponent {
    @Input() dataSource: WorkoutExercise;

    private _preview: WritableSignal<boolean> = signal(false);
    protected readonly preview = this._preview.asReadonly();

    private _moreActions: WritableSignal<boolean> = signal(false);
    protected readonly moreActions = this._moreActions.asReadonly();

    protected toggleMoreActions(): void {
        this._moreActions.update((state) => !state);
    }

    protected togglePreview(): void {
        this._preview.update((state) => !state);
    }
}
