export interface Departamento {
    iddepartamento: number;
    departamento: string;
}
export interface Provincia {
    idprovincia: number;
    provincia: string;
}
export interface Distrito {
    iddistrito: number;
    distrito: string
}
export interface Ubigeo {
    iddireccion: number;
    direccion: string;
    departamento: string;
    provincia: string;
    distrito: string
}