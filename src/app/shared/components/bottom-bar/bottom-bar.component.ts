import { Overlay } from '@angular/cdk/overlay'
import { TemplatePortal } from '@angular/cdk/portal'
import { Component, inject, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core'

@Component({
    selector: 'app-bottom-bar',
    standalone: true,
    imports: [],
    templateUrl: './bottom-bar.component.html',
    styleUrl: './bottom-bar.component.scss',
})
export class BottomBarComponent {
    @ViewChild('bottomBar') protected bottomBar: TemplateRef<any> | undefined

    private overlay = inject(Overlay)
    private viewContainerRef = inject(ViewContainerRef)

    public ngAfterViewInit(): void {
        if (this.bottomBar) {
            this.overlay.create().attach(new TemplatePortal(this.bottomBar, this.viewContainerRef))
        }
    }
}
