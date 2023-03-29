import { Component } from '@angular/core';
import { Moles, Pedido, ProductoPedido, Tienda, Usuarios } from '../models/models';
import { CarritoService } from '../services/carrito.service';
import { FirestoreService } from '../services/firestore.service';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { User } from '../shared/user.class';
import { FirebaseauthService } from '../services/firebaseauth.service';
import { Router } from '@angular/router';
import { ExperienciaService } from '../services/experiencia.service';
import { CompraCreditoPage } from '../pages/compra-credito/compra-credito.page';
import { PrintService } from '../services/print.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {

  count = 0;
  datos_tienda: Tienda = {
    id:'',
    nombre: '',
      responsable:'',
      direccion: '',
      telefono:''
  };
 pedido:Pedido={
    id:'',
    tienda:'',
    productos:[],
    precioTotal:0,
    fecha:new Date(),
    repartidor:''
  }
  productos:any=[];
  pedidos: any;
  all: any;
  precioTotal = 0;
  user: User = new User();
  login:boolean =false;
  datos:Usuarios={
    uid:'',
    nombre:'',
    apellido_paterno:'',
    apellido_materno:'',
    correo:'',
    contra:'',
    rol:'',
    telefono:'',
    activo:'',
  }
  bluetoothList:any=[];
  selectedPrinter:any;
  impresion=0;
  uid = '';
  constructor(
    public authSvc: FirebaseauthService,
    private firestore: FirestoreService,
    private carritoService: CarritoService,
    public popoverController: PopoverController,
    public router:Router,
    private alertController: AlertController,
    private experiencia:ExperienciaService,
    public modalController:ModalController,
    private print:PrintService,
  ) {
    this.precioTotal = 0;
    this.loadCarrito();
    
    this.authSvc.stateUser().subscribe(res=>{
      if (res) {
        
        this.login=true;
        this.getDatosUser(res.uid);
      }else{
      
        this.login=false;
      }
    })
  }
  getDatosUser(uid:any){
    const path='Usuarios';
    const id=uid;
   this.firestore.getDoc<Usuarios>(path,id).subscribe(res=>{
   
    if (res) {
      this.datos=res;
      this.uid=this.datos.uid;
    }
   })

  }
  ngOnInit() {}
  getTienda(id:any){
    this.firestore.getDoc<Tienda>('Tiendas',id).subscribe((res:any)=>{
      console.log(res);
      this.datos_tienda=res;

    })
  }
  loadCarrito() {
    this.precioTotal = 0;
    this.firestore.getCarri().subscribe((res: any) => {
      this.pedidos = res.productos;

      this.all = res;
      const tienda_id=this.all.tienda;
      console.log('este es el id',tienda_id);
      this.getTienda(tienda_id);
      let suma = 0;
      let precio = 0;
      // console.log('precio total:', this.precioTotal);
      for (let index = 0; index < this.pedidos.length; index++) {
        precio = 0;
        precio = this.pedidos[index].producto.precio * this.pedidos[index].cantidad;
        suma = suma + precio;
      }
      this.precioTotal = suma;
    });
    
  }

  async increment(id: any, cantidad: number, i: any) {
    this.pedidos[i].cantidad = this.pedidos[i].cantidad + 1;
    const path = 'Usuarios/'+this.uid+'/Carrito/';
    this.precioTotal = 0;
    this.firestore
      .updateCarri(this.all, path, this.uid)
      .then((res) => {
        console.log(id + 'Actualizado');
        this.precioTotal = 0;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  decrement(id: any, cantidad: number, i: any) {
    this.pedidos[i].cantidad = this.pedidos[i].cantidad - 1;
    this.precioTotal = 0;
    if (this.pedidos[i].cantidad <= 0) {
      this.removeCarrito(this.pedidos[i].producto, i);
    } else {
      const path = 'Usuarios/'+this.uid+'/Carrito/';
      this.firestore
        .updateCarri(this.all, path, this.uid)
        .then((res) => {
          console.log(id + 'Actualizado');
          this.precioTotal = 0;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  removeCarrito(producto: any, index: any) {
    this.carritoService.removeProducto(producto, index);
    this.precioTotal = 0;
  }
eliminarCarrito(dato:any){
  this.carritoService.deleteCarrito('Usuarios/'+this.uid+'/Carrito',this.uid);
  this.router.navigateByUrl('/home');
  this.experiencia.presentToast(dato)
  
}

async presentAlert() {
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
            this.eliminarCarrito('Pedido cancelado');   
        
        },
      },
    ],
  });

  await alert.present();

  
  
}
  CompraContado(){
    console.log("estamos en la funcion Compra de contado");
    this.pedidos.precioTotal=this.precioTotal;
    this.pedido.productos=this.pedidos;
    this.pedido.precioTotal=this.precioTotal;
    this.pedido.tienda=this.datos_tienda.nombre;
    this.pedido.repartidor=this.datos.nombre+' '+this.datos.apellido_paterno+' '+this.datos.apellido_materno;
    console.log("pedidos:",this.pedido);
    
    console.log("precio Total;",this.precioTotal);
  
   
    this.impresion=1;
    this.experiencia.presentToast('Selecciona una impresora');
    this.listPrinter(); 
    
    
  }
  async compraCredito(){
    const modal = await this.modalController.create({
      component: CompraCreditoPage,
      cssClass: 'class-modal',
    });
    return await modal.present();
    
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
var myText=this.pedido.fecha+"\n\n\n cliente: "+
this.pedido.tienda+"\n\n\n Repartidor: "+
this.pedido.repartidor+"\n\n\n"+
"-----------Productos-----------"
+"\n\n\n"+"Cantidad |  Producto  | Precio U. ";
for (let index = 0; index < this.pedidos.length; index++) {
  const element = this.pedidos[index];
  myText=myText+"\n\n\n"+element.cantidad+"  |"+element.producto.nombre+element.producto.descripcion+"|  $"+element.producto.precio+".00"
  
}
var img = new Image();
img.src ="https://utvco.edu.mx/w/wp-content/uploads/2022/05/LOGO-HALCONES.png";

myText=myText+"\n\n\n Total: $"+this.pedidos.precioTotal+"\n\n\n Gracias por su compra :) \n\n\n ";
this.print.sendToBluetoothPrinter(this.selectedPrinter,myText);
this.router.navigateByUrl('tabs/tab1');
const id_nuevo =this.firestore.getId();
this.pedido.id=id_nuevo;
this.firestore.createPedido(this.pedido,'Pedidos',id_nuevo)
this.eliminarCarrito('Imprimiendo....'); 
}
}
