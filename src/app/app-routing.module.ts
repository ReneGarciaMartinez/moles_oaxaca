import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './components/perfil/perfil.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login',
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
  {
    path: 'crear-usuario',
    loadChildren: () => import('./admin/crear-usuario/crear-usuario.module').then( m => m.CrearUsuarioPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./repartidor/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'scanner',
    loadChildren: () => import('./repartidor/scanner/scanner.module').then( m => m.ScannerPageModule)
  },
  {
    path: 'tiendas',
    loadChildren: () => import('./pages/tiendas/tiendas.module').then( m => m.TiendasPageModule)
  },
  {
    path: 'agregar-tienda',
    loadChildren: () => import('./modals/agregar-tienda/agregar-tienda.module').then( m => m.AgregarTiendaPageModule)
  },
  {
    path: 'editar-tienda',
    loadChildren: () => import('./modals/editar-tienda/editar-tienda.module').then( m => m.EditarTiendaPageModule)
  },
  {
    path: 'tienda-qr',
    loadChildren: () => import('./modals/tienda-qr/tienda-qr.module').then( m => m.TiendaQrPageModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./admin/usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'editar-usuario',
    loadChildren: () => import('./admin/modals/editar-usuario/editar-usuario.module').then( m => m.EditarUsuarioPageModule)
  },
  {
    path: 'impresoras',
    loadChildren: () => import('./pages/impresoras/impresoras.module').then( m => m.ImpresorasPageModule)
  },
  {
    path: 'compra-credito',
    loadChildren: () => import('./pages/compra-credito/compra-credito.module').then( m => m.CompraCreditoPageModule)
  },
  {
    path: 'cambiar-precio',
    loadChildren: () => import('./modals/cambiar-precio/cambiar-precio.module').then( m => m.CambiarPrecioPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
