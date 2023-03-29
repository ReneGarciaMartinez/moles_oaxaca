import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';
import { log } from 'console';
import { Moles, Pedido, ProductoPedido, Usuarios } from '../models/models';
import { User } from '../shared/user.class';
import { FirebaseauthService } from './firebaseauth.service';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private pedido:Pedido={
    id:'',
    tienda:'',
    productos:[],
    precioTotal:0,
    fecha:new Date(),
    repartidor:''
  }
  path = 'Carrito/';
  uid='';
  tienda='';
  user: User = new User();
  login:boolean =false;
  datos:Usuarios={
    uid:'',
    nombre:'',
    apellido_paterno:'',
    apellido_materno:'',
    correo:'',
    contra:'',
    rol:'',
    telefono:'',
    activo:'',
  }
  constructor(private firestoreA: AngularFirestore,public authSvc: FirebaseauthService,public firesoreService: FirestoreService,  private toastController: ToastController,) {
    this.firesoreService.getCarri().subscribe((res: any)=>{
      this.pedido = res;
      console.log("Prueba: ",this.pedido);
    });
    this.authSvc.stateUser().subscribe(res=>{
      if (res) {
        
        this.login=true;
        this.getDatosUser(res.uid);
      }else{
      
        this.login=false;
      }
    })
  }
  getDatosUser(uid:any){
    const path='Usuarios';
    const id=uid;
   this.firesoreService.getDoc<Usuarios>(path,id).subscribe(res=>{
   
    if (res) {
      this.datos=res;
      this.uid=this.datos.uid;
    }
   })

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
  deleteCarrito(path:string, id:string){
    const collection= this.firestoreA.collection(path);
    return collection.doc(id).delete();
  
  }
}
