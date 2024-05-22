import { Injectable } from '@angular/core';
import { RegistroClienteDTO } from '../dto/registro-cliente-dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/mensaje-dto';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private authURL = 'http://localhost:8082/api/publico';

  constructor(private http: HttpClient ) { }

  public registrarCliente(registroClienteDTO: RegistroClienteDTO): any {
    //return this.http.post<MensajeDTO>(`${this.authURL}/registrar`, registroClienteDTO);
    return this.http.post<MensajeDTO>(`${this.authURL}/registrar`, registroClienteDTO)
  }

  /*public login(inicioSesionDTO: InicioSesionDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/login`, inicioSesionDTO);
  }*/

}
