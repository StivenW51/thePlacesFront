import { Component } from '@angular/core';
import { RegistroClienteDTO } from '../../dto/registro-cliente-dto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-cliente',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-cliente.component.html',
  styleUrl: './registro-cliente.component.css'
})
export class RegistroClienteComponent {

  registroClienteDTO: RegistroClienteDTO;
  ciudades: string[];
  archivos! : FileList;

  constructor() {
    this.registroClienteDTO = new RegistroClienteDTO();
    this.ciudades = [];
    this.cargarCiudades();
  }

  public registrar() {
    if (this.registroClienteDTO.fotoPerfil != ""){
      console.log(this.registroClienteDTO);
    }else{
      console.log("Debe cargar una foto");
      
    }
    
  }

  public sonIguales(): boolean {
    return this.registroClienteDTO.password == this.registroClienteDTO.confirmarPassword;
    }

  private cargarCiudades(){
    this.ciudades = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena"];
  }

  public onFileChange(event:any){
    if(event.target.files.length>0){
      this.archivos = event.target.files;
      this.registroClienteDTO.fotoPerfil = this.archivos[0].name;
    }
  }

}
