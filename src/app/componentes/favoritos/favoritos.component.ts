import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DetalleNegocioDTO } from '../../dto/detalle-negocio-dto';
import { NegociosService } from '../../Servicios/negocios.service';
import { TokenService } from '../../Servicios/token.service';
import { ClienteService } from '../../Servicios/cliente.service';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent {

  negocios: DetalleNegocioDTO[];
  idCliente: string;

  constructor(private negocioService: NegociosService, private tokenService: TokenService,
              private clienteService: ClienteService ) {
    this.idCliente = '';
    this.negocios = [];
    this.listarNegociosFavoritos();
  }

  public listarNegociosFavoritos() {
    this.clienteService.listarNegociosFavoritos().subscribe({
      next: (data) => {
        this.negocios = data.respuesta;
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }




}
