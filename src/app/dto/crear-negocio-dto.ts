import { Horario } from "../entidades/horario";
import { HorarioNegocioDTO } from "./horario-negocio-dto";
import { UbicacionNegocioDTO } from "./ubicacion-negocio-dto";

export class CrearNegocioDTO {

  constructor(
    public nombre: string = '',
    public tipoNegocio: string = '',
    public descripcion: string = '',
    public direccion: string = '',
    public imagenes: string[] = [],
    public ubicacion: UbicacionNegocioDTO = new UbicacionNegocioDTO(),
    public horarios: Horario[] = [],
    public estadoRegistro: string = '',
    public estadoNegocio: string = '',
    public telefonos: string[] = [],
    public codigoCliente: string = '',
    public idModerador: string = ''
  ) {}
}