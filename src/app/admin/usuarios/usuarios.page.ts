import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Usuarios } from 'src/app/models/models';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { CrearUsuarioPage } from '../crear-usuario/crear-usuario.page';
import { EditarUsuarioPage } from '../modals/editar-usuario/editar-usuario.page';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  usuarios: Usuarios[] = [ ];
  constructor(public modalController: ModalController,public firestore:FirestoreService, public experiencia: ExperienciaService,private alertController: AlertController) {
    this.getUsuarios();
   }

  ngOnInit() {
  }
  async modal_nuevo_usuario(){
    const modal = await this.modalController.create({
      component: CrearUsuarioPage,
      cssClass: 'class-modal',
    });
    return await modal.present();
    
}
getUsuarios(){
  this.firestore.getUsuarios<Usuarios>('Tiendas/').subscribe((res) => {
    this.usuarios = res;
    console.log(this.usuarios);
    
  });
}
cambiarActivo(usuario:Usuarios){
  const path = 'Usuarios/';
  if (usuario.activo=='false') {
    usuario.activo='true';
  } else if(usuario.activo='true'){
    usuario.activo='false';
  }
  this.firestore
    .updateDoc(usuario, path,usuario.uid)
    .then((res) => {
     console.log(res);
     
      this.experiencia.presentToast('Usuario actualizado');
    })
    .catch((error) => {
      console.log(error);
      
      this.experiencia.presentToast('Usuario actualizado');
    });
}
async openModalEditarUsuario(usuario:Usuarios) {
  const modal = await this.modalController.create({
    component: EditarUsuarioPage,
    cssClass: 'class-modal',
    componentProps:{
      'id':usuario.uid,
      'nombre':usuario.nombre,
      'apellido_paterno':usuario.apellido_paterno,
      'apellido_materno':usuario.apellido_materno,
      'telefono':usuario.telefono,
      'correo':usuario.correo,
      'editar':true
    }
  });
  return await modal.present();
}
eliminarUsuario(usuario:Usuarios){
  this.firestore.deleteDoc('Usuarios/',usuario.uid);
this.experiencia.presentToast('Usuario Eliminado')
}
async presentAlert(data:Usuarios) {
  const alert = await this.alertController.create({
    header: '¿Esta seguro de eliminar?',
    mode:'ios',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          
        },
      },
      {
        text: 'Eliminar',
        role: 'confirm',
        handler: () => {
            this.eliminarUsuario(data);   
        
        },
      },
    ],
  });

  await alert.present();

  
  
}
}
