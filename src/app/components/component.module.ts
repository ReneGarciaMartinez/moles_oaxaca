import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component'; 
import { RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { ItemCarritoComponent } from './item-carrito/item-carrito.component';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { ScannerComponent } from './scanner/scanner.component';

@NgModule({
    declarations:[
        MenuComponent,
        PerfilComponent,
        ItemCarritoComponent,
        ScannerComponent
    ],
    exports:[
        MenuComponent,
        ItemCarritoComponent,
        ScannerComponent
    ],
    imports:[
        CommonModule,
        IonicModule,
        RouterModule,
        NgxScannerQrcodeModule
    ]
})

export class ComponentsModule{}