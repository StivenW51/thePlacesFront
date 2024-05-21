import { Horario } from "../entidades/horario";
import { Ubicacion } from "../entidades/ubicacion";

export class RegistroNegocioDTO {

    constructor(
        public codigo: string ='',
        public nombreNegocio: string='',
        public imagenes: string[] = [],
        public tipoNegocio: string = '',
        public ubicacion: string = '',
        public direccion: string ='',
        public telefonos: string[] = [],
        public calificacion: string = '',
        public descripcionNegocio: string='',
        public codigoCliente: string='',
        public horarios: Horario[] = [],
        public estadoNegocio: string = ''
    ){}
}
