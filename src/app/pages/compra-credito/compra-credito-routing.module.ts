import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompraCreditoPage } from './compra-credito.page';

const routes: Routes = [
  {
    path: '',
    component: CompraCreditoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompraCreditoPageRoutingModule {}
