import { Component, OnInit } from '@angular/core';
import { RegistroNegocioDTO } from '../../dto/registro-negocio-dto';
import { Horario } from '../../entidades/horario';
import { NegociosService } from '../../Servicios/negocios.service';
import { MapaService } from '../../Servicios/mapa.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../Servicios/token.service';
import { DetalleNegocioDTO } from '../../dto/detalle-negocio-dto';
import { ImagenService } from '../../Servicios/imagen-service';
import { EditarNegocioDTO } from '../../dto/editar-negocio-dto';

@Component({
  selector: 'app-editar-negocio',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-negocio.component.html',
  styleUrl: './editar-negocio.component.css'
})
export class EditarNegocioComponent implements OnInit {

  editarNegocioDTO: EditarNegocioDTO;
  horarios: Horario[];
  archivos!: FileList;
  marcador: any;
  codigoNegocio: string = '';
  observacion: string;
  negocio: DetalleNegocioDTO;
  tiposNegocio: string[];
  dias: string[];
  imagenes: string[];

  constructor(private route: ActivatedRoute, private negocioService: NegociosService,
    private tokenService: TokenService, private mapaService: MapaService,
    private router: Router, private imagenService: ImagenService) {

    this.route.params.subscribe((params) => {
      this.codigoNegocio = params['codigo'];
    });

    this.editarNegocioDTO = new EditarNegocioDTO();
    this.horarios = [];
    this.negocio = new DetalleNegocioDTO();
    this.observacion = '';
    this.tiposNegocio = [];
    this.dias = [];
    this.imagenes = [];

    this.cargarTipoNegocio();
    this.cargarDias();
    this.obtenerNegocio(this.codigoNegocio);
    this.horarios = this.negocio.horario;
   
  }

  public obtenerNegocio(codigoNegocio: string) {
    this.negocioService.obtenerNegocio(codigoNegocio).subscribe({
      next: (data) => {
        this.negocio = data.respuesta;
        console.log(this.negocio);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  public ActualizarNegocio() {
    this.editarNegocioDTO.id = this.negocio.id;
    this.editarNegocioDTO.nombre = this.negocio.nombreNegocio;
    this.editarNegocioDTO.tipoNegocio = this.negocio.categoria;
    this.editarNegocioDTO.descripcion = this.negocio.descripcion;
    this.editarNegocioDTO.horarios = this.horarios;
    this.editarNegocioDTO.direccion = this.negocio.direccion;
    this.editarNegocioDTO.imagenes = this.imagenes;
    this.editarNegocioDTO.ubicacion = this.negocio.ubicacion;
    this.editarNegocioDTO.telefonos = this.negocio.telefonos;

    this.negocioService.editarNegocio(this.editarNegocioDTO).subscribe({
      next: data => {
        if (data.respuesta) {
          console.log(data);
          this.router.navigate(['/gestion-negocios']);
        } else {
          console.error(data.respuesta);
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
              this.imagenes[index] = data.respuesta.secure_url;
            }
          },
          error: error => {
            console.error(error);
          }
        });
      }
    }
  }

  ngOnInit(): void {
    this.mapaService.crearMapa();
    this.mapaService.agregarMarcador().subscribe((marcador) => {
      this.editarNegocioDTO.ubicacion.latitud = marcador.lat;
      this.editarNegocioDTO.ubicacion.longitud = marcador.lng;
    });
  }

  private cargarTipoNegocio() {
    this.tiposNegocio = ["PANADERIA", "TIENDA", "BIBLIOTECA", "SUPERMERCADO", "CAFETERIA", "BAR", "RESTAURANTE"];
  }

  private cargarDias() {
    this.dias = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO", "DOMINGO"];
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
