import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Repartidor } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  createRepartidor(repartidor: any, path: string, uid: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(uid).set(repartidor);
  }
 

  constructor(private firestore: AngularFirestore) { }

   getMoles<tipo>(path: any){

    const collection =this.firestore.collection<tipo>('Moles');
    return collection.valueChanges();
  }

  getChocolates<tipo>(path: any){

    const collection =this.firestore.collection<tipo>('Chocolates');
    return collection.valueChanges();
  }
getDoc<tipo>(path:string,id:string){
  const collection =this.firestore.collection<tipo>(path);
    return collection.doc(id).valueChanges();
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
 getId(){
  return this.firestore.createId();
 }
}
