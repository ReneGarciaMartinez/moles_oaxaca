import { Component } from '@angular/core';
import { Moles, Pedido,ProductoPedido } from '../models/models';
import { CarritoService } from '../services/carrito.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
 
  count = 0;
  // pedido:Pedido[]=[];
  pedido: any;
  pedidos: any;
  all: any;
  precioTotal=0;
  uid = "aEAj6Ik5BGcBf6cq1GrV7q95IM73";
  constructor(private firestore: FirestoreService,private carritoService:CarritoService
  ) {
    
  }
  ngOnInit(){
 
    this.precioTotal=0;
    this.loadCarrito();
  }
  loadCarrito() {
    this.precioTotal=0;
    this.firestore.getCarri().subscribe((res: any)=>{
      
      console.log('esta es la respuesta de load',res);

      this.pedidos = res.productos;
      this.all = res;
 
for (let index = 0; index < this.pedidos.length; index++) {
  const precio = this.pedidos[index].producto.precio*this.pedidos[index].cantidad;
  this.precioTotal=this.precioTotal+precio;
console.log('precio:',precio);
console.log('precio total:',this.precioTotal);

  
  
  
}
    })
  } 
  
  async increment(id: any, cantidad: number, i: any) {
    this.pedidos[i].cantidad=this.pedidos[i].cantidad+1;
    const path = "Usuarios/aEAj6Ik5BGcBf6cq1GrV7q95IM73/Carrito/";
    this.precioTotal=0;
    this.firestore
      .updateCarri(this.all, path, this.uid)
      .then((res) => {
        console.log( id + 'Actualizado');
        this.precioTotal=0;
      })
      .catch((error) => {        
        console.log(error);
      });
  }

  decrement(id: any, cantidad: number,i: any) {
    this.pedidos[i].cantidad = this.pedidos[i].cantidad-1;

    if (this.pedidos[i].cantidad<=0) {
      this.removeCarrito(this.pedidos[i].producto,i);
    }else{
    const path = "Usuarios/aEAj6Ik5BGcBf6cq1GrV7q95IM73/Carrito/";
    this.firestore
      .updateCarri(this.all, path, this.uid)
      .then((res) => {
        console.log( id + 'Actualizado');
        this.precioTotal=0;
        
      })
      .catch((error) => {        
        console.log(error);
      });
    }
  }
 
removeCarrito(producto:any,index:any){
  this.carritoService.removeProducto(producto,index);
  this.precioTotal=0;
}
}
