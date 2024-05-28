import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from "buffer";

const TOKEN_KEY = "AuthToken";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  router: Router;

  constructor() {
    this.router = new Router();
  }

  public setToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  public logout() {
    window.sessionStorage.clear();
    this.router.navigate(["/login"]).then(() => {
      window.location.reload();
    });
  }

  public login(token: string) {
    this.setToken(token);
    this.router.navigate(["/"]).then(() => {
      window.location.reload();
    });
  }

  public decodePayload(token: string | null): any {
    const payload = token!.split(".")[1];
    
    if(payload !== null){
      const payloadDecoded = Buffer.from(payload, 'base64').toString('ascii');
      const values = JSON.parse(payloadDecoded);
      return values;
    }
    else{
      return null;
    }
        
  }

  public getEmail(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.sub;
    }
    return "";
  }

  public getRole(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload(token);
      return values.rol;
    }
    return "";
  }

}
