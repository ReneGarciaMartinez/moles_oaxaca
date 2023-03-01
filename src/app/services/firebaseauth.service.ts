import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { stringLength } from '@firebase/util';
import { ToastController } from '@ionic/angular';
import { Usuarios } from '../models/models';
import { User } from '../shared/user.class';
@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {
  public isLogged:any=false;
  
    constructor(public authfirebase:AngularFireAuth,private toastController: ToastController) { 
      // afauth.authState.subscribe(user=>(this.isLogged=user))
      }
  login(correo:any, contra:any){
   return  this.authfirebase.signInWithEmailAndPassword(correo,contra)
  }
  logout(){
    this.authfirebase.signOut();
  }
  
  async presentToast(mensaje:any) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
    });
  
    await toast.present();
  }
  registrarUser(datos:Usuarios){
    return this.authfirebase.createUserWithEmailAndPassword(datos.correo,datos.contra);
  
  }
  stateUser(){
    return this.authfirebase.authState;
  }
  async getUid(){
    const user = await this.authfirebase.currentUser;
    if(user === null){
      return null;
    }else{
      return user?.uid;
    }
  }
}
  
    
  
 