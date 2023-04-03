import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Tienda } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-agregar-tienda',
  templateUrl: './agregar-tienda.page.html',
  styleUrls: ['./agregar-tienda.page.scss'],
})
export class AgregarTiendaPage implements OnInit {
  @Input() id:any;
  @Input() nombre:any;
  @Input() precio:any;
  @Input() descripcion:any;
  @Input() img:any;
  @Input() editar:any;
  loading: any;

  tienda: Tienda = {
    id:this.firestoreService.getId(),
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
  ) { 
    
  }
 
  ngOnInit() {
  }
  closeModal() {
    this.modalController.dismiss();
  }
  async guardarTienda() {
    const path = 'Tiendas/';
    this.showLoading();
    this.firestoreService
      .createTienda(this.tienda, path, this.tienda.id)
      .then((res) => {
        this.loading.dismiss();
        this.presentToast('Tienda agregada');
      })
      .catch((error) => {
        this.presentToast('Error al guardar');
      });
    this.closeModal();
  }
  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Guardando...',
      duration: 1000,
    });

    this.loading.present();
  }
  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
    });

    await toast.present();
  }
}
