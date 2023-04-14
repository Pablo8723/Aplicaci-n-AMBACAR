export interface CambioPrecioRepuesto {
    maestro: Maestro;
    detalle: Detalle[];
}

export interface Detalle {
    codigoRepuesto: string;
}

export interface Maestro {
    idTransaccion: number;
    codigoCliente: number;
    idAgencia:     string;
}
