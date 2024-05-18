import { publicDecrypt } from "crypto";

export class UbicacionNegocioDTO {
    constructor(
        public latitud: number,
        public longitud: number
    ){}
}
