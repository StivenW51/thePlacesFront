import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Servicios/auth.service';
import { RecuperarDTO } from '../../dto/recuperar-dto';

@Component({
  selector: 'app-recuperar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent {
  recoverForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  emailCliente: string; 
  recuperarDTO: RecuperarDTO;
  fullPath: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private route: ActivatedRoute, private router: Router) {
    this.recoverForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.emailCliente = '';
    this.recuperarDTO = new RecuperarDTO();
    this.fullPath = ''
  }

  recoverPassword() {
    if (this.recoverForm.valid) {
      // Aquí va la lógica para enviar el email de recuperación.
          
      this.recuperarDTO.url = this.ruta();
      this.recuperarDTO.email = this.emailCliente;

      //console.log(this.recuperarDTO)
      this.authService.enviarLinkRecuperacion(this.recuperarDTO).subscribe({
        next: data => {
          console.log(data.respuesta)
        },
        error: (error) => {
          console.error(error);
        }
      });

      // Simulando una respuesta exitosa:
      this.successMessage = 'Se ha enviado un enlace de recuperación a su correo electrónico.';
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Por favor, introduzca un correo electrónico válido.';
      this.successMessage = '';
    }
  }

  ruta(): string{
    const baseUrl = `${window.location.protocol}//${window.location.host}`;
    
    return `${baseUrl}/recuperar-password/`;
  }

  get email() {
    return this.recoverForm.get('email');
  }
}


