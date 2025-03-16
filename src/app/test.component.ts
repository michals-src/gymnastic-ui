import { Component, ElementRef, inject, Input } from '@angular/core';

@Component({
    selector: 'app-test',
    template: `<div class="red">{{ dane }}</div>`,
    styleUrls: ['app.component.scss'],
    standalone: false
})
export class TestComponent {
    public readonly elementRef = inject(ElementRef);
    @Input() dane: any;
}
