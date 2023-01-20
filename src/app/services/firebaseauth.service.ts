import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { stringLength } from '@firebase/util';
import { User } from '../shared/user.class';
@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {
public isLogged:any=false;

  constructor(public afauth:AngularFireAuth) { 
    afauth.authState.subscribe(user=>(this.isLogged=user))
    }
/*
async onLogin(user:User){
  try {
    return await this.afauth.signInWithEmailAndPassword(user.email,user.password);
  } catch (error) {
    console.log('Error en el login',error);
    
  }

}

async register(user:User){
  try {
    return this.afauth.createUserWithEmailAndPassword(user.email,user.password);
  } catch (error) {
    console.log('Error en el login',error);
  }
 
}*/

}
/* Login(email:string,password:string){
      return this.auth.signInWithEmailAndPassword(email,password)
  }
  logout(){
return this.auth.signOut;
  }
  registrar(email:string,password:string){
return this.auth.createUserWithEmailAndPassword(email,password);
  }
  async getUid(){
    const user = await this.auth.currentUser;
    if(user === null){
      return null;
    }else{
      return user?.uid;
    }
  }
  stateAuth(){
    return this.auth.authState;
  }*/