import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recuperar-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent {
  recoverPasswordForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.recoverPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, { validator: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value ? null : { mismatch: true };
  }

  resetPassword() {
    if (this.recoverPasswordForm.valid) {
      // Aquí va la lógica para cambiar la contraseña.
      // Simulando una respuesta exitosa:
      this.successMessage = 'Su contraseña ha sido actualizada exitosamente.';
      this.errorMessage = '';
    } else {
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






