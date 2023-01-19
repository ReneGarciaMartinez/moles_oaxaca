import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Chocolates, Moles } from 'src/app/models/models';
import { ToastController } from '@ionic/angular';
import { FirestorageService } from 'src/app/services/firestorage.service';

@Component({
  selector: 'app-agregar-chocolate',
  templateUrl: './agregar-chocolate.page.html',
  styleUrls: ['./agregar-chocolate.page.scss'],
})
export class AgregarChocolatePage implements OnInit {
  mole: Moles = {
    id: this.firestoreService.getId(),
    nombre: '',
    precio: 0,
    descripcion: '',
    img: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
  };
  loading: any;
  chocolate: Chocolates = {
    id: this.firestoreService.getId(),
    nombre: '',
    precio: 0,
    descripcion: '',
    img: 'https://ionicframework.com/docs/img/demos/thumbnail.svg',
  };
  newImage = 'https://ionicframework.com/docs/img/demos/thumbnail.svg';
  newFile = '';
  constructor(
    private loadingCtrl: LoadingController,
    public modalController: ModalController,
    public firestorageService: FirestorageService,
    public firestoreService: FirestoreService,
    private toastController: ToastController
  ) {}

  ngOnInit() {}
  closeModal() {
    this.modalController.dismiss();
  }


  async guardarChocolate() {
    const path = 'Chocolates/';
    this.showLoading();
    const name = this.chocolate.nombre;
    if (this.newFile!==undefined) {
    const res = await this.firestorageService.uploadImage(
      this.newFile,
      'Chocolates',
      name
    );
    this.chocolate.img = res;
  }
    this.firestoreService
      .createChocolate(this.chocolate, path, this.chocolate.id)
      .then((res) => {
        this.loading.dismiss();
        this.presentToast('Chocolate agregado');
      })
      .catch((error) => {
        this.presentToast('Error al guardar');
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
  async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (image: any) => {
        this.newImage = image.target.result as string;
        console.log(this.newImage);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
