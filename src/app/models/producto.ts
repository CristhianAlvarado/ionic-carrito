export class Producto implements IProducto{
    idproducto: number = 0;
    descripcion: string= '';
    precio:number = 0;
    estado:number = 1;
    foto:any;

    constructor(res?: any){
        Object.assign(this, res);
    }
}

export interface IProducto{
    idproducto: number;
    descripcion: string;
    precio: number;
    estado:  number;
    foto: any;
}

