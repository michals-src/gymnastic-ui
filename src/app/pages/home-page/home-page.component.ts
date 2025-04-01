import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SharedHeroIconsComponent } from '../../shared/components/shared-hero-icons/shared-hero-icons.component';

@Component({
    selector: 'app-home-muscle-groups',
    template: `
        <router-outlet></router-outlet>
        <section class="px-8 fixed flex items-center bottom-8 w-full">
            <a class="rounded-full bg-green-900 text-white flex items-center justify-center flex-[0_0_32px] p-3">
                <shared-hero-icons [icon]="'PlusIcon'" class="size-5" />
            </a>
            <div class="w-[calc(100%-88px)] flex">
                <div
                    class="px-3 py-2 bg-green-900 text-white rounded-4xl inline-flex gap-4 justify-center items-center m-auto">
                    <a
                        [routerLink]="['/']"
                        routerLinkActivate="bg-white text-green-900"
                        class="rounded-full h-[32px] flex items-center justify-center gap-2 px-6">
                        <shared-hero-icons [format]="'outline'" [icon]="'HomeIcon'" class="size-5" />
                    </a>
                    <a
                        routerLinkActivate="bg-white text-green-900"
                        [routerLink]="['/atlas']"
                        class="rounded-full text-white h-[32px] flex items-center justify-center gap-2 px-6">
                        <shared-hero-icons [format]="'outline'" [icon]="'BookOpenIcon'" class="size-5" />
                    </a>
                </div>
            </div>
        </section>
    `,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [RouterOutlet, RouterLink, SharedHeroIconsComponent],
})
export class HomePageComponent {}
