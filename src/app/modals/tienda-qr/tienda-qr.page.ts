import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tienda-qr',
  templateUrl: './tienda-qr.page.html',
  styleUrls: ['./tienda-qr.page.scss'],
})
export class TiendaQrPage implements OnInit {
  @Input() id:any;
  @Input() nombre:any;
  qrCodeString:string='12345';
  constructor(
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    this.qrCodeString=this.id;
    
  }
  closeModal() {
    this.modalController.dismiss();
  }
}
