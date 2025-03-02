import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    Input,
    signal,
    TemplateRef,
    ViewEncapsulation,
    WritableSignal,
} from '@angular/core';
import { HeroIconsComponent } from '../../../hero-icons/hero-icons.component';

@Component({
    selector: 'sheet-accordion-tab',
    template: `
        <div class="sheet-accordion__tab py-2">
            <a role="button" class="flex gap-4 items-center" (click)="toggleSelect()">
                <div class="w-full text-xs leading-[150%] font-semibold text-zinc-800">
                    <ng-container
                        [ngTemplateOutlet]="accordionHeaderTemplate ?? defaultHeaderTpl"
                        [ngTemplateOutletContext]="{ $implicit: header }">
                        <ng-template #defaultHeaderTpl let-text>
                            <p>{{ text }}</p>
                        </ng-template>
                    </ng-container>
                </div>
                <button class="w-[16px] h-auto inline-flex outline-none bg-transparent p-0 m-0">
                    @if (isSelected()) {
                        <hero-icons [icon]="'chevron-up'" [size]="16" class="text-zinc-600" />
                    } @else {
                        <hero-icons [icon]="'chevron-down'" [size]="16" class="text-zinc-600" />
                    }
                </button>
            </a>
            @if (isSelected()) {
                <ng-content />
            }
        </div>
    `,
    styleUrls: [],
    standalone: true,
    imports: [HeroIconsComponent, NgTemplateOutlet],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class SheetAccordionTabComponent {
    @Input() header: string = null;
    public isSelected: WritableSignal<boolean> = signal(false);

    @ContentChild('header') public accordionHeaderTemplate: TemplateRef<any>;

    constructor(public elementRef: ElementRef) {}

    toggleSelect(): void {
        this.isSelected.update((state) => !state);
    }
}
