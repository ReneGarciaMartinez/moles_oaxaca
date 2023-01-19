import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarChocolatePageRoutingModule } from './editar-chocolate-routing.module';

import { EditarChocolatePage } from './editar-chocolate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarChocolatePageRoutingModule
  ],
  declarations: [EditarChocolatePage]
})
export class EditarChocolatePageModule {}
