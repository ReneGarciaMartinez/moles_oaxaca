import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearRepartidorPage } from './crear-repartidor.page';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: CrearRepartidorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearRepartidorPageRoutingModule {}
