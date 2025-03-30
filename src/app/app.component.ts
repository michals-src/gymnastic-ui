import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    template: `<router-outlet />`,
    styleUrl: './app.component.scss',
    imports: [RouterOutlet],
})
export class AppComponent {
    title = 'Gymnastic';
}
