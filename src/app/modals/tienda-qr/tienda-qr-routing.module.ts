import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TiendaQrPage } from './tienda-qr.page';

const routes: Routes = [
  {
    path: '',
    component: TiendaQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiendaQrPageRoutingModule {}
