import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompraCreditoPageRoutingModule } from './compra-credito-routing.module';

import { CompraCreditoPage } from './compra-credito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompraCreditoPageRoutingModule
  ],
  declarations: [CompraCreditoPage]
})
export class CompraCreditoPageModule {}
