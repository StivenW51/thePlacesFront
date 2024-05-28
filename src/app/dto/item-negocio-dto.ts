import { Horario } from "../entidades/horario";
import { Ubicacion } from "../entidades/ubicacion";
export class ItemNegocioDTO {

    constructor(
        public id: string = '',
        public nombreNegocio: string = '',
        public imagenes: string = '',
        public categoria: string = '',
        public ubicacion: Ubicacion = new Ubicacion(),
        public direccion: string = '',
        public telefonos: string = '',
        public calificacion: number = 0,
        public descripcion: string = '',
        public horarios: Horario[] = [],
        public estadoNegocio: string = '',
    ) { }
}