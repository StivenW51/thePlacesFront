import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NegociosService } from '../../Servicios/negocios.service';
import { MapaService } from '../../Servicios/mapa.service';
import { ItemNegocioDTO } from '../../dto/item-negocio-dto';
@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [],
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css'
})
export class BusquedaComponent implements OnInit {
  textoBusqueda: string;
  resultados: ItemNegocioDTO[];
  mapaService: any;

  constructor(private route: ActivatedRoute, private negociosService: NegociosService, private mapaServices: MapaService) {
    this.resultados = [];
    this.textoBusqueda = "";
    this.route.params.subscribe(params => {
      this.textoBusqueda = params['texto'];
      //this.resultados = this.negociosService.buscar(this.textoBusqueda);

    });
  }
  ngOnInit(): void {
    this.mapaService.crearMapa();
    this.mapaService.pintarMarcadores(this.resultados);
  }
}

