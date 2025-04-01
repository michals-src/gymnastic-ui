import { Routes } from '@angular/router';
import { HomeMuscleGroupDetailsComponent } from './home-muscle-group-details/home-muscle-group-details.component';
import { HomeMuscleGroupsComponent } from './home-muscle-groups/home-muscle-groups.component';
import { HomePageComponent } from './home-page.component';
import { HomeViewComponent } from './home-view/home-view.component';

export const HOME_PAGE_ROUTES: Routes = [
    {
        path: '',
        component: HomePageComponent,
        children: [
            {
                path: '',
                component: HomeViewComponent,
                pathMatch: 'full',
            },
            {
                path: 'atlas',
                component: HomeMuscleGroupsComponent,
            },
            {
                path: 'atlas/:id',
                component: HomeMuscleGroupDetailsComponent,
            },
        ],
    },
];
