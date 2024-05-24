import { publicDecrypt } from "crypto";
import { HorarioNegocioDTO } from "./horario-negocio-dto";
import { UbicacionNegocioDTO } from "./ubicacion-negocio-dto";

export class DetalleNegocioDTO {

    constructor(
        public id: string = '',
        public nombreNegocio: string ='',
        public direccion: string = '',
        public horario: HorarioNegocioDTO[] = [],
        public ubicacion: UbicacionNegocioDTO = new UbicacionNegocioDTO(),
        public categoria: String = '',
        public imagenes: String[] = [],
        public telefonos: String[] = [],
        public descripcion: String = '',
        public idPropietario: string = '',
        public calificacion: Number = 0,
        public estadoNegocio: string = ''
    ){}
}
