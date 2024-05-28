import { Component, OnInit } from '@angular/core';
import { ItemNegocioDTO } from '../../dto/item-negocio-dto';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NegociosService } from '../../Servicios/negocios.service';
import { CommonModule } from '@angular/common';
import { __param } from 'tslib';
import mapboxgl from 'mapbox-gl';
import { DetalleNegocioDTO } from '../../dto/detalle-negocio-dto';
import { TokenService } from '../../Servicios/token.service';
import { RevisaNegocioDTO } from '../../dto/revisa-negocio-dto';
import { FormsModule } from '@angular/forms';
import { MapaService } from '../../Servicios/mapa.service';

@Component({
  selector: 'app-detalle-negocio',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './detalle-negocio.component.html',
  styleUrl: './detalle-negocio.component.css'
})
export class DetalleNegocioComponent implements OnInit {


  codigoNegocio: string = '';
  observacion: string;
  negocio: DetalleNegocioDTO
  revisaNegocioDTO: RevisaNegocioDTO;
  map: any;
  longitud: number = 0;
  latitud: number = 0;

  constructor(private route: ActivatedRoute, private mapaService: MapaService, private negocioService: NegociosService, private tokenService: TokenService) {
    this.route.params.subscribe((params) => {
      this.codigoNegocio = params['codigo'];
    });

    this.revisaNegocioDTO = new RevisaNegocioDTO();
    this.negocio = new DetalleNegocioDTO();
    this.observacion = '';
    this.obtenerNegocio(this.codigoNegocio);
  }

   obtenerNegocio(codigoNegocio: string){
    this.negocioService.obtenerNegocio(codigoNegocio).subscribe({
      next: (data) => {
        this.negocio = data.respuesta;
      },
      error: (error) => {
        console.error(error);
        return null;
      }
    });
  }


  public aprobarNegocio() {
    this.revisaNegocioDTO.estadoRegistro = 'APROBADO'
    this.revisaNegocioDTO.idNegocio = this.negocio.id;

    this.negocioService.revisarNegocio(this.revisaNegocioDTO).subscribe({
      next: data => {
        console.log(data.respuesta)
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  public rechazarNegocio() {
    this.revisaNegocioDTO.estadoRegistro = 'RECHAZADO'
    this.revisaNegocioDTO.idNegocio = this.negocio.id;

    this.negocioService.revisarNegocio(this.revisaNegocioDTO).subscribe({
      next: data => {
        console.log(data.respuesta)
      },
      error: (error) => {
        console.error(error);
      }
    });
  }




  /*
    ngOnInit(): void {
      // Llamar al método pintarNegocio
      //this.mapaService.pintarNegocio();
      this.mapaService.pintarNegocio();
    }*/

/*
  ngOnInit(): void {
    this.initializeMap();
  }

  initializeMap() {
    // Asegúrate de que el token de Mapbox esté configurado en otro lugar
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiZGplZG1lMjIiLCJhIjoiY2x3aWQ1cG5kMGpidzJxbXFiY2N6OGNycCJ9.RqPikbNB5qCiZV-semNdjw';
    this.mapa = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      //center: [this.negocio.ubicacion.longitud, this.negocio.ubicacion.latitud], // Coordenadas: Longitud, Latitud
      zoom: 15
    });

    new mapboxgl.Marker()
      .setLngLat([this.negocio.ubicacion.longitud, this.negocio.ubicacion.latitud]) // Coordenadas: Longitud, Latitud
      //.setLngLat([])
      .addTo(this.mapa);

      console.log("mapa");
  }
*/

  getRole(): string {
    return this.tokenService.getRole(); // Asumiendo que getRole devuelve un string representando el rol del usuario
  }


  public pintarMarcadoresNegocio() {
    new mapboxgl.Marker()
        .setLngLat([4.558699, -75.65548])
        .setPopup(new mapboxgl.Popup().setHTML(this.negocio.nombreNegocio))
        .addTo(this.map);
        //console.log([this.negocio.ubicacion])
  }


  ngOnInit() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGplZG1lMjIiLCJhIjoiY2x3aWQ1cG5kMGpidzJxbXFiY2N6OGNycCJ9.RqPikbNB5qCiZV-semNdjw';
    this.initializeMap();
  }

  initializeMap() {

    this.route.params.subscribe((params) => {
      this.codigoNegocio = params['codigo'];
      this.latitud = params['latitud'];
      this.longitud = params['longitud'];
    });
    
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.longitud, this.latitud],
      zoom: 15
    });

    // Add markers to the map
    new mapboxgl.Marker()
      .setLngLat([this.longitud, this.latitud])
      .addTo(this.map);
      
  }

}





