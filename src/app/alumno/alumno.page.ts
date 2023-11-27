import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import type { Animation } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { AlertController, AlertButton } from '@ionic/angular';

import { BarcodeScanner } from '@capacitor-community/barcode-scanner';


@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  //Codigo QR - https://www.npmjs.com/package/angularx-qrcode

  qrString = 'Texto de prueba'

  private animation!:Animation;


  constructor(private router:Router, private activatedRouter: ActivatedRoute,private animationCtrl:AnimationController, private alertController: AlertController ) {}

  /*
  //Iniciar escaneo codigo QR
  startScan(){
    const startScan = async () => {
      // Check camera permission
      // This is just a simple example, check out the better checks below
      await BarcodeScanner.checkPermission({ force: true });
    
      // make background of WebView transparent
      // note: if you are using ionic this might not be enough, check below
      BarcodeScanner.hideBackground();
    
      const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
    
      // if the result has content
      if (result.hasContent) {
        console.log(result.content); // log the raw scanned content
      }
  }
  */
  
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Asistencia',
      subHeader: '' ,
      message:  'Se ha registrado correctamente su asistencia' ,
      buttons: ['OK'],
    });

    await alert.present();
  }
  

  public informacion = {
    nombre: "",
    apellido: "",
    nivel: "",
    fecha: ""
  }

  public mensaje = ""

  public user = {
    usuario: "",
    password: ""
  }


  ngOnInit() {
    this.activatedRouter.queryParams.subscribe(() => {
      let state = this.router.getCurrentNavigation()?.extras.state;
      if (state) {
        this.user.usuario = state['user'].usuario;
        this.user.password = state['user'].password;
        console.log(this.user);
      }
    })
  }

}