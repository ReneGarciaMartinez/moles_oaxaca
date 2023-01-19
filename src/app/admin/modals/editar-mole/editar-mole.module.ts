import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarMolePageRoutingModule } from './editar-mole-routing.module';

import { EditarMolePage } from './editar-mole.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarMolePageRoutingModule
  ],
  declarations: [EditarMolePage]
})
export class EditarMolePageModule {}
