import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { filter, Observable, Subject, take } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class OverlayControllerService {
    protected overlay = inject(Overlay);
    protected _map = new Map<string, OverlayRef>();
    private _close$ = new Subject<string>();

    open<T>(id: string, reference: ComponentPortal<T> | TemplatePortal<T>): T & { close$: Observable<any> } {
        const _overlay = this.overlay.create();
        const _attachment = _overlay.attach(reference);
        this._map.set(id, _overlay);

        return Object.assign(_attachment, {
            close$: this._close$.pipe(
                filter((_id) => _id === id),
                take(1)
            ),
        });
    }

    close(id: string): void {
        if (this._map.has(id)) {
            const _overlayRef = this._map.get(id);
            _overlayRef.dispose();
            this._map.delete(id);
        }
        this._close$.next(id);
    }
}
