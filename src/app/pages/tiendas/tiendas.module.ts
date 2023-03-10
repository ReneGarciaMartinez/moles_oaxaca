import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TiendasPageRoutingModule } from './tiendas-routing.module';

import { TiendasPage } from './tiendas.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TiendasPageRoutingModule,
    QRCodeModule
  ],
  declarations: [TiendasPage]
})
export class TiendasPageModule {}
