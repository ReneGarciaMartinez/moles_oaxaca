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

  qrCodeString:string="este codigo secreto";

  

  constructor() { }

  ngOnInit() {}

  

}
