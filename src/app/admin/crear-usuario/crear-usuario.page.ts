import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { User } from 'src/app/shared/user.class';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Usuarios } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage implements OnInit {

  user: User = new User();
  usuario:Usuarios={
    uid:'',
    nombre:'',
    apellido_paterno:'',
    apellido_materno:'',
    correo:'',
    contra:'',
    rol:''
  }
  
  constructor(public authSvc: FirebaseauthService, private router: Router, private firestoreService:FirestoreService) {}

  ngOnInit() {
  }

  registro(){

const auth = getAuth();
createUserWithEmailAndPassword(auth, this.usuario.correo, this.usuario.contra)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;    
    console.log(user);
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    console.log(errorMessage);
    
  });
  }
//popover
customPopoverOptions = {
  header: 'Rol del usuario',
  subHeader: 'Seleccione el rol',
  message: 'Solo puedes seleccionar un rol',
};
}
