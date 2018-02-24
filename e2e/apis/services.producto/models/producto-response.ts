export class ProductoResponse{
    public items:Producto[]
    constructor(){}
}
export class Producto{
    public id:number;
    public descripcion:string;
    public stockminimo:number;
    constructor(){}
}