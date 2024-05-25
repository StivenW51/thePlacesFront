import { Component, OnInit } from '@angular/core';
import { MapaService } from '../../Servicios/mapa.service';
import { NegociosService } from '../../Servicios/negocios.service';
import { DetalleNegocioDTO } from '../../dto/detalle-negocio-dto';
import { Ubicacion } from '../../entidades/ubicacion';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

  negocios: DetalleNegocioDTO[];
 

  constructor(private mapaService: MapaService, 
              private negocioService: NegociosService) { 

      this.negocios = [];      
  }
  
  ngOnInit(): void {
    this.listarNegociosActivos();
    this.mapaService.obtenerNegocios(this.negocios);
    this.mapaService.crearMapa();
  }

  private mostrarNegociosMapa(){
    this.mapaService.pintarMarcadores();
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

