import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { log } from 'console';
import { Moles, Pedido, ProductoPedido } from '../models/models';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private pedido:Pedido={
    id:'aEAj6Ik5BGcBf6cq1GrV7q95IM73',
    tienda:'',
    productos:[],
    precioTotal:0,
    fecha:new Date()
  }
  path = 'Carrito/';
  uid='aEAj6Ik5BGcBf6cq1GrV7q95IM73';
  tienda='';
  constructor(public firesoreService: FirestoreService,  private toastController: ToastController,) {
    this.firesoreService.getCarri().subscribe((res: any)=>{
      this.pedido = res;
      console.log("Prueba: ",this.pedido);
    });

  }
  addProducto(producto: Moles) {
    const item=this.pedido.productos.find(productoPedido=>{
      return(productoPedido.producto.id===producto.id)
    })
    if (item!==undefined) {
      item.cantidad++;
    }else{
      const add:ProductoPedido={
        producto:producto,
        cantidad:1
      }
      this.pedido.productos.push(add)
    }
     console.log('en add pedido',this.pedido) 
     const path ='Usuarios/'+this.uid+'/'+this.path;
     this.firesoreService.createDoc(this.pedido,path,this.pedido.id).then(()=>{
      this.presentToast("Producto agregado");
      
     })
  }
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'middle',
    });

    await toast.present();
  }
 

  removeProducto(producto: any,index:any) {
    
    this.pedido.productos.splice(index,1);
    console.log('index:',index);
    
    const path='Usuarios/'+this.uid+'/Carrito';
    this.firesoreService.createDoc(this.pedido,path,this.uid).then(()=>{
      console.log('eliminado');
    })
  }
  realizarPedido() {}

  clearCarrito() {}
}
