import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    QueryList,
    signal,
    ViewEncapsulation,
    WritableSignal,
} from '@angular/core';
import { HeroIconsComponent } from '@app/shared/components/hero-icons/hero-icons.component';

@Component({
    selector: 'sheet-accordion',
    imports: [HeroIconsComponent, NgTemplateOutlet, NgComponentOutlet],
    template: `
        <div class="sheet-accordion px-4 bg-zinc-100 rounded-xl">
            <ng-content />
        </div>
    `,
    styleUrl: './sheet-accordion.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SheetAccordionComponent {
    @ContentChildren(SheetAccordionComponent, { descendants: true })
    accordionTabs!: QueryList<ElementRef>;

    protected accordionTabsArray: WritableSignal<ElementRef[]> = signal([]);

    ngAfterContentInit() {
        this.accordionTabsArray.set(this.accordionTabs.toArray());
    }
}
