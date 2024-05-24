import { Component, OnInit } from '@angular/core';
import { ItemNegocioDTO } from '../../dto/item-negocio-dto';
import { ActivatedRoute } from '@angular/router';
import { NegociosService } from '../../Servicios/negocios.service';
import { CommonModule } from '@angular/common';
import { __param } from 'tslib';
import mapboxgl from 'mapbox-gl';
import { DetalleNegocioDTO } from '../../dto/detalle-negocio-dto';

@Component({
  selector: 'app-detalle-negocio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-negocio.component.html',
  styleUrl: './detalle-negocio.component.css'
})
export class DetalleNegocioComponent  {

  codigoNegocio: string = '';
  negocio: DetalleNegocioDTO

  constructor(private route: ActivatedRoute, private negocioService: NegociosService) {
    this.route.params.subscribe((params) => {
      this.codigoNegocio = params['codigo'];
    });

    this.negocio = new DetalleNegocioDTO();
    this.obtenerNegocio(this.codigoNegocio);
    
  }

  public obtenerNegocio(codigoNegocio: string) {
    this.negocioService.obtenerNegocio(codigoNegocio).subscribe({
      next: (data) => {
        this.negocio = data.respuesta;
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


  ngOnInit(): void {
    this.initializeMap();
  }

  initializeMap() {
    // Asegúrate de que el token de Mapbox esté configurado en otro lugar
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiZGplZG1lMjIiLCJhIjoiY2x3aWQ1cG5kMGpidzJxbXFiY2N6OGNycCJ9.RqPikbNB5qCiZV-semNdjw';
    const mapa = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.negocio.ubicacion.longitud, this.negocio.ubicacion.latitud], // Coordenadas: Longitud, Latitud
      zoom: 15
    });

    new mapboxgl.Marker()
      .setLngLat([this.negocio.ubicacion.longitud, this.negocio.ubicacion.latitud]) // Coordenadas: Longitud, Latitud
      //.setLngLat([])
      .addTo(mapa);
  }




}


  


