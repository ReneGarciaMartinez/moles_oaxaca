import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambiarPrecioPage } from './cambiar-precio.page';

const routes: Routes = [
  {
    path: '',
    component: CambiarPrecioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambiarPrecioPageRoutingModule {}
