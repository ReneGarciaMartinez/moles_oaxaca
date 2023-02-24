import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarTiendaPage } from './agregar-tienda.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarTiendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarTiendaPageRoutingModule {}
