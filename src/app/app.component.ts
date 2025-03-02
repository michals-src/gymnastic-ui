import { Component, createComponent, EnvironmentInjector } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestComponent } from '@app/test.component';
import { ExercisesService } from './shared/services/exercises.service';

@Component({
    selector: 'app-root',
    standalone: true,
    template: `<router-outlet />`,
    styleUrl: './app.component.scss',
    imports: [RouterOutlet],
})
export class AppComponent {
    title = 'gymnastic';

    constructor(
        protected exercisesService: ExercisesService,
        private readonly envInjector: EnvironmentInjector
    ) {
        this.exercisesService.getExercises();
    }

    ngAfterViewInit(): void {
        const _component = createComponent(TestComponent, { environmentInjector: this.envInjector });
        _component.setInput('dane', 'sgfsdfgwer');
        _component.hostView.detectChanges();
        console.log(_component.location);

        const _iframe = document.createElement('iframe');
        _iframe.style.display = 'none';
        const _x = document.body.appendChild(_iframe);
        // _iframe.contentWindow.document.body.appendChild(_component.instance.elementRef.nativeElement);

        // console.log(_x.contentWindow.document.body.appendChild(_component.instance.elementRef.nativeElement));
        // _x.contentWindow.print();
        _component.destroy();
    }
}
