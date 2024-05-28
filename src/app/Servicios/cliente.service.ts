import { Injectable } from '@angular/core';
import { RegistroClienteDTO } from '../dto/registro-cliente-dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/mensaje-dto';
import { RutasService } from './rutas.service';
import { TokenService } from './token.service';
import { RecuperacionPasswordDTO } from '../dto/recuperacion-password-dto';
import { FavoritoDTO } from '../dto/favorito-dto';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private publicURL = `${this.rutas.ruta}/api/publico`;
  private clienteURL = `${this.rutas.ruta}/api/cliente`;
  private idCliente: string = '';

  constructor(private http: HttpClient,
    private tokenService: TokenService,
    private rutas: RutasService) { }

  public registrarCliente(registroClienteDTO: RegistroClienteDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.publicURL}/registrar`, registroClienteDTO);
  }

  public listarNegociosFavoritos(): Observable<MensajeDTO> {
    const myToken = this.tokenService.getToken();
    const values = this.tokenService.decodePayload(myToken);
    this.idCliente = values['id']; // saca el id del cliente
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${myToken}`
    });
    return this.http.get<MensajeDTO>(`${this.clienteURL}/favoritos/${this.idCliente}`, { headers });
  }

  public AgregarFavorito(favoritoDTO: FavoritoDTO): Observable<MensajeDTO> {
    const myToken = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${myToken}`
    });
    return this.http.post<MensajeDTO>(`${this.clienteURL}/agregarfavorito`, favoritoDTO, { headers });
  }

  public QuitarFavorito(favoritoDTO: FavoritoDTO): Observable<MensajeDTO> {
    const myToken = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${myToken}`
    });
    return this.http.post<MensajeDTO>(`${this.clienteURL}/quitarFavorito`, favoritoDTO, { headers });
  }
}
