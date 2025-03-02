import { NgClass, NgStyle } from '@angular/common';
import { Component, EventEmitter, Output, Renderer2, WritableSignal, signal } from '@angular/core';

@Component({
    selector: 'app-bottom-sheet',
    standalone: true,
    imports: [NgClass, NgStyle],
    templateUrl: './bottom-sheet.component.html',
    styleUrl: './bottom-sheet.component.scss',
})
export class BottomSheetComponent {
    @Output() onClose: EventEmitter<void> = new EventEmitter();

    protected touchOffset: WritableSignal<number> = signal(0);
    protected isTouch: WritableSignal<boolean> = signal(false);
    protected isOpened: WritableSignal<boolean> = signal(false);

    constructor(private readonly renderer: Renderer2) {}

    public ngOnInit(): void {
        this.renderer.addClass(document.body, 'block-scroll');
    }

    public ngOnDestroy(): void {
        this.renderer.removeClass(document.body, 'block-scroll');
    }

    public ngAfterViewInit(): void {
        setTimeout(() => this.isOpened.set(true), 100);
    }
}
