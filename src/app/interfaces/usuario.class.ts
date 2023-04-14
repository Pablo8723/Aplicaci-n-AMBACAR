export class Usuario{
    constructor(
        public nombre : string,
        public apellido : string,
        public email : string,
        public direccion : string,
        public identificacion : string,
        public fechaIngreso? : string,
        public celular?: string,

    ){}
}