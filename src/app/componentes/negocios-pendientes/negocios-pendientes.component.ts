import { Component } from '@angular/core';
import { DetalleNegocioDTO } from '../../dto/detalle-negocio-dto';
import { NegociosService } from '../../Servicios/negocios.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../../Servicios/token.service';

@Component({
  selector: 'app-negocios-pendientes',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './negocios-pendientes.component.html',
  styleUrls: ['./negocios-pendientes.component.css']
})
export class NegociosPendientesComponent {

  negociosPendientes: DetalleNegocioDTO[] = [];
  seleccionados: DetalleNegocioDTO[] = [];
  textoBtnEliminar: string = '';

  constructor(private negocioService: NegociosService, private tokenService: TokenService) {
    this.negociosPendientes = [];  
    this.listarNegociosPendientes();
  }

  public seleccionar(negocio: DetalleNegocioDTO, estado: boolean) {
    if (estado) {
      this.seleccionados.push(negocio);
    } else {
      const index = this.seleccionados.indexOf(negocio);
      if (index !== -1) {
        this.seleccionados.splice(index, 1);
      }
    }
    this.actualizarMensaje();
  }

  private actualizarMensaje() {
    const tam = this.seleccionados.length;
    if (tam !== 0) {
      this.textoBtnEliminar = tam === 1 ? "1 elemento" : `${tam} elementos`;
    } else {
      this.textoBtnEliminar = "";
    }
  }

  public borrarNegocios() {
    this.seleccionados.forEach(n => {
      this.negocioService.eliminar(n.id).subscribe(() => {
        this.negociosPendientes = this.negociosPendientes.filter(negocio => negocio.id !== n.id);
      });
    });
    this.seleccionados = [];
    this.actualizarMensaje();
  }

  public listarNegociosPendientes() {
     this.negocioService.listarNegociosPendientes().subscribe({
      next: (data) => {
        this.negociosPendientes = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}

