import { Component } from '@angular/core';
import { DetalleNegocioDTO } from '../../dto/detalle-negocio-dto';
import { NegociosService } from '../../Servicios/negocios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-negocios-aprobados',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './negocios-aprobados.component.html',
  styleUrl: './negocios-aprobados.component.css'
})
export class NegociosAprobadosComponent {

  negocios: DetalleNegocioDTO[];
  textoBtnEliminar: string = '';

  constructor(private negocioService: NegociosService) { 
    this.negocios = [];
    this.listarNegociosRechazados();
  }

   
  public listarNegociosRechazados() {
     this.negocioService.listarNegociosPorEstadoRegistro("APROBADO").subscribe({
      next: (data) => {
        console.log(data)
        this.negocios = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
