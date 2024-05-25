import { Component } from '@angular/core';
import { DetalleNegocioDTO } from '../../dto/detalle-negocio-dto';
import { NegociosService } from '../../Servicios/negocios.service';
import { TokenService } from '../../Servicios/token.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-negocios-rechazados',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './negocios-rechazados.component.html',
  styleUrl: './negocios-rechazados.component.css'
})
export class NegociosRechazadosComponent {

  negocios: DetalleNegocioDTO[];
  textoBtnEliminar: string = '';

  constructor(private negocioService: NegociosService, private tokenService: TokenService) { 
    this.negocios = [];
    this.listarNegociosRechazados();
  }

   
  public listarNegociosRechazados() {
     this.negocioService.listarNegociosPorEstadoRegistro("RECHAZADO").subscribe({
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
