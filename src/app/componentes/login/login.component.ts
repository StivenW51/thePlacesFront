import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el servicio Router
import { InicioSesionDTO } from '../../dto/inicio-sesion-dto';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Servicios/auth.service';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../../Servicios/token.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  authServices: AuthService;
  inicioSesion: InicioSesionDTO;
  errorMessage: string | null = null;
  tokenService: TokenService;

  constructor(private authService: AuthService,
    private router: Router // Inyecta el servicio Router
  ){
    this.inicioSesion = new InicioSesionDTO();
    this.authServices = authService;
    this.tokenService = new TokenService();
  }


  IniciarSesion() {
    this.authService.loginCliente(this.inicioSesion).subscribe(
      response => {      
        if (response.respuesta) {
          console.log(response);
          this.tokenService.setToken(response.respuesta.token)
          //alert(response.respuesta);
          this.router.navigate(['/gestion-negocios']);
        } else {
          //this.router.navigate(['/gestion-negocios']); 
          // Redirecciona al usuario al componente de inicio quedA PENDIENTE
          console.error('ok');
        }
      },
      error => {
        console.error(error);
        this.errorMessage = 'Contraseña incorrecta';
      }
    );
  }

  
  
}






