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
  datos:Usuarios={
    uid:'',
    nombre:'',
    apellido_paterno:'',
    apellido_materno:'',
    correo:'',
    contra:'',
    rol:''
  }
  
  constructor(public auth: FirebaseauthService, private router: Router, private firestoreService:FirestoreService) {}

  ngOnInit() {
  }

  async registro(){
console.log(this.datos);
const res= await this.auth.registrarUser(this.datos).catch(error=>{
  console.log(error);
  
});
if (res) {
  console.log('se creo el usuario');
  const path='Usuarios'
  const id= res.user?.uid;
  this.datos.uid=res.user?.uid;
  await this.firestoreService.createDoc(this.datos,path,id);
  this.auth.presentToast('¡Registrado con exito!')
  
  
}
// const auth = getAuth();
// createUserWithEmailAndPassword(auth, this.datos.correo, this.datos.contra)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;    
//     console.log(user);
    
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//     console.log(errorMessage);
    
//   });
  }

//popover
customPopoverOptions = {
  header: 'Rol del usuario',
  subHeader: 'Seleccione el rol',
  message: 'Solo puedes seleccionar un rol',
};
}
