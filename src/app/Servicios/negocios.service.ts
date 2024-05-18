import { Injectable } from '@angular/core';
import { ItemNegocioDTO } from '../dto/item-negocio-dto';
import { RegistroNegocioDTO } from '../dto/registro-negocio-dto';
import { UbicacionNegocioDTO } from '../dto/ubicacion-negocio-dto';
import { HorarioNegocioDTO } from '../dto/horario-negocio-dto';
import { Horario } from '../entidades/horario';

@Injectable({
  providedIn: 'root'
})
export class NegociosService {

  negocios: ItemNegocioDTO[];

  constructor() {

    this.negocios = [];
    
    this.negocios.push(new ItemNegocioDTO('1', 'Bar Armenia nombre', 'https://picsum.photos/100', 'BAR', new UbicacionNegocioDTO(4.531456060381842, -75.68035469963664), 'direccion Belencito', '3216739024', 4.5, 'Negocio dedicado a servir Guaro', [new Horario('14','9:00','17:00')], 'APROBADO'));

    //this.negocios.push(new ItemNegocioDTO('2', 'Restaurante La Casona', 'https://picsum.photos/100', 'RESTAURANTE', new UbicacionComponent(4.551298538672697, -75.65858458442557), 4.0, 'APROBADO'));

    //this.negocios.push(new ItemNegocioDTO('3', 'Peluquería La 33', 'https://picsum.photos/100', 'PELUQUERIA', new UbicacionComponent(4.541984423452234, -75.68579829641877), 4.0, 'RECHAZADO'));

    //this.negocios.push(new ItemNegocioDTO('4', 'Veterinaria Los Amigos', 'https://picsum.photos/100', 'VETERINARIA', new UbicacionComponent(4.539872786267409, -75.65011488244343), 4.0, 'APROBADO'));

  }

  public listar(): ItemNegocioDTO[] {
    return this.negocios;
  }

  public obtener(codigo: string): ItemNegocioDTO | undefined {
    return this.negocios.find(negocios => negocios.id == codigo);
  }

  public crear(negocioNuevo: RegistroNegocioDTO) {
    const codigo = (this.negocios.length + 1).toString();
    this.negocios.push(new ItemNegocioDTO(codigo, negocioNuevo.nombreNegocio, negocioNuevo.imagenes[0], negocioNuevo.tipoNegocio, negocioNuevo.ubicacion, negocioNuevo. 'PENDIENTE'));
  }

  public eliminar(codigo: string) {
    this.negocios = this.negocios.filter(n => n.id !== codigo);
  }

}