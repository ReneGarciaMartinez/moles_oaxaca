import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Repartidor } from '../models/models';
import { FirebaseauthService } from '../services/firebaseauth.service';
import { FirestorageService } from '../services/firestorage.service';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';
import { User } from '../shared/user.class';
import { Console } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {
user:User= new User();
  constructor(public authSvc:FirebaseauthService, private router:Router) {}

  ngOnInit() {
  }
  
//   async onLogin(){
//   const user= await this.authSvc.onLogin(this.user);
//   if (user) {
//     console.log("logiado");
//     this.router.navigateByUrl('/productos')
    
//   }
// }
}

/*
  usuario:Repartidor={
    uid:'',
    nombre:'',
    apellido_paterno:'',
    apellido_materno:'',
    correo:'',
    contra:'',
  }
  uid='';
  constructor(public firebaseauthService:FirebaseauthService,
    private loadingCtrl: LoadingController,
    public firestorageService: FirestorageService,
    public firestoreService: FirestoreService,
    private toastController: ToastController) {this.firebaseauthService.stateAuth().subscribe(res=>{
      if (res!==null) {
        this.uid= res.uid;
      }
}); }
  async Ingresar(){
    const credenciales={
      correo:this.usuario.correo,
      contra:this.usuario.contra
    };
    this.firebaseauthService.Login(credenciales.correo,credenciales.contra).then(res=>{
      console.log('ingreso con exito');
      
    })
   
  }
*/
