import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleNegocioDTO } from '../../dto/detalle-negocio-dto';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent {
  
  // negocios = [
  //   {
  //     id: '1',
  //     nombreNegocio: 'Tienda 1',
  //     imagenes: 'imagen1.png',
  //     categoria: 'Tienda',
  //     ubicacion: { longitud: -75.5636, latitud: 6.2442 },
  //     direccion: 'Calle 1',
  //     telefonos: '227262726',
  //     calificacion: 4,
  //     descripcion: 'Descripción de Tienda 1',
  //     horarios: [],
  //     estadoNegocio: 'Abierto'
  //   },
  //   {
  //     id: '2',
  //     nombreNegocio: 'Restaurante 1',
  //     imagenes: 'imagen2.png',
  //     categoria: 'Restaurante',
  //     ubicacion: { longitud: -75.5636, latitud: 6.2442 },
  //     direccion: 'Calle 2',
  //     telefonos: '227262727',
  //     calificacion: 5,
  //     descripcion: 'Descripción de Restaurante 1',
  //     horarios: [],
  //     estadoNegocio: 'Abierto'
  //   },
  //   {
  //     id: '3',
  //     nombreNegocio: 'Café 1',
  //     imagenes: 'imagen3.png',
  //     categoria: 'Café',
  //     ubicacion: { longitud: -75.5636, latitud: 6.2442 },
  //     direccion: 'Calle 3',
  //     telefonos: '227262728',
  //     calificacion: 4,
  //     descripcion: 'Descripción de Café 1',
  //     horarios: [],
  //     estadoNegocio: 'Abierto'
  //   },
  //   {
  //     id: '4',
  //     nombreNegocio: 'Gimnasio 1',
  //     imagenes: 'imagen4.png',
  //     categoria: 'Gimnasio',
  //     ubicacion: { longitud: -75.5636, latitud: 6.2442 },
  //     direccion: 'Calle 4',
  //     telefonos: '227262729',
  //     calificacion: 3,
  //     descripcion: 'Descripción de Gimnasio 1',
  //     horarios: [],
  //     estadoNegocio: 'Abierto'
  //   }
  // ];

  categorias: string[]; 
  negocios: DetalleNegocioDTO[];
  negociosFiltrados = this.negocios.filter(negocio => negocio.categoria === this.categorias[0]);
  
  constructor() {

    this.categorias = ['PANADERIA', 'TIENDA', 'BIBLIOTECA', 'SUPERMERCADO', 'CAFETERIA', 'BAR', 'RESTAURANTE'];
    this.negocios = [];
    
    
  }


  seleccionarCategoria(categoria: string) {
    this.negociosFiltrados = this.negocios.filter(negocio => negocio.categoria === categoria);
  }
}

