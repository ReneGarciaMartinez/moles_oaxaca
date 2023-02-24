import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AgregarTiendaPage } from 'src/app/modals/agregar-tienda/agregar-tienda.page';
import { EditarTiendaPage } from 'src/app/modals/editar-tienda/editar-tienda.page';
import { TiendaQrPage } from 'src/app/modals/tienda-qr/tienda-qr.page';
import { Tienda } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.page.html',
  styleUrls: ['./tiendas.page.scss'],
})
export class TiendasPage implements OnInit {
  tiendas: Tienda[] = [ ];
  newTienda: Tienda[] = [{
    id:'',
    nombre: '',
      responsable:'',
      direccion: '',
      telefono:''
  }
  ];
  constructor(
    private firestore: FirestoreService,
    public modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.getTiendas();
  }

  getTiendas() {
    this.firestore.getTiendas<Tienda>('Tiendas/').subscribe((res) => {
      this.tiendas = res;
      console.log(res);
      
    });
  }
  deleteTienda(tienda: Tienda) {
    this.firestore.deleteTienda('Tiendas/', tienda.id);
  }
  async openModalTienda() {
    const modal = await this.modalController.create({
      component: AgregarTiendaPage,
      cssClass: 'class-modal',
    });
    return await modal.present();
  }
  async openModalEditarTienda(tienda:Tienda) {
    const modal = await this.modalController.create({
      component: EditarTiendaPage,
      cssClass: 'class-modal',
      componentProps:{
        'id':tienda.id,
        'nombre':tienda.nombre,
        'responsable':tienda.responsable,
        'direccion':tienda.direccion,
        'telefono':tienda.telefono,
        'editar':true
      }
    });
    return await modal.present();
  }
  async openModalTiendaQR(tienda:Tienda) {    
    const modal = await this.modalController.create({
      component: TiendaQrPage,
      cssClass: 'class-modal',
      componentProps:{
        'id':tienda.id,
        'nombre':tienda.nombre,
      }
      
    });
    return await modal.present();
  }
  async presentAlert(data:Tienda) {
    const alert = await this.alertController.create({
      header: '¿Esta seguro de eliminar?',
      mode:'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            
          },
        },
        {
          text: 'Eliminar',
          role: 'confirm',
          handler: () => {
              this.deleteTienda(data);   
          
          },
        },
      ],
    });

    await alert.present();

    
    
  }
}
