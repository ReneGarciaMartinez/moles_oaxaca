import { Component } from '@angular/core';
import { Moles, Pedido, ProductoPedido } from '../models/models';
import { CarritoService } from '../services/carrito.service';
import { FirestoreService } from '../services/firestore.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {

  count = 0;
  // pedido:Pedido[]=[];
  pedido: any;
  pedidos: any;
  all: any;
  precioTotal = 0;
  uid = 'aEAj6Ik5BGcBf6cq1GrV7q95IM73';
  constructor(
    private firestore: FirestoreService,
    private carritoService: CarritoService,
    public popoverController: PopoverController,
  ) {
    this.precioTotal = 0;
    this.loadCarrito();
  }
  ngOnInit() {}
  loadCarrito() {
    this.precioTotal = 0;
    this.firestore.getCarri().subscribe((res: any) => {
      console.log('esta es la respuesta de load', res);

      this.pedidos = res.productos;
      this.all = res;
      let suma = 0;
      let precio = 0;
      console.log('precio:', precio);
      console.log('suma:', suma);
      // console.log('precio total:', this.precioTotal);
      for (let index = 0; index < this.pedidos.length; index++) {
        precio = 0;
        precio = this.pedidos[index].producto.precio * this.pedidos[index].cantidad;
        suma = suma + precio;
        console.log('suma:', suma);
        console.log('precio:', precio);
      }
      this.precioTotal = suma;
      console.log('precio total:', this.precioTotal);
    });
  }

  async increment(id: any, cantidad: number, i: any) {
    this.pedidos[i].cantidad = this.pedidos[i].cantidad + 1;
    const path = 'Usuarios/aEAj6Ik5BGcBf6cq1GrV7q95IM73/Carrito/';
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
      const path = 'Usuarios/aEAj6Ik5BGcBf6cq1GrV7q95IM73/Carrito/';
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
  async abrirPopover(e: Event) {}
}
