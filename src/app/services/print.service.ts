import { Injectable } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { IonImg } from '@ionic/angular';
import { url } from 'inspector';
import { fileURLToPath, URL } from 'url';
 
@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor(public btSerial:BluetoothSerial) { }
  searchBluetoothPrinter()
{
//This will return a list of bluetooth devices
   return this.btSerial.list(); 
}
connectToBluetoothPrinter(macAddress:any)
{
//This will connect to bluetooth printer via the mac address provided
   return this.btSerial.connect(macAddress)
}
disconnectBluetoothPrinter()
{
//This will disconnect the current bluetooth connection
   return this.btSerial.disconnect();
   
}
//macAddress->the device's mac address 
//data_string-> string to be printer
sendToBluetoothPrinter(macAddress:any,data_string:any)
{
   var img = new Image();
img.src ="https://utvco.edu.mx/w/wp-content/uploads/2022/05/LOGO-HALCONES.png";
   //1. Try connecting to bluetooth printer
   this.connectToBluetoothPrinter(macAddress)
   .subscribe(_=>{
      //2. Connected successfully
      this.btSerial.write(data_string)
      .then(_=>{
       //3. Print successful
       //If you want to tell user print is successful,
       //handle it here
       //4. IMPORTANT! Disconnect bluetooth after printing
       this.disconnectBluetoothPrinter()
       },err=>{
         //If there is an error printing to bluetooth printer
         //handle it here
       })
   },err=>{
     
     //If there is an error connecting to bluetooth printer
     //handle it here
   })
}
}
