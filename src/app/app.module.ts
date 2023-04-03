import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormsModule } from '@angular/forms';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ComponentsModule } from './components/component.module';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import {BluetoothSerial} from '@ionic-native/bluetooth-serial/ngx';




@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(),
     AppRoutingModule,AngularFireModule.initializeApp(environment.firebaseConfig),
     AngularFireAuthModule,FormsModule,AngularFireStorageModule,ComponentsModule, NgxScannerQrcodeModule
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BluetoothSerial],
  bootstrap: [AppComponent],
})
export class AppModule {}
