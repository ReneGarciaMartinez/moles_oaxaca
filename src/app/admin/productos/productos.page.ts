import { Component, OnInit, ViewChild } from '@angular/core';
import { Chocolates, Moles } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AlertController, IonModal, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AgregarProductoPage } from '../modals/agregar-producto/agregar-producto.page';
import { AgregarChocolatePage } from '../modals/agregar-chocolate/agregar-chocolate.page';
import { EditarMolePage } from 'src/app/admin/modals/editar-mole/editar-mole.page';
import { EditarChocolatePage } from '../modals/editar-chocolate/editar-chocolate.page';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  valueSelected: string = 'moles';

  moles: Moles[] = [ ];
  newMole: Moles[] = [{
    id:'',
    nombre: '',
      precio: 0,
      descripcion:'',
      img: ''
  }
  ];

  chocolates: Chocolates[] = [];

  constructor(
    private firestore: FirestoreService,
    public modalController: ModalController,
    private alertController: AlertController
  ) {}
  ngOnInit(): void {
    this.getMoles();
    this.getChocolates();
  }

  segmentChanged(event: any) {
    this.valueSelected = event.detail.value;
  }

  getMoles() {
    this.firestore.getMoles<Moles>('Moles/').subscribe((res) => {
      this.moles = res;
    });
  }
  getChocolates() {
    this.firestore.getChocolates<Chocolates>('Chocolates/').subscribe((res) => {
      this.chocolates = res;
    });
  }
  deleteMole(mole: Moles) {
    this.firestore.deleteMole('Moles/', mole.id);
  }
  deleteChocolate(chocolate: Chocolates) {
    this.firestore.deleteChocolate('Chocolates/', chocolate.id);
  }
  
  //modals
  async openModalMole() {
    const modal = await this.modalController.create({
      component: AgregarProductoPage,
      cssClass: 'class-modal',
    });
    return await modal.present();
  }
  async openModalEditarMole(mole:Moles) {
    const modal = await this.modalController.create({
      component: EditarMolePage,
      cssClass: 'class-modal',
      componentProps:{
        'id':mole.id,
        'nombre':mole.nombre,
        'precio':mole.precio,
        'descripcion':mole.descripcion,
        'img':mole.img,
        'editar':true
      }
    });
    return await modal.present();
  }
  async openModalEditarChocolate(chocolate:Chocolates) {
    const modal = await this.modalController.create({
      component: EditarChocolatePage,
      cssClass: 'class-modal',
      componentProps:{
        'id':chocolate.id,
        'nombre':chocolate.nombre,
        'precio':chocolate.precio,
        'descripcion':chocolate.descripcion,
        'img':chocolate.img,
        'editar':true
      }
    });
    return await modal.present();
  }

  async openModalChocolate() {
    const modal = await this.modalController.create({
      component: AgregarChocolatePage,
      cssClass: 'class-modal',
    });
    return await modal.present();
    
  }
  //alert
  async presentAlert(data:Moles,opcion:'mole'|'chocolate') {
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
            if (opcion='mole') {
              this.deleteMole(data);
            }
             if(opcion='chocolate'){
              this.deleteChocolate(data);
            }
          
          },
        },
      ],
    });

    await alert.present();

    
    
  }
 
}
