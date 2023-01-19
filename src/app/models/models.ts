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