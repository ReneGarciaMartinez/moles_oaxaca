import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImpresorasPageRoutingModule } from './impresoras-routing.module';

import { ImpresorasPage } from './impresoras.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImpresorasPageRoutingModule
  ],
  declarations: [ImpresorasPage]
})
export class ImpresorasPageModule {}
