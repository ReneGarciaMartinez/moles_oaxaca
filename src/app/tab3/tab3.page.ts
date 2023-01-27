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
  precioTotal:number=0;
  uid = "aEAj6Ik5BGcBf6cq1GrV7q95IM73";
  constructor(private firestore: FirestoreService,private carritoService:CarritoService
  ) {
    this.loadCarrito();
  }
  ngOnInit(){
 
    
  }
  loadCarrito() {
    this.firestore.getCarri().subscribe((res: any)=>{
      
      console.log('esta es la respuesta de load',res);

      this.pedidos = res.productos;
      this.all = res;
      this.precioTotal=this.all.precioTotal;
      // for(const val of this.pedidos){
      //   // console.log(val.pedidos.productos[0].producto.nombre);
      //   console.log(val);
      //   // this.pedido.push(val);
      // }
      // this.pedido=res;
    })
  } 
  
  async increment(id: any, cantidad: number, i: any) {
    this.pedidos[i].cantidad=this.pedidos[i].cantidad+1;
    const path = "Usuarios/aEAj6Ik5BGcBf6cq1GrV7q95IM73/Carrito/";
    this.firestore
      .updateCarri(this.all, path, this.uid)
      .then((res) => {
        console.log( id + 'Actualizado');
      })
      .catch((error) => {        
        console.log(error);
      });
  }

  decrement(id: any, cantidad: number,i: any) {
    this.pedidos[i].cantidad = this.pedidos[i].cantidad-1;
    const path = "Usuarios/aEAj6Ik5BGcBf6cq1GrV7q95IM73/Carrito/";
    const identificador = "1";
    this.firestore
      .updateCarri(this.all, path, identificador)
      .then((res) => {
        console.log( id + 'Actualizado');
      })
      .catch((error) => {        
        console.log(error);
      });
  }
 

}
