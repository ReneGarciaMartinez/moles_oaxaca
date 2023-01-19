import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarChocolatePage } from './agregar-chocolate.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarChocolatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarChocolatePageRoutingModule {}
