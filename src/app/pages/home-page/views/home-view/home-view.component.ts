import { Component } from '@angular/core';
import { HomeViewCalendarReviewComponent } from '../../components/home-view-calendar-review/home-view-calendar-review.component';
import { HeroIconsComponent } from '../../../../shared/components/hero-icons/hero-icons.component';
import { BottomBarComponent } from '../../../../shared/components/bottom-bar/bottom-bar.component';
import { RouterModule } from '@angular/router';
import { WORKOUT_PAGE_ROUTES_ENUM } from '../../../workout-page/workout-page.routes';
import { BottomSheetComponent } from "../../../../shared/components/bottom-sheet/bottom-sheet.component";
import { ControlSelectComponent } from "../../../../shared/components/controls/control-select/control-select.component";

@Component({
    selector: 'app-home-view',
    standalone: true,
    templateUrl: './home-view.component.html',
    styleUrl: './home-view.component.scss',
    imports: [HomeViewCalendarReviewComponent, HeroIconsComponent, BottomBarComponent, RouterModule, BottomSheetComponent, ControlSelectComponent],
})
export class HomeViewComponent {
    protected WORKOUT_PAGE_ROUTES_ENUM = WORKOUT_PAGE_ROUTES_ENUM;
}
