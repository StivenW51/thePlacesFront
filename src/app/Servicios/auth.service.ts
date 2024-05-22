import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/mensaje-dto';
import { RegistroClienteDTO } from '../dto/registro-cliente-dto';
import { Observable } from 'rxjs';
import { InicioSesionDTO } from '../dto/inicio-sesion-dto';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = "http://localhost:8082/api/auth";

  constructor(private http: HttpClient) { }

  public login(inicioSesionDTO: InicioSesionDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/login`, inicioSesionDTO);
  }

}
