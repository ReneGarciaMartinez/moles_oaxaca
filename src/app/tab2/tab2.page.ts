import { Component } from '@angular/core';
import { Interface } from 'readline';
import { Chocolates, Moles } from '../models/models';
import { CarritoService } from '../services/carrito.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  valueSelected: string = 'moles';

  moles:Moles[]=[];
  

  chocolates:Chocolates[]=[];


  constructor(private firestore: FirestoreService,private carritoService:CarritoService) {}
  ngOnInit(): void {
    this.getMoles();
    this.getChocolates();
  }
  

  segmentChanged(event: any) {
    this.valueSelected = event.detail.value;
  }
  
  getMoles() {
    this.firestore.getMoles<Moles>('Moles/').subscribe(res=>{
      this.moles=res;
      
    })
  }
  getChocolates() {
    this.firestore.getChocolates<Moles>('Chocolates/').subscribe(res=>{
      this.chocolates=res;
      
    })
  }
  addCarritoMole(mole:Moles){
    this.carritoService.addProducto(mole);
    this.firestore.getCarri();
  }
}
