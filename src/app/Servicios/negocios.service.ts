import { Injectable } from '@angular/core';
import { ItemNegocioDTO } from '../dto/item-negocio-dto';
import { RegistroNegocioDTO } from '../dto/registro-negocio-dto';
import { UbicacionNegocioDTO } from '../dto/ubicacion-negocio-dto';
import { HorarioNegocioDTO } from '../dto/horario-negocio-dto';
import { Horario } from '../entidades/horario';
import { DetalleNegocioDTO } from '../dto/detalle-negocio-dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MensajeDTO } from '../dto/mensaje-dto';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class NegociosService {
  private authURL = 'http://localhost:8082/api/negocio';
  private idCliente: string = '';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  public listarNegociosCliente(): Observable<DetalleNegocioDTO[]> {
    const myToken = this.tokenService.getToken()
    const values = this.tokenService.decodePayload(myToken);
    this.idCliente = values['id']; // saca el id del cliente

    return this.http.get<MensajeDTO>(`${this.authURL}/listarNegociosCliente/${this.idCliente}`).pipe(
      map(mensaje => mensaje.respuesta) // Ajusta esto según la estructura de MensajeDTO
    );
  }

  public obtener(codigo: string): Observable<DetalleNegocioDTO | undefined> {
    return this.listarNegociosCliente().pipe(
      map(negocios => negocios.find(negocio => negocio.id === codigo))
    );
  }

  public eliminar(codigo: string): Observable<DetalleNegocioDTO[]> {
    return this.listarNegociosCliente().pipe(
      map(negocios => negocios.filter(n => n.id !== codigo))
    );
  }

  public listarNegociosPropietario(codigoCliente: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.authURL}/listarNegociosCliente/${codigoCliente}`);
  }

  public listarNegociosActivos(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`http://localhost:8082/api/publico/listar-negocios-activos-aprobados`);
  }

}
