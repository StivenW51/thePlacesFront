import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './componentes/header/header.component';
import { InicioComponent } from "./componentes/inicio/inicio.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterModule, HeaderComponent, InicioComponent]
})
export class AppComponent {
  title = 'thePlaces';
}
