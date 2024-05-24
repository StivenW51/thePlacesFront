import { Horario } from "../entidades/horario";
import { Ubicacion } from "../entidades/ubicacion";
import { UbicacionNegocioDTO } from "./ubicacion-negocio-dto";

export class RegistroNegocioDTO {

    constructor(
        public nombreNegocio: string='',
        public imagenes: string[] = [],
        public tipoNegocio: string = '',
        public ubicacion: UbicacionNegocioDTO = new UbicacionNegocioDTO(),
        public direccion: string ='',
        public telefonos: string[] = [],
        public calificacion: string = '',
        public descripcionNegocio: string='',
        public codigoCliente: string='',
        public horarios: Horario[] = [],
        public estadoNegocio: string = ''
    ){}
}
