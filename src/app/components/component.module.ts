import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component'; 
import { RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';

@NgModule({
    declarations:[
        MenuComponent,
        PerfilComponent
    ],
    exports:[
        MenuComponent
    ],
    imports:[
        CommonModule,
        IonicModule,
        RouterModule
    ]
})

export class ComponentsModule{}