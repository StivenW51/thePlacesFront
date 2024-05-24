import { Component } from '@angular/core';
import { NegociosService } from '../../Servicios/negocios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Horario } from '../../entidades/horario';
import { UbicacionNegocioDTO } from '../../dto/ubicacion-negocio-dto';
import { MapaService } from '../../Servicios/mapa.service';
import { Router, RouterModule } from '@angular/router';
import { CrearNegocioDTO } from '../../dto/crear-negocio-dto';
import { ThisReceiver } from '@angular/compiler';
import { ImagenService } from '../../Servicios/imagen-service';


@Component({
  selector: 'app-crear-negocio',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './crear-negocio.component.html',
  styleUrl: './crear-negocio.component.css'
})
export class CrearNegocioComponent {
  crearNegocioDTO: CrearNegocioDTO;
  horarios: Horario[];
  archivos!: FileList;
  tiposNegocio: string[];
  marcador: any;
  dias: string[];


  constructor(private negocioService: NegociosService, 
            private mapaService: MapaService, 
            private router: Router,
            private imagenService: ImagenService ) {
    this.crearNegocioDTO = new CrearNegocioDTO();
    this.horarios = [];
    this.marcador = null;
    this.tiposNegocio = [];
    this.dias = [];
    this.cargarTipoNegocio(); 
  }

  public crearNegocio() {
    this.crearNegocioDTO.horarios = this.horarios;
    this.crearNegocioDTO.estadoNegocio = 'INACTIVO';
    this.crearNegocioDTO.estadoRegistro = 'PENDIENTE';
    this.crearNegocioDTO.idModerador = '';

    this.negocioService.crearNegocio(this.crearNegocioDTO).subscribe({
      next: response => {
        if (response.respuesta) {
          console.log(response);
          
          this.router.navigate(['/gestion-negocios']).then(() => {
            window.location.reload();
          });
        } else {
          console.error(response.respuesta);
        }
      },
      error: error => {
        console.error(error);
      }
  });;

    console.log(this.crearNegocioDTO);
  }

  public agregarHorario() {
    this.horarios.push(new Horario());
  }


  public onFileChange(event:any){
    if(event.target.files.length>0){
      this.archivos = event.target.files;

      for (let index = 0; index < this.archivos.length; index++) {
        const file = this.archivos[index];
        
        this.imagenService.subirImagen(file).subscribe({
        next: data => {
          if(data != ''){
            console.log(data);
            this.crearNegocioDTO.imagenes[index] = data.respuesta.secure_url;
          }
        },
        error: error =>{
          console.error(error);
        }
      }) ; 
      }          
    }
  }

  ngOnInit(): void {
    this.mapaService.crearMapa();
    this.mapaService.agregarMarcador().subscribe((marcador) => {
      this.crearNegocioDTO.ubicacion.latitud = marcador.lng;
      this.crearNegocioDTO.ubicacion.longitud = marcador.lat;
    });
  }

  private cargarTipoNegocio(){
    this.tiposNegocio = ["PANADERIA", "TIENDA", "BIBLIOTECA", "SUPERMERCADO", "CAFETERIA", "BAR", "RESTAURANTE"];
  }

  private cargarDias(){
    this.tiposNegocio = ["LUNES","MARTES","MIERCOLES","JUEVES","VIERNES","SABADO", "DOMINGO"];
  }
}
