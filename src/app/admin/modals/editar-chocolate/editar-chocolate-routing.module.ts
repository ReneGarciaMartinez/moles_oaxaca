import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarChocolatePage } from './editar-chocolate.page';

const routes: Routes = [
  {
    path: '',
    component: EditarChocolatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarChocolatePageRoutingModule {}
