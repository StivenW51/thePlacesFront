import { Injectable } from '@angular/core';
import { RegistroClienteDTO } from '../dto/registro-cliente-dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/mensaje-dto';
import { RutasService } from './rutas.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private authURL =  `${this.rutas.ruta}/api/publico`;



  constructor(private http: HttpClient, 
    private tokenService: TokenService, 
    private rutas: RutasService) {}

  public registrarCliente(registroClienteDTO: RegistroClienteDTO): Observable<MensajeDTO> {
    //return this.http.post<MensajeDTO>(`${this.authURL}/registrar`, registroClienteDTO);
    return this.http.post<MensajeDTO>(`${this.authURL}/registrar`, registroClienteDTO)
  }

  /*public login(inicioSesionDTO: InicioSesionDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/login`, inicioSesionDTO);
  }*/

  public listarNegociosFavoritos(codigoCliente: string): Observable<MensajeDTO> {
    const myToken = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${myToken}`
    });
    return this.http.get<MensajeDTO>(`${this.authURL}/favoritos/${codigoCliente}`, { headers });
  }

}
