import { Component, inject, signal, WritableSignal } from '@angular/core';
import { HeroIconsComponent } from '../../../../shared/components/hero-icons/hero-icons.component';
import { WORKOUT_PAGE_ROUTES_ENUM } from '../../../workout-page/workout-page.routes';
import { RouterModule } from '@angular/router';
import { IWorkoutCalendar } from '../../../../shared/interfaces/i-workout';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { ApiService } from '@app/shared/services/api.service';
import { CapitalizePipe } from '@app/shared/pipes/capitalize.pipe';
import { getISOWithOffset } from '@app/shared/functions/get-iso-with-offset';

@Component({
    selector: 'app-home-view-calendar-review',
    standalone: true,
    templateUrl: './home-view-calendar-review.component.html',
    styleUrl: './home-view-calendar-review.component.scss',
    imports: [CapitalizePipe, HeroIconsComponent, RouterModule, DatePipe, UpperCasePipe],
})
export class HomeViewCalendarReviewComponent {
    private apiService = inject(ApiService);
    protected WORKOUT_PAGE_ROUTES_ENUM = WORKOUT_PAGE_ROUTES_ENUM;

    protected workoutsCalendar: WritableSignal<IWorkoutCalendar[]> = signal(null);

    ngOnInit(): void {
        const currentDate = new Date();
        const monthOffset = 8;

        const startYear =
            currentDate.getMonth() - monthOffset < 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();
        const startMonth = Math.abs(currentDate.getDate() - monthOffset);

        const startDate = getISOWithOffset(new Date(startYear, startMonth, 1));
        const endDate = getISOWithOffset(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0));

        const params = new URLSearchParams({
            from: startDate,
            to: endDate,
        });
        this.apiService.get<IWorkoutCalendar[]>(`/workouts?${params}`).subscribe((data) => {
            this.workoutsCalendar.set(data);
        });
    }

    private getDate(month: number): string {
        const _setMonth = new Date().setMonth(month);
        const _setDay = new Date(_setMonth).setDate(1);
        return new Date(_setDay).toISOString();
    }
}
