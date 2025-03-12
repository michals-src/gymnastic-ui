import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    Optional,
    Self,
    signal,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    WritableSignal,
} from '@angular/core';
import { ControlValueAccessor, NgModel } from '@angular/forms';
import { BottomSheetComponent } from '../../bottom-sheet/bottom-sheet.component';
import { SharedHeroIconsComponent } from '../../shared-hero-icons/shared-hero-icons.component';

export interface IControlSelectOption {
    id: string;
    value: string;
}

@Component({
    selector: 'app-control-select',
    standalone: true,
    imports: [BottomSheetComponent, NgClass, SharedHeroIconsComponent],
    templateUrl: './control-select.component.html',
    styleUrl: './control-select.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlSelectComponent implements ControlValueAccessor {
    @Input() options: IControlSelectOption[] = [];
    @Input() set disabled(value: boolean) {
        if (!this?.ngModel?.disabled) this._disabled.set(value);
    }

    protected _value: WritableSignal<IControlSelectOption> = signal(null);
    protected _disabled: WritableSignal<boolean> = signal(null);

    protected onChange = (value: any) => {};
    protected onTouched = () => {};

    private overlayRef: OverlayRef;

    @ViewChild('optionsTpl') protected optionsTpl: TemplateRef<any>;
    @ViewChild('optionsSheet') protected optionsSheet: BottomSheetComponent;

    constructor(
        @Self() @Optional() private ngModel: NgModel,
        protected overlay: Overlay,
        protected viewContainerRef: ViewContainerRef
    ) {
        if (this.ngModel) {
            this.ngModel.valueAccessor = this;
        }
    }

    writeValue(value: IControlSelectOption): void {
        this.onChange(value);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this._disabled.set(isDisabled);
    }

    protected onOpenHandler(): void {
        this.overlayRef = this.overlay.create();
        this.overlayRef.attach(
            new TemplatePortal(this.optionsTpl, this.viewContainerRef, {
                options: this.options,
            })
        );
    }

    protected onOptionsCloseHandler(): void {
        this.overlayRef.dispose();
    }

    protected onOptionClickHandler(option: IControlSelectOption) {
        this._value.set(option);
    }

    protected clickCancel(): void {
        this.onOptionsCloseHandler();
    }

    protected clickSave(): void {
        this.writeValue(this._value());
        this.onOptionsCloseHandler();
    }
}
