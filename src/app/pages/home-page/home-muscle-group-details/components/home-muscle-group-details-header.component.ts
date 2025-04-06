import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedHeroIconsComponent } from '@app/shared/components/shared-hero-icons/shared-hero-icons.component';

@Component({
    selector: 'app-home-muscle-group-details-header',
    template: `
        <section>
            <header>
                <div class="flex gap-2 justify-between mb-2">
                    <p class="leading-[130%]">Plecy</p>
                    <button
                        class="text-xs px-3 py-1 bg-orange-600 text-white rounded-full flex gap-2 items-center justify-center">
                        <shared-hero-icons [icon]="'PlusIcon'" class="size-4" />
                        Dodaj
                    </button>
                </div>

                <div class="flex flex-nowrap items-center gap-2 leading-[150%] text-xs text-neutral-400">
                    Poniżej znajduje się lista ćwiczeń przypisanych dla wybranej grupy mięśniowej.
                </div>
            </header>
        </section>
    `,
    styleUrls: [],
    imports: [SharedHeroIconsComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class HomeMuscleGroupDetailsHeaderComponent {}
