import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarTiendaPageRoutingModule } from './agregar-tienda-routing.module';

import { AgregarTiendaPage } from './agregar-tienda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarTiendaPageRoutingModule
  ],
  declarations: [AgregarTiendaPage]
})
export class AgregarTiendaPageModule {}
