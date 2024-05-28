import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TokenService } from '../../Servicios/token.service';
import { RutasService } from '../../Servicios/rutas.service';
import { HttpHeaders } from '@angular/common/http';
import { RecuperacionPasswordDTO } from '../../dto/recuperacion-password-dto';
import { AuthService } from '../../Servicios/auth.service';

@Component({
  selector: 'app-recuperar-password',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent {
  recoverPasswordForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  tokenParam: string;
  recuperacionPasswordDTO: RecuperacionPasswordDTO;
  passwordNuevo: string;

  constructor(private fb: FormBuilder, private tokenService: TokenService, 
              private rutas: RutasService, 
              private route: ActivatedRoute,
              private authService: AuthService) {

    this.recoverPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validator: this.passwordsMatchValidator });

    this.tokenParam = '';
    this.passwordNuevo = '';
    this.recuperacionPasswordDTO = new RecuperacionPasswordDTO()
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value ? null : { mismatch: true };
  }

  resetPassword() {
    if (this.recoverPasswordForm.valid) {
      this.route.params.subscribe({
        next: data => {
          this.tokenParam = data['token'];
        },
        error: error => {
          console.error(error);
        }
      });

      const values = this.tokenService.decodePayload(this.tokenParam);
      this.recuperacionPasswordDTO.email = values.email;
      this.recuperacionPasswordDTO.password = this.passwordNuevo;

      this.authService.cambiarPassword(this.recuperacionPasswordDTO).subscribe({
        next: data => {
          console.log(data.respuesta)
          this.successMessage = 'Su contraseña ha sido actualizada exitosamente.';
          this.errorMessage = '';
        },
        error: (error) => {
          console.error(error);
        }
      });  
    } 
    else {
      this.errorMessage = 'Por favor, corrija los errores en el formulario.';
      this.successMessage = '';
    }
  }

  get password() {
    return this.recoverPasswordForm.get('password');
  }

  get confirmPassword() {
    return this.recoverPasswordForm.get('confirmPassword');
  }
}






