import { Component, OnInit } from '@angular/core';
import {
  ScannerQRCodeConfig,
  ScannerQRCodeSelectedFiles,
  NgxScannerQrcodeService,
  ScannerQRCodeResult
} from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements OnInit {

  public config: ScannerQRCodeConfig = {
    // deviceActive: 1,
    constraints: {
      audio: false,
      video: {}
    }
  };

  codigo: any;

  qrCodeResult: ScannerQRCodeSelectedFiles[] = [];
  qrCodeResult2: ScannerQRCodeSelectedFiles[] = [];

  constructor(private qrcode: NgxScannerQrcodeService) { }

  ngOnInit() {}

  public onEvent(res: any, action: any, fn: string): void {
    const respuesta = res[0]?.value;
    console.log(respuesta);
    if (respuesta != undefined) {
      console.log('Escaneado');

      if (res[0]?.value != undefined) {
        console.log('Escaneado');
        this.qrCodeResult2 = res;
        this.codigo = res[0]?.value;

      } else {
        console.log('No se pudo escannear');
      }

      action[fn]().subscribe(console.log, alert);
    }
  }

  public handle(action: any, fn: string): void {
    console.log(action,fn);
    action[fn]().subscribe(console.log, alert);
  }

  public onSelects2(files: any) {
    this.qrcode.loadFilesToScan(files, this.config).subscribe((res: any) => {
      if (res[0].data[0] != undefined) {
        console.log('Escaneado');
        this.qrCodeResult2 = res;
      } else {
        console.log('No se pudo escannear');
      }
    });
  }

}
