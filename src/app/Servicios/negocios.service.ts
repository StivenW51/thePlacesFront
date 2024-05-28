
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
import { RevisaNegocioDTO } from '../dto/revisa-negocio-dto';
import { NegocioRechazadoDto } from '../dto/negocio-rechazado-dto';

@Injectable({
  providedIn: 'root'
})
export class NegociosService {
 
  private negocioURL = `${this.rutas.ruta}/api/negocio`;
  private publicURL = `${this.rutas.ruta}/api/publico`;
  private modURL = `${this.rutas.ruta}/api/moderador`;
  private idCliente: string = '';

  constructor(private http: HttpClient, 
      private tokenService: TokenService, 
      private rutas: RutasService) {}

  public listarNegociosCliente(): Observable<DetalleNegocioDTO[]> {
    const myToken = this.tokenService.getToken()
    const values = this.tokenService.decodePayload(myToken);
    this.idCliente = values['id']; // saca el id del cliente

    return this.http.get<MensajeDTO>(`${this.negocioURL}/listarNegociosCliente/${this.idCliente}`).pipe(
      map(mensaje => mensaje.respuesta) // Ajusta esto según la estructura de MensajeDTO
    );
  }

  public obtener(codigo: string): Observable<DetalleNegocioDTO | undefined> {
    return this.listarNegociosCliente().pipe(
      map(negocios => negocios.find(negocio => negocio.id === codigo))
    );
  }

  public eliminar(id: string): Observable<MensajeDTO> {
    const myToken = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${myToken}`
    });
    return this.http.delete<MensajeDTO>(`${this.negocioURL}/eliminar/${id}`, { headers });
  }

  public listarNegociosPropietario(codigoCliente: string): Observable<MensajeDTO> {
    const myToken = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${myToken}`
    });
    return this.http.get<MensajeDTO>(`${this.negocioURL}/listarNegociosCliente/${codigoCliente}`, { headers });
  }

  public listarNegociosActivos(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.publicURL}/listar-negocios-activos-aprobados`);
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
    return this.http.post<MensajeDTO>(`${this.negocioURL}/crear`, crearNegocioDTO, {headers}).pipe(
      map(mensaje => mensaje.respuesta) // Ajusta esto según la estructura de MensajeDTO
    );
  }

  public listarNegociosPendientes(): Observable<MensajeDTO>{
    const myToken = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${myToken}`
    });
    return this.http.get<MensajeDTO>(`${this.negocioURL}/listarNegociosPendientes`, { headers });
  }




  public listarNegociosPorEstadoRegistro(estadoRegistro : String): Observable<MensajeDTO>{
    const myToken = this.tokenService.getToken();
    const values = this.tokenService.decodePayload(myToken);
    const idModerador = values.id;    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${myToken}`
    });
    return this.http.get<MensajeDTO>(`${this.modURL}/negocios-revisados/${idModerador}/${estadoRegistro}`, { headers });
  }





  public revisarNegocio(revisaNegocioDTO: RevisaNegocioDTO): Observable<MensajeDTO> {
    const myToken = this.tokenService.getToken();
    const values = this.tokenService.decodePayload(myToken);
    const idModerador = values.id;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${myToken}`
    });
    revisaNegocioDTO.idModerador = idModerador;

    return this.http.post<MensajeDTO>(`${this.modURL}/revisar-negocio`, revisaNegocioDTO, {headers}).pipe(
      map(mensaje => mensaje.respuesta) // Ajusta esto según la estructura de MensajeDTO
    );
  }



}

