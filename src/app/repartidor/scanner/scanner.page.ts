import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  qrCodeString:string="codigo secreto";
  constructor() { }

  ngOnInit() {
  }

}
