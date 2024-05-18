import { Component } from '@angular/core';
import { ItemNegocioDTO } from '../../dto/item-negocio-dto';
import { NegociosService } from '../../Servicios/negocios.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-negocios',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './gestion-negocios.component.html',
  styleUrl: './gestion-negocios.component.css'
})
export class GestionNegociosComponent {

  negocios: ItemNegocioDTO[];
  seleccionados: ItemNegocioDTO[];
  textoBtnEliminar: string = '';

  constructor(private negocioService: NegociosService) {
    this.negocios = [];
    this.listarNegocios();
    this.seleccionados = [];
    this.textoBtnEliminar = '';

  }

  public seleccionar(producto: ItemNegocioDTO, estado: boolean) {
    if (estado) {
      this.seleccionados.push(producto);
    } else {
      this.seleccionados.splice(this.seleccionados.indexOf(producto), 1);
    }
    this.actualizarMensaje();
  }

  private actualizarMensaje() {
    const tam = this.seleccionados.length;
    if (tam != 0) {
      if (tam == 1) {
        this.textoBtnEliminar = "1 elemento";
      } else {
        this.textoBtnEliminar = tam + " elementos";
      }
    } else {
      this.textoBtnEliminar = "";
    }
  }

  public borrarNegocios() {
    this.seleccionados.forEach(n => {
    this.negocioService.eliminar(n.id);
    this.negocios = this.negocios.filter(negocio => negocio.id !== n.id);
    });
    this.seleccionados = [];
    this.actualizarMensaje();
    }

  public listarNegocios() {
    this.negocios = this.negocioService.listar();
  }

}
