import { Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    inject,
    signal,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    WritableSignal,
} from '@angular/core';

@Component({
    selector: 'app-bottom-bar',
    standalone: true,
    imports: [],
    templateUrl: './bottom-bar.component.html',
    styleUrl: './bottom-bar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomBarComponent {
    private overlay = inject(Overlay);
    private viewContainerRef = inject(ViewContainerRef);
    private readonly elementRef = inject(ElementRef);

    protected height: WritableSignal<number> = signal(0);

    @ViewChild('bottomBar') protected bottomBar: TemplateRef<any> | undefined;
    @ViewChild('bottomBarSection') protected bottomBarSection: ElementRef<HTMLDivElement> | undefined;

    public ngAfterViewInit(): void {
        if (this.bottomBar) {
            this.overlay.create().attach(new TemplatePortal(this.bottomBar, this.viewContainerRef));
        }
    }
}
