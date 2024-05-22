import { publicDecrypt } from "crypto";

export class UbicacionNegocioDTO {
    constructor(
        public latitud: number = 0,
        public longitud: number = 0
    ){}
}
