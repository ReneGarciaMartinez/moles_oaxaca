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
  MoleBuscado:any;
  ChocolateBuscado:any;
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
      this.MoleBuscado=this.moles;
      
    })
  }
  getChocolates() {
    this.firestore.getChocolates<Moles>('Chocolates/').subscribe(res=>{
      this.chocolates=res;
      this.ChocolateBuscado=this.chocolates;
    })
  }
  addCarritoMole(mole:Moles){
    this.carritoService.addProducto(mole);
   
  }
  buscador(event:any){
    const text= event.target.value;  
    if (this.valueSelected=='moles') {
        if (text && text.trim()!='') {
      this.MoleBuscado=this.moles.filter((mole:any)=>{
        return(mole.nombre.toLowerCase().indexOf(text.toLowerCase())>-1)
      })
    }else{
      this.MoleBuscado=this.moles;
    }
    } else {
      if (text && text.trim()!='') {
        this.ChocolateBuscado=this.chocolates.filter((chocolate:any)=>{
          return(chocolate.nombre.toLowerCase().indexOf(text.toLowerCase())>-1)
        })
      }else{
        this.ChocolateBuscado=this.chocolates;
      }
    }  
  
  }
  // buscarChocolate(event:any){
  //   const text= event.target.value;    
  //   if (text && text.trim()!='') {
  //     this.ChocolateBuscado=this.chocolates.filter((chocolate:any)=>{
  //       return(chocolate.nombre.toLowerCase().indexOf(text.toLowerCase())>-1)
  //     })
  //   }else{
  //     this.ChocolateBuscado=this.chocolates;
  //   }
  // }
}
