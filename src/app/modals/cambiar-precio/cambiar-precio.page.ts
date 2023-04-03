import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cambiar-precio',
  templateUrl: './cambiar-precio.page.html',
  styleUrls: ['./cambiar-precio.page.scss'],
})
export class CambiarPrecioPage implements OnInit {
precioNuevo:any
@Input() precioActual:any;
@Input() index:any;
  constructor(public modalController: ModalController) { }

  ngOnInit() {
    this.precioNuevo=this.precioActual
  }
  closeModal() {
    this.modalController.dismiss();
  }
  async guardarPrecio(pre:any){
   await this.modalController.dismiss({
      precio:pre,

    });
    return;
  }
}
