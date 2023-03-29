import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-compra-credito',
  templateUrl: './compra-credito.page.html',
  styleUrls: ['./compra-credito.page.scss'],
})
export class CompraCreditoPage implements OnInit {
cantidad:any;
  constructor(public modalController:ModalController) { }

  ngOnInit() {
  }
  closeModal() {
    this.modalController.dismiss();
  }
}
