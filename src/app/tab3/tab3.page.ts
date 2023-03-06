import { Component } from '@angular/core';
import { Moles, Pedido, ProductoPedido, Tienda, Usuarios } from '../models/models';
import { CarritoService } from '../services/carrito.service';
import { FirestoreService } from '../services/firestore.service';
import { AlertController, PopoverController } from '@ionic/angular';
import { User } from '../shared/user.class';
import { FirebaseauthService } from '../services/firebaseauth.service';
import { Router } from '@angular/router';
import { ExperienciaService } from '../services/experiencia.service';

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
    fecha:new Date()
  }
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
  uid = '';
  constructor(
    public authSvc: FirebaseauthService,
    private firestore: FirestoreService,
    private carritoService: CarritoService,
    public popoverController: PopoverController,
    public router:Router,
    private alertController: AlertController,
    private experiencia:ExperienciaService
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
eliminarCarrito(){
  this.carritoService.deleteCarrito('Usuarios/'+this.uid+'/Carrito',this.uid);
  this.router.navigateByUrl('/home');
  this.experiencia.presentToast('Pedido cancelado')
  
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
            this.eliminarCarrito();   
        
        },
      },
    ],
  });

  await alert.present();

  
  
}
  CompraContado(){
    // console.log("estamos en la funcion Compra de contado");
    // this.pedidos.precioTotal=this.precioTotal;
    // console.log("pedidos:",this.pedidos);
    
    // console.log("precio Total;",this.precioTotal);
    
    
    
  }
}
