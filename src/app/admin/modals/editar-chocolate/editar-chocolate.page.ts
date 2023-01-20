import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Chocolates, Moles } from 'src/app/models/models';
import { ToastController } from '@ionic/angular';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { __await } from 'tslib';

@Component({
  selector: 'app-editar-chocolate',
  templateUrl: './editar-chocolate.page.html',
  styleUrls: ['./editar-chocolate.page.scss'],
})
export class EditarChocolatePage implements OnInit {
  @Input() id:any;
  @Input() nombre:any;
  @Input() precio:any;
  @Input() descripcion:any;
  @Input() img:any;
  @Input() editar:any;
 
    chocolate: Chocolates = {
      id: '',
      nombre: '',
      precio: 0,
      descripcion: '',
      img: '',
    };
  loading: any;

  newImage = '';
  newFile = '';
  constructor(
    private loadingCtrl: LoadingController,
    public modalController: ModalController,
    public firestoreService: FirestoreService,
    private toastController: ToastController,
    public firestorageService: FirestorageService
  ) {}

  ngOnInit() {
    this.chocolate.id=this.id;
    this.chocolate.nombre=this.nombre;
    this.chocolate.descripcion=this.descripcion;
    this.chocolate.precio=this.precio;
    this.chocolate.img=this.img;
    this.newImage=this.img;
    this.newFile=this.img;
    console.log(this.chocolate);
    
  }
  closeModal() {
    this.modalController.dismiss();
  }

  async guardarChocolateEditado() {
    const path = 'Chocolates/';
    if (this.newFile==this.newImage) {
      
    }else{
    this.showLoading();
    const name = this.chocolate.nombre;
    const res = await this.firestorageService.uploadImage(
      this.newFile,
      'Chocolates',
      name
    );
    this.chocolate.img = res;
    }
    this.firestoreService
      .updateChocolate(this.chocolate, path, this.chocolate.id)
      .then((res) => {
        this.loading.dismiss();
        this.presentToast('Chocolate actualizado');
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

