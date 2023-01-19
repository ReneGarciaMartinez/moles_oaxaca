import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarMolePage } from './editar-mole.page';

const routes: Routes = [
  {
    path: '',
    component: EditarMolePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarMolePageRoutingModule {}
