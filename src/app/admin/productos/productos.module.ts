import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductosPageRoutingModule } from './productos-routing.module';

import { ProductosPage } from './productos.page';

import { AgregarProductoPage  } from "../modals/agregar-producto/agregar-producto.page";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductosPageRoutingModule
  ],
  declarations: [ProductosPage],
  entryComponents:[
    AgregarProductoPage
  ]
})
export class ProductosPageModule {}
