
import { Component } from '@angular/core';
import { DetalleNegocioDTO } from '../../dto/detalle-negocio-dto';
import { NegociosService } from '../../Servicios/negocios.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../../Servicios/token.service';

@Component({
  selector: 'app-gestion-negocios',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './gestion-negocios.component.html',
  styleUrls: ['./gestion-negocios.component.css']
})
export class GestionNegociosComponent {

  negocios: DetalleNegocioDTO[] = [];
  seleccionados: DetalleNegocioDTO[] = [];
  textoBtnEliminar: string = '';
  idCliente: string = '';

  constructor(private negocioService: NegociosService, private tokenService: TokenService) {
    this.idCliente = '';
    this.listarNegocios();
    //this.listarNegociosActivos();
  }

  public seleccionar(producto: DetalleNegocioDTO, estado: boolean) {
    if (estado) {
      this.seleccionados.push(producto);
    } else {
      const index = this.seleccionados.indexOf(producto);
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
        this.negocios = this.negocios.filter(negocio => negocio.id !== n.id);
      });
    });
    this.seleccionados = [];
    this.actualizarMensaje();
  }


  public listarNegocios() {
    const values = this.tokenService.decodePayload(this.tokenService.getToken());
    this.idCliente = values.id; // saca el id del cliente

    this.negocioService.listarNegociosPropietario(this.idCliente).subscribe({
      next: (data) => {
        this.negocios = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  public listarNegociosActivos() {
    this.negocioService.listarNegociosActivos().subscribe({
      next: (data) => {
        this.negocios = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}

