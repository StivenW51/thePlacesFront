import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RegistroClienteDTO } from "../../dto/registro-cliente-dto";
import { ClienteService } from "../../Servicios/cliente.service";
import { Router } from "@angular/router";



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
  confirmarPassword: string;
  telefonos: string;

  constructor(private clienteServicio: ClienteService, private router: Router) {
    this.registroClienteDTO = new RegistroClienteDTO();
    this.ciudades = [];
    this.cargarCiudades();
    this.confirmarPassword = "";    
    this.telefonos = "";
  }

  public registrar() {

    if (this.registroClienteDTO.fotoPerfil != ""){
      console.log(this.registroClienteDTO);
      this.registroClienteDTO.favoritos = [];

      if(this.telefonos.includes(',')){
        this.registroClienteDTO.telefono = this.telefonos.split(',');
      }
      else{
        this.registroClienteDTO.telefono = [this.telefonos];
      }

      this.clienteServicio.registrarCliente(this.registroClienteDTO).subscribe(
        response => {
          if (response.respuesta) {
            console.log(response);
            confirm("Cliente registrado exitosamente");
      
            this.router.navigate(['/login']);
          } else {
            console.error('ok');
          }
        },
        error => {
          console.error(error);
        }
      );
  

    }else{
      console.log("Debe cargar una foto");      
    }



  }

  public sonIguales(): boolean {
    return this.registroClienteDTO.password == this.confirmarPassword;
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
