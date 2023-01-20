import { Injectable } from '@angular/core';
import { Moles, Pedido } from '../models/models';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
private pedido:Pedido[] = [];
path='Carrito/';
  constructor(public firesoreService:FirestoreService) { 
    this.loadCarrito();
  }
  
  loadCarrito(){

  }
  addProducto(producto:Moles){

  }
  getCarrito(){
return this.pedido;
  }

  removeProducto(producto:any){

  }
  realizarPedido(){

  }

  clearCarrito(){

  }
}
