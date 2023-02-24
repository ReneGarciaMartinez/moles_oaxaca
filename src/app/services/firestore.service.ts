import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Repartidor } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  uid='aEAj6Ik5BGcBf6cq1GrV7q95IM73';
  createRepartidor(repartidor: any, path: string, uid: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(uid).set(repartidor);
  }
 

  constructor(private firestore: AngularFirestore) { }

   getMoles<tipo>(path: any){

    const collection =this.firestore.collection<tipo>('Moles');
    return collection.valueChanges();
  }
  getCarri<tipo>(){
    const collection =this.firestore.collection<tipo>('/Usuarios/aEAj6Ik5BGcBf6cq1GrV7q95IM73/Carrito').doc(this.uid);
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
getDoc<tipo>(path:string,id:string){
  const collection =this.firestore.collection<tipo>(path);
    return collection.doc(id).valueChanges();
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
  createDoc(data:any,path:string,id:string){
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
}
