import { Component, OnInit } from '@angular/core';
import { NegociosService } from '../../Servicios/negocios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Horario } from '../../entidades/horario';
import { UbicacionNegocioDTO } from '../../dto/ubicacion-negocio-dto';
import { MapaService } from '../../Servicios/mapa.service';
import { Router, RouterModule } from '@angular/router';
import { CrearNegocioDTO } from '../../dto/crear-negocio-dto';
import { ImagenService } from '../../Servicios/imagen-service';

@Component({
  selector: 'app-crear-negocio',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './crear-negocio.component.html',
  styleUrls: ['./crear-negocio.component.css']
})
export class CrearNegocioComponent implements OnInit {
  crearNegocioDTO: CrearNegocioDTO;
  horarios: Horario[];
  archivos!: FileList;
  tiposNegocio: string[];
  marcador: any;
  dias: string[];

  constructor(private negocioService: NegociosService, 
              private mapaService: MapaService, 
              private router: Router,
              private imagenService: ImagenService) {
    this.crearNegocioDTO = new CrearNegocioDTO();
    this.crearNegocioDTO.ubicacion = new UbicacionNegocioDTO(); // Asegúrate de inicializar la ubicación
    this.horarios = [];
    this.marcador = null;
    this.tiposNegocio = [];
    this.dias = [];
    this.cargarTipoNegocio(); 
    this.cargarDias(); 
    
  }

  ngOnInit(): void {
    this.mapaService.crearMapa();
    this.mapaService.agregarMarcador().subscribe((marcador) => {
      this.crearNegocioDTO.ubicacion.latitud = marcador.lat;
      this.crearNegocioDTO.ubicacion.longitud = marcador.lng;
      console.log(`Latitud: ${this.crearNegocioDTO.ubicacion.latitud}, Longitud: ${this.crearNegocioDTO.ubicacion.longitud}`);
    });
  }

  public crearNegocio() {
    this.crearNegocioDTO.horarios = this.horarios;
    this.crearNegocioDTO.estadoNegocio = 'INACTIVO';
    this.crearNegocioDTO.estadoRegistro = 'PENDIENTE';
    this.crearNegocioDTO.idModerador = '';

    // Verificar las coordenadas antes de enviar la solicitud
    console.log(`Creando negocio con latitud: ${this.crearNegocioDTO.ubicacion.latitud}, longitud: ${this.crearNegocioDTO.ubicacion.longitud}`);
    
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
    });
  }

  public agregarHorario() {
    this.horarios.push(new Horario());
  }
  public eliminarHorario(index: number) {
    this.horarios.splice(index, 1);
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;

      for (let index = 0; index < this.archivos.length; index++) {
        const file = this.archivos[index];
        
        this.imagenService.subirImagen(file).subscribe({
          next: data => {
            if (data != '') {
              console.log(data);
              this.crearNegocioDTO.imagenes[index] = data.respuesta.secure_url;
            }
          },
          error: error => {
            console.error(error);
          }
        });
      }
    }
  }

  private cargarTipoNegocio() {
    this.tiposNegocio = ["PANADERIA", "TIENDA", "BIBLIOTECA", "SUPERMERCADO", "CAFETERIA", "BAR", "RESTAURANTE"];
  }

  private cargarDias() {
    this.dias = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO", "DOMINGO"];
  }

  // Función trackBy para ngFor
  trackByIndex(index: number, obj: any): any {
    return index;
  }
}



