import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/mensaje-dto';
import { RegistroClienteDTO } from '../dto/registro-cliente-dto';
import { Observable } from 'rxjs';
import { InicioSesionDTO } from '../dto/inicio-sesion-dto';
import { RutasService } from './rutas.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private authURL = `${this.rutas.ruta}/api/auth`;

  constructor(private http: HttpClient, private rutas: RutasService) { }

  public login(inicioSesionDTO: InicioSesionDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/login`, inicioSesionDTO);
  }

}
