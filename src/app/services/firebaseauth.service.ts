import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { stringLength } from '@firebase/util';

@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {

  constructor(public auth:AngularFireAuth) { 
    this.getUid();
    }
  Login(email:string,password:string){
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
  }
}
