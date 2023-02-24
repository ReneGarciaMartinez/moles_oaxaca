import { Interface } from "readline";

export interface Moles{
  id:string,
    nombre: string;
      precio: number;
      descripcion:string;
      img: string;
  }
  export interface Chocolates{
    id:string;
    nombre: string;
      precio: number;
      descripcion:string;
      img: string;
  }
  export interface Repartidor{
    uid:string;
    nombre:string;
    apellido_paterno:string;
    apellido_materno:string;
    correo:string;
    contra:string;
  }
  export interface Usuarios{
    uid:string;
    nombre:string;
    apellido_paterno:string;
    apellido_materno:string;
    correo:string;
    contra:string;
    rol:string;
  }
  export interface Pedido{
    id:string;
    tienda:string;
    productos:ProductoPedido[];
    precioTotal:number;
    fecha:Date;
  }
 export  interface ProductoPedido{
    producto:Moles;
    cantidad:number;
  }
  export interface User{
    email:string;
    password:string;
}
export interface Tienda{
  id:string;
  nombre:string;
  responsable:string;
  direccion:string;
  telefono:string;
}