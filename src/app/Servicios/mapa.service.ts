import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import mapboxgl from 'mapbox-gl';
import { ItemNegocioDTO } from '../dto/item-negocio-dto';
@Injectable({
  providedIn: 'root'
})
export class MapaService {
  mapa: any;
  marcadores: any[];
  constructor() {
    this.marcadores = [];
  }


  public crearMapa() {
    this.mapa = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoiZGplZG1lMjIiLCJhIjoiY2x3aWQ1cG5kMGpidzJxbXFiY2N6OGNycCJ9.RqPikbNB5qCiZV-semNdjw',
      container: 'mapa',
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [-75.6258, 4.4053],
      zoom: 9
    });
    this.mapa.addControl(new mapboxgl.NavigationControl());
    this.mapa.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true
      })
    );
  }


  public agregarMarcador(): Observable<any> {
    const mapaGlobal = this.mapa;
    const marcadores = this.marcadores;
    return new Observable<any>(observer => {
      mapaGlobal.on('click', function (e: any) {
        marcadores.forEach(marcador => marcador.remove());
        const marcador = new mapboxgl.Marker()
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .addTo(mapaGlobal);
        marcadores.push(marcador);
        observer.next(marcador.getLngLat());
      });
    });

  }
  public pintarMarcadores(negocios: ItemNegocioDTO[]) {
    negocios.forEach(negocio => {
      new mapboxgl.Marker()
        .setLngLat([negocio.ubicacion.longitud, negocio.ubicacion.latitud])
       // .setLngLat([-75.5636, 6.2442])
        .setPopup(new mapboxgl.Popup().setHTML(negocio.nombreNegocio))
        .addTo(this.mapa);
    });
  }


  

  /*public pintarMarcadorNegocio(negocio: ItemNegocioDTO) {
    new mapboxgl.Marker()
    //.setLngLat([-75.5636, 6.2442])
      .setLngLat([negocio.ubicacion.longitud, negocio.ubicacion.latitud])
      .setPopup(new mapboxgl.Popup().setHTML(negocio.nombreNegocio))
      .addTo(this.mapa);
  }

  public pintarMarcadorNegocio(negocio: ItemNegocioDTO) {
    new mapboxgl.Marker()
      .setLngLat([-75.5636, 6.2442]) // Coordenadas de prueba
      .setPopup(new mapboxgl.Popup().setHTML(negocio.nombreNegocio))
      .addTo(this.mapa);
}


pintarMarcadorNegocioConCoordenadasPrueba() {
  new mapboxgl.Marker()
    .setLngLat([-75.5636, 6.2442]) // Coordenadas de prueba
    .setPopup(new mapboxgl.Popup().setHTML('Marcador de prueba'))
    .addTo(this.mapa);
}*/


public pintarNegocio(){
  new mapboxgl.Marker()
  .setLngLat([-58.381592, -34.603722]) // Coordenadas: Longitud, Latitud
  .addTo(this.mapa);
}

}
  







