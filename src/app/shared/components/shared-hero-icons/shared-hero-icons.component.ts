import { ChangeDetectionStrategy, Component, Input, signal, WritableSignal } from '@angular/core';
import { HeroIcons as TypeHeroIconsSolid16 } from './16/solid';
import { HeroIcons as TypeHeroIconsSolid20 } from './20/solid';
import { HeroIcons as TypeHeroIconsSolid24 } from './24/solid';
import { HeroIcons as TypeHeroIconsOutline24 } from './24/outline';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'shared-hero-icons',
    imports: [],
    template: ``,
    styleUrl: './shared-hero-icons.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[innerHTML]': '_icon()',
    }
})
export class SharedHeroIconsComponent {
    @Input({ required: true }) icon:
        | TypeHeroIconsSolid16
        | TypeHeroIconsSolid20
        | TypeHeroIconsSolid24
        | TypeHeroIconsOutline24;
    @Input() size: 24 | 20 | 16 = 24;
    @Input() format: 'solid' | 'outline' = 'solid';

    protected _icon: WritableSignal<any> = signal(null);

    constructor(private sanitizer: DomSanitizer) {}

    public ngAfterViewInit(): void {
        if (!this.icon) {
            throw '[shared-hero-icons] icon input is undefined.';
        }

        this.getModule().then((icons) => {
            this._icon.set(this.sanitizer.bypassSecurityTrustHtml(icons[this.icon]));
        });
    }

    private getModule() {
        const _icon = `${this.size}-${this.format}`;
        switch (_icon) {
            case '16-solid':
                return import('./16/solid/index.js');
            case '20-solid':
                return import('./20/solid/index.js');
            case '24-solid':
                return import('./24/solid/index.js');
            case '24-outline':
                return import('./24/outline');

            default:
                return import('./24/solid/index.js');
        }
    }
}
