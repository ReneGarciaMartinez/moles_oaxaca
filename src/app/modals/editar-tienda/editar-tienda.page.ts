import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Tienda } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-editar-tienda',
  templateUrl: './editar-tienda.page.html',
  styleUrls: ['./editar-tienda.page.scss'],
})
export class EditarTiendaPage implements OnInit {
  @Input() id:any;
  @Input() nombre:any;
  @Input() responsable:any;
  @Input() direccion:any;
  @Input() telefono:any;
  @Input() editar:any;
  loading: any;

  tienda: Tienda = {
    id:'',
    nombre: '',
      responsable:'',
      direccion: '',
      telefono:'',
      debe:'',
      cantidad_debe:0
  };
  newFile = '';
  constructor(
    private loadingCtrl: LoadingController,
    public modalController: ModalController,
    public firestoreService: FirestoreService,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
this.tienda.id=this.id;
this.tienda.nombre=this.nombre;
this.tienda.direccion=this.direccion;
this.tienda.responsable=this.responsable;
this.tienda.telefono=this.telefono;
  }
  closeModal() {
    this.modalController.dismiss();
  }
  async guardarTiendaEditada() {
    const path = 'Tiendas/';
    
    this.firestoreService
      .updateMole(this.tienda, path, this.tienda.id)
      .then((res) => {
        this.loading.dismiss();
        this.presentToast('Mole actualizado');
      })
      .catch((error) => {
        this.presentToast('Mole actualizado');
      });
    this.closeModal();
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
}
