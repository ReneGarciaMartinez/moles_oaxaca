import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  constructor(private toastController: ToastController) { }

  async presentToast(mensaje:any) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 1500,
    });
  
    await toast.present();
  }
}
