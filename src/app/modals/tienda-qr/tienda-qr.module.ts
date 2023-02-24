import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TiendaQrPageRoutingModule } from './tienda-qr-routing.module';

import { TiendaQrPage } from './tienda-qr.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TiendaQrPageRoutingModule,
    QRCodeModule
  ],
  declarations: [TiendaQrPage]
})
export class TiendaQrPageModule {}
