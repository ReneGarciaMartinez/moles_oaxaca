import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Chocolates, Moles } from 'src/app/models/models';
import { ToastController } from '@ionic/angular';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { __await } from 'tslib';
@Component({
  selector: 'app-editar-mole',
  templateUrl: './editar-mole.page.html',
  styleUrls: ['./editar-mole.page.scss'],
})
export class EditarMolePage implements OnInit {
  @Input() id:any;
  @Input() nombre:any;
  @Input() precio:any;
  @Input() descripcion:any;
  @Input() img:any;
  @Input() editar:any;
  
    mole: Moles = {
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
    this.mole.id=this.id;
    this.mole.nombre=this.nombre;
    this.mole.descripcion=this.descripcion;
    this.mole.precio=this.precio;
    this.mole.img=this.img;
    this.newImage=this.img;
    this.newFile=this.img;
    
  }
  closeModal() {
    this.modalController.dismiss();
  }

  async guardarMoleEditado() {
    const path = 'Moles/';
    if (this.newFile==this.newImage) {
      
    }else{
      this.showLoading();
      const name = this.mole.nombre;
      const res = await this.firestorageService.uploadImage(
        this.newFile,
        'Moles',
        name
      );
      this.mole.img = res;
    }
    
    this.firestoreService
      .updateMole(this.mole, path, this.mole.id)
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

