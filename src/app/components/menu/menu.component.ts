import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { log } from 'console';
import { getAuth, signOut } from 'firebase/auth';
import { Usuarios } from 'src/app/models/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { User } from 'src/app/shared/user.class';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  user: User = new User();
  login:boolean =false;
  datos:Usuarios={
    uid:'',
    nombre:'',
    apellido_paterno:'',
    apellido_materno:'',
    correo:'',
    contra:'',
    rol:''
  }
  constructor(public authSvc: FirebaseauthService, private router: Router, private firestore:FirestoreService) {

    this.authSvc.stateUser().subscribe(res=>{
      if (res) {
        console.log('esta logeado');
        this.login=true;
        this.getDatosUser(res.uid);
      }else{
        console.log('no esta logeado');
        this.login=false;
      }
    })
  }

  ngOnInit() {}
  logOut(){
    this.authSvc.logout();
    this.authSvc.presentToast('Sessión finalizada');
    this.router.navigate(['/login'])
  }
  getDatosUser(uid:any){
    const path='Usuarios';
    const id=uid;
   this.firestore.getDoc<Usuarios>(path,id).subscribe(res=>{
    console.log('datos: ',res);
    if (res) {
      this.datos=res;
    }
   })

  }
}
