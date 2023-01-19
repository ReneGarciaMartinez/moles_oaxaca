import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Repartidor } from 'src/app/models/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-crear-repartidor',
  templateUrl: './crear-repartidor.page.html',
  styleUrls: ['./crear-repartidor.page.scss'],
})
export class CrearRepartidorPage implements OnInit {
repartidor:Repartidor={
  uid:'',
  nombre:'',
  apellido_paterno:'',
  apellido_materno:'',
  correo:'',
  contra:'',
}
loading: any;
uid='';
  constructor(public firebaseauthService:FirebaseauthService,
    private loadingCtrl: LoadingController,
    public firestorageService: FirestorageService,
    public firestoreService: FirestoreService,
    private toastController: ToastController) { 
      this.firebaseauthService.stateAuth().subscribe(res=>{
              if (res!==null) {
                this.uid= res.uid;
              }
      });
    }

  ngOnInit() {
  }
  async registrarRepartidor(){
    const credenciales={
      correo:this.repartidor.correo,
      contra:this.repartidor.contra
    }
     const res = await this.firebaseauthService.registrar(credenciales.correo,credenciales.contra).catch(error=>{
      console.log(error);
      
     });
     console.log(res);
     const uid =await this.firebaseauthService.getUid();
     console.log(uid);
     this.repartidor.uid=<string>uid;
     this.guardarRepartidor();
  }
  salir(){
    this.firebaseauthService.logout();
  }
  async guardarRepartidor() {
    const path = 'Repartidor/';
    this.showLoading();
    this.firestoreService
      .createRepartidor(this.repartidor, path, this.repartidor.uid)
      .then((res) => {
        this.loading.dismiss();
        this.presentToast('Usuario guardado');
      })
      .catch((error) => {
        this.presentToast('Usuario guardado');
      });
  }
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
    });

    await toast.present();
  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Guardando...',
      duration: 1000,
    });

    this.loading.present();
    
  }
  getUserInfo(uid:string){
    const path = 'Repartidor/';
    this.firestoreService.getDoc<Repartidor>(path,uid).subscribe(res=>{
     
    })
   }
}
