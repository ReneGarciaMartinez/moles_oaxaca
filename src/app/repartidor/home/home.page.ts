import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { FirestoreService } from 'src/app/services/firestore.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnDestroy {
  resultadoEscaner: any;
  document:any;
  path='';
  visible:string='show';

  constructor(private router: Router, private experiencia: ExperienciaService, private firestoreService:FirestoreService) {}

  async checkPermission(): Promise<boolean | any> {
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        //el usuario dio permisos
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
    }
  }



  async startScan() {
    
    try {
      const permission = await this.checkPermission();
      if (!permission) {
        return console.log('hay permiso');
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body')?.classList.add('scanner-active');
      this.visible='hidden';
      const result = await BarcodeScanner.startScan();
      console.log(result);
      this.visible='show';
      BarcodeScanner.showBackground();
      if (result?.hasContent) {
        this.resultadoEscaner = result.content;
        document.querySelector('body')?.classList.remove('scanner-active');
        console.log(this.resultadoEscaner);
        this.CodigoEscaneado();
      }
    } catch (error) {
      console.log("Este es el error",error);
      this.stopScan();
    }
  }
  CodigoEscaneado() {
    this.router.navigateByUrl('tabs/tab2');
    this.experiencia.presentToast('Escaneado con exito');
  
  }
  stopScan() {
    this.visible='show';
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.remove('scanner-active');
  }

  ngOnDestroy():void {
    this.stopScan();
  }

  levantarPedido() {
    this.router.navigateByUrl('tabs/tab2');
  }
}
