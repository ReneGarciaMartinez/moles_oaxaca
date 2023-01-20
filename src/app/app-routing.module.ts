import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './components/perfil/perfil.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./admin/productos/productos.module').then( m => m.ProductosPageModule)
  },
  {
    path: 'agregar-producto',
    loadChildren: () => import('./admin/modals/agregar-producto/agregar-producto.module').then( m => m.AgregarProductoPageModule)
  },
  {
    path: 'agregar-chocolate',
    loadChildren: () => import('./admin/modals/agregar-chocolate/agregar-chocolate.module').then( m => m.AgregarChocolatePageModule)
  },
  {
    path: 'editar-mole',
    loadChildren: () => import('./admin/modals/editar-mole/editar-mole.module').then( m => m.EditarMolePageModule)
  },
  {
    path: 'editar-chocolate',
    loadChildren: () => import('./admin/modals/editar-chocolate/editar-chocolate.module').then( m => m.EditarChocolatePageModule)
  },
  {
    path: 'perfil', component:PerfilComponent
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
