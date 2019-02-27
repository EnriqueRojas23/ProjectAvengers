 export interface Paginarol
 {
    IdPagina: any;
    IdRol: number;
    permisos: string  
 }
 
 export declare class PaginarolMod {
    constructor(mod: Paginarol) ;
}
export interface RolUserForRegisterDto
{
   UserId: number;
   Alias: string;
}

export declare class RolUserForRegisterResult{
   constructor(mod: RolUserForRegisterDto) ;
 }


