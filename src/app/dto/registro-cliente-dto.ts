import { publicDecrypt } from "crypto";

export class RegistroClienteDTO {

    constructor(
        public cedula: string = '',
        public nombre: string = '',
        public apellido: string = '',
        public nickname: string = '',
        public email: string = '',
        public ciudadResidencia: string = '',
        public password: string = '',
        public fotoPerfil: string = '',
        public telefono: string[] = [],
        public favoritos: string[] = []
    ) { }
}
