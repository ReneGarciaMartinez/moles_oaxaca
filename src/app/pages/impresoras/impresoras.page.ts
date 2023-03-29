import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { PrintService } from 'src/app/services/print.service';

@Component({
  selector: 'app-impresoras',
  templateUrl: './impresoras.page.html',
  styleUrls: ['./impresoras.page.scss'],
})
export class ImpresorasPage implements OnInit {
  bluetoothList:any=[];
  selectedPrinter:any;
  constructor(private print:PrintService, public router:Router, public experiencia:ExperienciaService) { 
    this.listPrinter();
  }
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
  ngOnInit() {
this.experiencia.presentToast('Elija una impresora para continuar')
  }

}
