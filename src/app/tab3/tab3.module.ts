import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Tab3PageRoutingModule } from './tab3-routing.module';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { ComponentsModule } from '../components/component.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab3PageRoutingModule,
    NgxScannerQrcodeModule,
    ComponentsModule
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
