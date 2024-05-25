export class RevisaNegocioDTO {
 
    constructor(
        public idNegocio: string = '',
        public idModerador: string = '',
        public estadoRegistro: string = '',
        public observacion: string = '',        
    ) {
    }
}
