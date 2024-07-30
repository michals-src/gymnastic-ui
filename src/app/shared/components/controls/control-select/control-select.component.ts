import {
    ChangeDetectionStrategy,
    Component,
    ComponentRef,
    forwardRef,
    Input,
    Self,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { HeroIconsComponent } from '../../hero-icons/hero-icons.component';
import { ControlValueAccessor } from '@angular/forms';
import { WritableSignal } from '@angular/core';
import { signal } from '@angular/core';
import { Optional } from '@angular/core';
import { NgModel } from '@angular/forms';
import { BottomSheetComponent } from '../../bottom-sheet/bottom-sheet.component';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { NgClass } from '@angular/common';

export interface IControlSelectOption {
    id: string;
    value: string;
}

@Component({
    selector: 'app-control-select',
    standalone: true,
    imports: [HeroIconsComponent, BottomSheetComponent, NgClass],
    templateUrl: './control-select.component.html',
    styleUrl: './control-select.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlSelectComponent implements ControlValueAccessor {
    @Input() label: string = null;
    @Input() options: IControlSelectOption[] = [];
    @Input() set disabled(value: boolean) {
        if (!this?.ngModel?.disabled) this._disabled.set(value);
    }

    protected _value: WritableSignal<IControlSelectOption> = signal(null);
    protected _disabled: WritableSignal<boolean> = signal(null);
    protected _isOpen: WritableSignal<boolean> = signal(false);

    protected onChange = (value: any) => {};
    protected onTouched = () => {};

    private overlayRef: OverlayRef;

    @ViewChild('optionsTpl') protected optionsTpl: TemplateRef<any>;
    @ViewChild('optionsSheet') protected optionsSheet: BottomSheetComponent;

    constructor(@Self() @Optional() private ngModel: NgModel, protected overlay: Overlay, protected viewContainerRef: ViewContainerRef) {
        if (this.ngModel) {
            this.ngModel.valueAccessor = this;
        }
    }

    writeValue(value: IControlSelectOption): void {
        this._value.set(value);
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
        this.overlayRef.attach(new TemplatePortal(this.optionsTpl, this.viewContainerRef));
    }

    protected onOptionsCloseHandler(): void {
        this.overlayRef.dispose();
    }

    protected onOptionClickHandler(option: IControlSelectOption) {
        this.writeValue(option);
        this.optionsSheet.onCloseHandler();
    }

    protected setIsOpen(value: boolean): void {
        this._isOpen.set(value);
    }
}
