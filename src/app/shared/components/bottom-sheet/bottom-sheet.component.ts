import { NgClass, NgStyle } from '@angular/common';
import {
    Component,
    DestroyRef,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    Renderer2,
    ViewChild,
    WritableSignal,
    signal,
} from '@angular/core';
import { Subject, filter, fromEvent, map, of, switchMap, take, takeUntil, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-bottom-sheet',
    standalone: true,
    imports: [NgClass, NgStyle],
    templateUrl: './bottom-sheet.component.html',
    styleUrl: './bottom-sheet.component.scss',
})
export class BottomSheetComponent {
    @Input() closable: boolean = true;
    @Output() onClose: EventEmitter<void> = new EventEmitter();

    protected touchOffset: WritableSignal<number> = signal(0);
    protected isTouch: WritableSignal<boolean> = signal(false);
    protected isOpened: WritableSignal<boolean> = signal(false);
    protected onClose$: Subject<void> = new Subject();

    @ViewChild('bottomSheetWindow') private bottomSheetWindow: ElementRef<HTMLDivElement> | undefined;
    @ViewChild('bottomSheetWindowContent') private bottomSheetWindowContent: ElementRef<HTMLDivElement> | undefined;

    constructor(private readonly renderer: Renderer2, private readonly destroyRef: DestroyRef) {}

    public ngOnInit(): void {
        this.renderer.addClass(document.body, 'block-scroll');
    }

    public ngAfterViewInit(): void {
        this.isOpened.set(true);
        if (this.bottomSheetWindow) {
            fromEvent(this.bottomSheetWindow?.nativeElement, 'touchend')
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => {
                    this.isTouch.set(false);
                });

            this.listenSwapClose();
        }
    }

    public onCloseHandler() {
        this.isTouch.set(false);
        this.isOpened.set(false);

        if (this.bottomSheetWindow) {
            fromEvent(this.bottomSheetWindow.nativeElement, 'transitionend')
                .pipe(take(1))
                .subscribe(() => {
                    this.onClose.emit();
                    this.onClose$.next();
                });
        }
        this.renderer.removeClass(document.body, 'block-scroll');
        return this.onClose$.asObservable();
    }

    private listenSwapClose(): void {
        if (!this.bottomSheetWindow?.nativeElement || !this.closable) return;

        fromEvent(this.bottomSheetWindow?.nativeElement, 'touchstart')
            .pipe(
                filter(() => this.bottomSheetWindowContent.nativeElement.scrollTop === 0),
                takeUntilDestroyed(this.destroyRef),
                switchMap((e: Event) => {
                    const { clientY: clientYOrigin } = (e as TouchEvent).touches[0];
                    this.isTouch.set(true);

                    return fromEvent(window, 'touchmove').pipe(
                        takeUntil(fromEvent(window, 'touchend')),
                        map((e) => (e as TouchEvent).touches[0].clientY),
                        map((clientY) => {
                            return Math.max(0, Math.ceil(clientY - clientYOrigin));
                        })
                    );
                }),
                tap((moveOffset) => {
                    this.touchOffset.set(moveOffset);
                }),
                switchMap((moveOffset) =>
                    fromEvent(window, 'touchend').pipe(
                        take(1),
                        map(() => moveOffset)
                    )
                )
            )
            .subscribe((moveOffset) => {
                if (moveOffset > 100) {
                    this.onCloseHandler();
                }
                this.touchOffset.set(0);
                this.isTouch.set(false);
            });
    }
}
