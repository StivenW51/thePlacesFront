
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MensajeDTO } from '../dto/mensaje-dto';
import { TokenService } from './token.service';
import { RutasService } from './rutas.service';
import { DetalleNegocioDTO } from '../dto/detalle-negocio-dto';
import { RegistroNegocioDTO } from '../dto/registro-negocio-dto';
import { CrearNegocioDTO } from '../dto/crear-negocio-dto';

@Injectable({
  providedIn: 'root'
})
export class NegociosService {
  private authURL = `${this.rutas.ruta}/api/negocio`;
  private publicURL = `${this.rutas.ruta}/api/publico`;
  private idCliente: string = '';

  constructor(private http: HttpClient, 
      private tokenService: TokenService, 
      private rutas: RutasService) {}

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
    const myToken = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${myToken}`
    });
    return this.http.get<MensajeDTO>(`${this.authURL}/listarNegociosCliente/${codigoCliente}`, { headers });
  }

  public listarNegociosActivos(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.authURL}/listar-negocios-activos-aprobados`);
  }
  
  public obtenerNegocio(codigoNegocio: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.publicURL}/obtener/${codigoNegocio}`);
  }


  public crearNegocio(crearNegocioDTO: CrearNegocioDTO): Observable<MensajeDTO> {
    const myToken = this.tokenService.getToken();
    const values = this.tokenService.decodePayload(myToken);
    this.idCliente = values['id']; // saca el id del cliente
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${myToken}`
    });
    crearNegocioDTO.codigoCliente = this.idCliente;
    return this.http.post<MensajeDTO>(`${this.authURL}/crear`, crearNegocioDTO, {headers}).pipe(
      map(mensaje => mensaje.respuesta) // Ajusta esto según la estructura de MensajeDTO
    );
  }
}

