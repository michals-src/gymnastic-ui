import { Component } from '@angular/core';
import { HomeDatePickerComponent } from './components/home-datepicker/home-datepicker.component';
import { HomeWorkoutsListComponent } from './components/home-workouts-list/home-workouts-list.component';

@Component({
    selector: 'app-home-view',
    templateUrl: './home-view.component.html',
    styleUrl: './home-view.component.scss',
    imports: [HomeDatePickerComponent, HomeWorkoutsListComponent],
})
export class HomeViewComponent {}
