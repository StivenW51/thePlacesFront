import { Component } from '@angular/core';
import { RegistroNegocioDTO } from '../../dto/registro-negocio-dto';
import { NegociosService } from '../../Servicios/negocios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Horario } from '../../entidades/horario';
import { UbicacionNegocioDTO } from '../../dto/ubicacion-negocio-dto';
import { MapaService } from '../../Servicios/mapa.service';


@Component({
  selector: 'app-crear-negocio',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-negocio.component.html',
  styleUrl: './crear-negocio.component.css'
})
export class CrearNegocioComponent {
  registroNegocioDTO: RegistroNegocioDTO;
  horarios: Horario[];
  archivos!: FileList;

  marcador: any;

  constructor(private negocioService: NegociosService, private mapaService: MapaService) {
    this.registroNegocioDTO = new RegistroNegocioDTO();
    this.horarios = [new Horario()];
    //this.marcador = new UbicacionNegocioDTO();
    this.marcador = null;
  }

  public crearNegocio() {
    this.registroNegocioDTO.horarios = this.horarios;
    //this.negocioService.crear(this.registroNegocioDTO);

    console.log(this.registroNegocioDTO);
  }

  public agregarHorario() {
    this.horarios.push(new Horario());
  }
  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
      this.registroNegocioDTO.imagenes[1] = this.archivos[0].name;
    }
  }

  ngOnInit(): void {
    this.mapaService.crearMapa();
    this.mapaService.agregarMarcador().subscribe((marcador) => {
      this.registroNegocioDTO.ubicacion.latitud = marcador.lat;
      this.registroNegocioDTO.ubicacion.longitud = marcador.lng;
    });
  }

}
