import { Routes } from '@angular/router';
import { HeaderComponent } from './componentes/header/header.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { CategoriasComponent } from './componentes/categorias/categorias.component';
import { LoginComponent } from './componentes/login/login.component';
import { NegociosPendientesComponent } from './componentes/negocios-pendientes/negocios-pendientes.component';
import { RegistroClienteComponent } from './componentes/registro-cliente/registro-cliente.component';
import { GestionNegociosComponent } from './componentes/gestion-negocios/gestion-negocios.component';
import { FavoritosComponent } from './componentes/favoritos/favoritos.component';
import { CrearNegocioComponent } from './componentes/crear-negocio/crear-negocio.component';
import { DetalleNegocioComponent } from './componentes/detalle-negocio/detalle-negocio.component';

export const routes: Routes = [
{ path: 'header', component: HeaderComponent},
{ path: 'inicio', component: InicioComponent },
{ path: 'categorias', component: CategoriasComponent },
{ path: 'login', component: LoginComponent },
{ path: 'registro-cliente', component: RegistroClienteComponent },
{ path: 'negocios-pendientes', component: NegociosPendientesComponent },
{ path: 'gestion-negocios', component: GestionNegociosComponent},
{ path: 'favoritos', component: FavoritosComponent},
{ path: 'crear-negocio', component: CrearNegocioComponent},
{ path: 'detalle-negocio/:codigo', component: DetalleNegocioComponent},
{ path: "**", pathMatch: "full", redirectTo: "" }
];