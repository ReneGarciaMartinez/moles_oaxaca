import { Component } from '@angular/core';
import { Pedido } from '../models/models';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  pedidos:Pedido[]=[];
  PedidoBuscado: any;
  constructor(public firestoreService:FirestoreService) {
    this.getPedidos();
  }

  getPedidos(){
    this.firestoreService.getPedidos<Pedido>('Pedidos/').subscribe(res=>{
      console.log('esta es la respuesta',res);
      
      this.pedidos=res;
      this.PedidoBuscado=this.pedidos;
    })
  }
  buscador(event:any){
    const text= event.target.value;    
    if (text && text.trim()!='') {
    //falta componer el buscador
      this.PedidoBuscado=this.pedidos.filter((tienda:any)=>{
        return(tienda.nombre.toLowerCase().indexOf(text.toLowerCase())>-1)
      })
    }else{
      this.PedidoBuscado=this.pedidos;
    }
  
  }
}
