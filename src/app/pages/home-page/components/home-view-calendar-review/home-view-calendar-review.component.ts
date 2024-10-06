import { Component, inject, signal, WritableSignal } from '@angular/core';
import { HeroIconsComponent } from '../../../../shared/components/hero-icons/hero-icons.component';
import { WORKOUT_PAGE_ROUTES_ENUM } from '../../../workout-page/workout-page.routes';
import { RouterModule } from '@angular/router';
import { IWorkout } from '../../../../shared/interfaces/i-workout';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { ApiService } from '@app/shared/services/api.service';

@Component({
    selector: 'app-home-view-calendar-review',
    standalone: true,
    templateUrl: './home-view-calendar-review.component.html',
    styleUrl: './home-view-calendar-review.component.scss',
    imports: [HeroIconsComponent, RouterModule, DatePipe, UpperCasePipe],
})
export class HomeViewCalendarReviewComponent {
    private apiService = inject(ApiService);
    protected WORKOUT_PAGE_ROUTES_ENUM = WORKOUT_PAGE_ROUTES_ENUM;

    protected workoutsCalendar: WritableSignal<any> = signal(null);

    ngOnInit(): void {
        const currentMonth = new Date().getMonth() + 1;

        const startMonth = currentMonth - 2;
        const endMonth = currentMonth;

        this.apiService.get<IWorkout[]>(`/workouts/${startMonth}/${endMonth}`).subscribe((data) => {
            if (data) {
                console.log(data);
                const _data = Object.entries(
                    data.reduce((_obj, _el) => {
                        const month = new Date(_el.createdAt).getMonth() + 1;

                        if (!_obj.hasOwnProperty(month)) {
                            _obj[month] = [];
                        }
                        _obj[month].push(_el);
                        return _obj;
                    }, {})
                ).map(([month, workouts]: any) => ({
                    date: this.getDate(month - 1),
                    workouts,
                }));
                console.log(_data);
                this.workoutsCalendar.set(_data.reverse());
            }
        });
    }

    private getDate(month: number): string {
        const _setMonth = new Date().setMonth(month);
        const _setDay = new Date(_setMonth).setDate(1);
        return new Date(_setDay).toISOString();
    }
}
