import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RutasService {

  ruta: string;

  constructor() {
    //this.ruta = "http://localhost:8082";
    //this.ruta = "http://192.168.1.74:8082";
    this.ruta = "https://theplaces.onrender.com"

   }
}
