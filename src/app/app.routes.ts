import { Routes } from '@angular/router';
import { HeaderComponent } from './componentes/header/header.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { CategoriasComponent } from './componentes/categorias/categorias.component';
import { LoginComponent } from './componentes/login/login.component';
import { NegociosPendientesComponent } from './componentes/negocios-pendientes/negocios-pendientes.component';
import { NegociosAprobadosComponent } from './componentes/negocios-aprobados/negocios-aprobados.component';
import { NegociosRechazadosComponent } from './componentes/negocios-rechazados/negocios-rechazados.component';
import { RegistroClienteComponent } from "./componentes/registro-cliente/RegistroClienteComponent";
import { GestionNegociosComponent } from './componentes/gestion-negocios/gestion-negocios.component';
import { FavoritosComponent } from './componentes/favoritos/favoritos.component';
import { CrearNegocioComponent } from './componentes/crear-negocio/crear-negocio.component';
import { DetalleNegocioComponent } from './componentes/detalle-negocio/detalle-negocio.component';
import { EditarNegocioComponent } from './componentes/editar-negocio/editar-negocio.component';
import { RecuperarComponent } from './componentes/recuperar/recuperar.component';
import { LoginGuard } from './guards/permiso.service';
import { RolesGuard } from './guards/roles.service';
import { RecuperarPasswordComponent } from './componentes/recuperar-password/recuperar-password.component';
//import { from } from 'rxjs';

export const routes: Routes = [
{ path: '', component: InicioComponent},
{ path: 'header', component: HeaderComponent},
{ path: 'inicio', component: InicioComponent },
{ path: 'categorias', component: CategoriasComponent },
{ path: 'login', component: LoginComponent },
{ path: 'registro-cliente', component: RegistroClienteComponent },
{ path: 'recuperar', component: RecuperarComponent },
{ path: 'recuperar-password/:token', component: RecuperarPasswordComponent  },
{ path: 'negocios-pendientes', component: NegociosPendientesComponent, canActivate: [RolesGuard], data: { expectedRole: ["MODERADOR"] } },
{ path: 'negocios-aprobados', component: NegociosAprobadosComponent, canActivate: [RolesGuard], data: { expectedRole: ["MODERADOR"] } },
{ path: 'negocios-rechazados', component: NegociosRechazadosComponent, canActivate: [RolesGuard], data: { expectedRole: ["MODERADOR"] } },
{ path: 'gestion-negocios', component: GestionNegociosComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] }},
{ path: 'favoritos', component: FavoritosComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] }},
{ path: 'crear-negocio', component: CrearNegocioComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] }},
{ path: 'detalle-negocio/:codigo/:latitud/:longitud', component: DetalleNegocioComponent},
{ path: 'editar-negocio/:codigo', component: EditarNegocioComponent},
{ path: "**", pathMatch: "full", redirectTo: "" },
{ path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
{ path: 'registro', component: RegistroClienteComponent, canActivate: [LoginGuard] },

{ path: "gestion-negocios", component: GestionNegociosComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] } },
{ path: "crear-negocio", component: CrearNegocioComponent, canActivate: [RolesGuard], data: {expectedRole: ["CLIENTE"] } },
{ path: "gestio-negocios-admin", component: GestionNegociosComponent, canActivate:[RolesGuard], data: { expectedRole: ["MODERADOR"] } }
];