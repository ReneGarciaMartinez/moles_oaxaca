import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnDestroy {
  resultadoEscaner: any;
  document:any;

  constructor(private router: Router) {}

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
        return;
      }
      await BarcodeScanner.hideBackground();
      this.document.querySelector('body').classList.add('scanner-active');
      const result = await BarcodeScanner.startScan();
      console.log(result);
      if (result?.hasContent) {
        this.resultadoEscaner = result.content;
        console.log(this.resultadoEscaner);
        BarcodeScanner.showBackground();
        this.document.querySelector('body').classList.remove('scanner-active');
      }
    } catch (error) {
      console.log(error);
      this.stopScan();
    }
  }
  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  }

  ngOnDestroy():void {
    this.stopScan();
  }

  levantarPedido() {
    this.router.navigateByUrl('tabs/tab2');
  }
}
