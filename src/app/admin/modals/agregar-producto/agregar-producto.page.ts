import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Chocolates, Moles } from 'src/app/models/models';
import { ToastController } from '@ionic/angular';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { __await } from 'tslib';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.page.html',
  styleUrls: ['./agregar-producto.page.scss'],
})
export class AgregarProductoPage implements OnInit {
  @Input() id:any;
  @Input() nombre:any;
  @Input() precio:any;
  @Input() descripcion:any;
  @Input() img:any;
  @Input() editar:any;
  
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
    public firestoreService: FirestoreService,
    private toastController: ToastController,
    public firestorageService: FirestorageService
  ) {}

  ngOnInit() {
    console.log(this.nombre);
    
  }
  closeModal() {
    this.modalController.dismiss();
  }

  async guardarMole() {
    const path = 'Moles/';

    this.showLoading();
    const name = this.mole.nombre;
    if (this.newFile!==undefined) {
      const res = await this.firestorageService.uploadImage(
        this.newFile,
        'Moles',
        name
      );
      this.mole.img = res;
    }
    
    this.firestoreService
      .createMole(this.mole, path, this.mole.id)
      .then((res) => {
        this.loading.dismiss();
        this.presentToast('Mole agregado');
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
