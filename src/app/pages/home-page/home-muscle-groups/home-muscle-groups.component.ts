import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeMuscleGroupsSearchComponent } from './components/home-muscle-groups-search/home-muscle-groups-search.component';
import { HomeMuscleGroupsListHeaderComponent } from './components/home-muscle-groups-list-header/home-muscle-groups-list-header.component';
import { HomeMuscleGroupsListComponent } from './components/home-muscle-groups-list/home-muscle-groups-list.component';

@Component({
    selector: 'app-home-muscle-groups',
    template: `
        <section>
            <app-home-muscle-groups-search class="block px-8 py-8" />
        </section>
        <section>
            <header>
                <app-home-muscle-groups-list-header class="block px-14 my-4" />
            </header>
            <app-home-muscle-groups-list class="block px-8" />
            <div></div>
        </section>
    `,
    styleUrls: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [HomeMuscleGroupsSearchComponent, HomeMuscleGroupsListHeaderComponent, HomeMuscleGroupsListComponent],
})
export class HomeMuscleGroupsComponent {}
