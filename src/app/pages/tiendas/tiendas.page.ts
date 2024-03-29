import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AgregarTiendaPage } from 'src/app/modals/agregar-tienda/agregar-tienda.page';
import { EditarTiendaPage } from 'src/app/modals/editar-tienda/editar-tienda.page';
import { TiendaQrPage } from 'src/app/modals/tienda-qr/tienda-qr.page';
import { Tienda } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { PrintService } from 'src/app/services/print.service';

@Component({
  selector: 'app-tiendas',
  templateUrl: './tiendas.page.html',
  styleUrls: ['./tiendas.page.scss'],
})
export class TiendasPage implements OnInit {
  impresion=0;
  bluetoothList:any=[];
  selectedPrinter:any;
  tiendas: Tienda[] = [ ];
  TiendaBuscada: any;
  newTienda: Tienda[] = [{
    id:'',
    nombre: '',
      responsable:'',
      direccion: '',
      telefono:'',
      debe:'',
      cantidad_debe:0
  }
  
  ];
  constructor(
    private print:PrintService,
    private firestore: FirestoreService,
    public modalController: ModalController,
    private alertController: AlertController
  ) {
    
   }

  ngOnInit() {
    this.getTiendas();
  }

  getTiendas() {
    this.firestore.getTiendas<Tienda>('Tiendas/').subscribe((res) => {
      this.tiendas = res;
      this.TiendaBuscada=this.tiendas;
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
  buscarTienda(event:any){
    const text= event.target.value;    
    if (text && text.trim()!='') {
      this.TiendaBuscada=this.tiendas.filter((tienda:any)=>{
        return(tienda.nombre.toLowerCase().indexOf(text.toLowerCase())>-1)
      })
    }else{
      this.TiendaBuscada=this.tiendas;
    }
  }
  //impresion
  //Enlista los dispositivos
 listPrinter() { 
  this.print.searchBluetoothPrinter()
   .then(resp=>{

    //Lista de dispositivos bluetooth
    this.bluetoothList=resp;
});
}
//guarda la direccion mac de la impresora
selectPrinter(macAddress:any){
//direccion mac de la impresora seleccionada
this.selectedPrinter=macAddress;
}

//Esto imprimira
printStuff(){  
//El texto que quieres imprimir
var myText="Hola esta es una pequeña prueba \n\n\n un pequeño texto\n\n\n";
this.print.sendToBluetoothPrinter(this.selectedPrinter,myText);
}
}
