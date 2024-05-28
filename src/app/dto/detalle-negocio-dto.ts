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
        public categoria: string = '',
        public imagenes: string[] = [],
        public telefonos: string[] = [],
        public descripcion: string = '',
        public idPropietario: string = '',
        public calificacion: number = 0,
        public estadoNegocio: string = '',
        public estadoRegistro: string = '',
        public observacion: string = '',
        public idModerador: string = ''
    ){}
}
