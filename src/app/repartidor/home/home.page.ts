import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Pedido, Tienda, Usuarios } from 'src/app/models/models';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { User } from 'src/app/shared/user.class';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnDestroy {
  private pedido:Pedido={
    id:'',
    tienda:'',
    productos:[],
    precioTotal:0,
    fecha:new Date()
  }
  tienda_escaneada: any;
  document:any;
  path='';
  visible='show';
  user: User = new User();
  login:boolean =false;
  datos:Usuarios={
    uid:'',
    nombre:'',
    telefono:'',
    activo:'',
    apellido_paterno:'',
    apellido_materno:'',
    correo:'',
    contra:'',
    rol:''
  }
  constructor(public authSvc: FirebaseauthService,private router: Router, private experiencia: ExperienciaService, private firestoreService:FirestoreService) {
    this.authSvc.stateUser().subscribe(res=>{
      if (res) {
        
        this.login=true;
        this.getDatosUser(res.uid);
      }else{
      
        this.login=false;
      }
    })
    this.visible='show';
  }
 
  getDatosUser(uid:any){
    const path='Usuarios';
    const id=uid;
   this.firestoreService.getDoc<Usuarios>(path,id).subscribe(res=>{
   
    if (res) {
      this.datos=res;
    }
   })

  }
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
    this.visible='hidden';
    try {
      const permission = await this.checkPermission();
      if (!permission) {
        return console.log('hay permiso');
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body')?.classList.add('scanner-active');
      
      const result = await BarcodeScanner.startScan();
      console.log(result);
      
      BarcodeScanner.showBackground();
      if (result?.hasContent) {
        this.tienda_escaneada = result.content;
        document.querySelector('body')?.classList.remove('scanner-active');
        console.log(this.tienda_escaneada);
        this.CodigoEscaneado();
      }
    } catch (error) {
      console.log("Este es el error",error);
      this.stopScan();
      this.experiencia.presentToast("Error intentelo de nuevo");
    }
  }
  CodigoEscaneado() {
    this.visible='show';
    this.pedido.id=this.datos.uid;
    this.pedido.tienda=this.tienda_escaneada;
    const tienda= this.firestoreService.getDoc<Tienda>('Tiendas/',this.tienda_escaneada);

    if (tienda) {
      this.firestoreService.createDoc(this.pedido,'Usuarios/'+this.datos.uid+'/Carrito/',this.datos.uid)
      this.router.navigateByUrl('tabs/tab2');
      this.experiencia.presentToast('Escaneado con exito');
    } else {
      this.stopScan();
      this.experiencia.presentToast("Vuelva a intentarlo")
    }
   
  
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
