import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { routes } from '../../app.routes';
import { Router, RouterModule } from '@angular/router';

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

  constructor(private fb: FormBuilder) {
    this.recoverForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  recoverPassword() {
    if (this.recoverForm.valid) {
      // Aquí va la lógica para enviar el email de recuperación.
      // Simulando una respuesta exitosa:
      this.successMessage = 'Se ha enviado un enlace de recuperación a su correo electrónico.';
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Por favor, introduzca un correo electrónico válido.';
      this.successMessage = '';
    }
  }

  get email() {
    return this.recoverForm.get('email');
  }
}


