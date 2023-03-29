import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Repartidor, Usuarios } from '../models/models';
import { User } from '../shared/user.class';
import { FirebaseauthService } from './firebaseauth.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  uid='';
  user: User = new User();
  login:boolean =false;
  datos:Usuarios={
    uid:'',
    nombre:'',
    telefono:'',
    apellido_paterno:'',
    apellido_materno:'',
    correo:'',
    contra:'',
    rol:'',
    activo:''
  }
 
 

  constructor(public authSvc: FirebaseauthService,private firestore: AngularFirestore) { 
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
   this.getDoc<Usuarios>(path,id).subscribe(res=>{
   
    if (res) {
      this.datos=res;
      this.uid=this.datos.uid
    }
   })

  }
  createRepartidor(repartidor: any, path: string, uid: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(uid).set(repartidor);
  }
   getMoles<tipo>(path: any){

    const collection =this.firestore.collection<tipo>('Moles');
    return collection.valueChanges();
  }
  getCarri<tipo>(){
    const collection =this.firestore.collection<tipo>('/Usuarios/'+this.uid+'/Carrito').doc(this.uid);
    // console.log(collection);
    return collection.valueChanges();
  }

  updateCarri(data:any,path:string,id:string){
    console.log(data,path,id);
    const collection = this.firestore.collection(path);
    console.log(collection);
    return collection.doc(id).update(data);
  }

  getChocolates<tipo>(path: any){

    const collection =this.firestore.collection<tipo>('Chocolates');
    return collection.valueChanges();
  }
getDoc<tipo>(path:string,id:any){
    return this.firestore.collection(path).doc<tipo>(id).valueChanges();
}
getCarrito<Pedido>(path: any){

  const collection =this.firestore.collection<Pedido>(path);
  return collection.valueChanges();
}
  deleteMole(path:string, id:string){
    const collection= this.firestore.collection(path);
    return collection.doc(id).delete();

  }

  deleteChocolate(path:string, id:string){
    const collection= this.firestore.collection(path);
    return collection.doc(id).delete();

  }
  createMole(data:any,path:string,id:string){
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }
  createChocolate(data:any,path:string,id:string){
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }
  updateMole(data:any,path:string,id:string){
    const collection = this.firestore.collection(path);
    return collection.doc(id).update(data);
  }
  
  updateChocolate(data:any,path:string,id:string){
    const collection = this.firestore.collection(path);
    return collection.doc(id).update(data);
  }
  createDoc(data:any,path:string,id:any){
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }
 getId(){
  return this.firestore.createId();
 }
// Tiendas

getTiendas<tipo>(path: any){

  const collection =this.firestore.collection<tipo>('Tiendas');
  return collection.valueChanges();
}
deleteTienda(path:string, id:string){
  const collection= this.firestore.collection(path);
  return collection.doc(id).delete();

}
createTienda(data:any,path:string,id:string){
  const collection = this.firestore.collection(path);
  return collection.doc(id).set(data);
}
//usuarios

getUsuarios<tipo>(path: any){

  const collection =this.firestore.collection<tipo>('Usuarios');
  return collection.valueChanges();
}
updateDoc(data:any,path:string,id:string){
  const collection = this.firestore.collection(path);
  return collection.doc(id).update(data);
}
deleteDoc(path:string, id:string){
  const collection= this.firestore.collection(path);
  return collection.doc(id).delete();

}
//Pedidos
createPedido(data:any,path:string,id:string){
  const collection = this.firestore.collection(path);
  return collection.doc(id).set(data);
}
getPedidos<tipo>(path: any){

  const collection =this.firestore.collection<tipo>('Pedidos');
  return collection.valueChanges();
}
}
