import { HorarioNegocioDTO } from "../dto/horario-negocio-dto"

export class Horario {

    constructor(
        public dia:string = '',
        public horaInicio:string = '',
        public horaFinal:string = ''  
    ){
    
    }
}