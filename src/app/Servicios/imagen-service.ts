import { HttpClient } from "@angular/common/http";
import { RutasService } from "./rutas.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class ImagenService {

    private authURL = `${this.rutas.ruta}/api/imagenes`;

    constructor(private http: HttpClient, private rutas: RutasService) {

    }

    public subirImagen(file: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', file);

        return this.http.post<any>(`${this.authURL}/subir`, formData);
    }



}
