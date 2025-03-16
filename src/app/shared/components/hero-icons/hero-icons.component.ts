import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { HeroIcons } from './mapper';
import { NgStyle } from '@angular/common';

export type THeroIcons = keyof typeof HeroIcons;

@Component({
    selector: 'hero-icons',
    imports: [NgStyle],
    template: `<span
    #icon
    class="hero-icon"
    [ngStyle]="{ '--hero-icon-size': size + 'px' }"
  ></span>`,
    styleUrls: ['./hero-icons.component.css']
})
export class HeroIconsComponent {
  protected _icon: any = null;

  @Input() icon: any = null;
  @Input() size: 48 | 32 | 24 | 20 | 16 | 14 | 12 = 24;

  @ViewChild('icon') iconRef: ElementRef<HTMLSpanElement> | undefined;

  ngAfterViewInit(): void {
    (this.iconRef?.nativeElement as HTMLElement).innerHTML =
      HeroIcons[this.icon];
  }
}
