import { Horario } from "../entidades/horario";
import { UbicacionNegocioDTO } from "./ubicacion-negocio-dto";

export class EditarNegocioDTO {

    constructor(
        public id: string = '',
        public nombre: string = '',
        public tipoNegocio: string = '',
        public descripcion: string = '',
        public direccion: string = '',
        public imagenes: string[] = [],
        public ubicacion: UbicacionNegocioDTO = new UbicacionNegocioDTO(),
        public horarios: Horario[] = [],
        public telefonos: string[] = []
    ) { }
}

