import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import type { Animation } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { AlertController, AlertButton } from '@ionic/angular';

import { BarcodeScanner} from '@capacitor-community/barcode-scanner';
import { async } from '@angular/core/testing';

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


  //Preparar escaneo - codigo QR
  async prepare () {
    BarcodeScanner.prepare();
  };
  
  //Iniciar escaneo - codigo QR
  async startScan () {
    BarcodeScanner.hideBackground();
    const result = await BarcodeScanner.startScan();
    if (result.hasContent) {
      console.log(result.content);

      this.presentAlert(); //Si se escaneo correctamente muestra una alerta de confirmacion de asistencia
    }
  };

  //Detener escaneo - codigo QR
  async stopScan () {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  };

  //Preguntar por escaneo - codigo QR
  async askUser () {
    this.prepare();

    const c = confirm('Quieres escanear un codigo QR?');

    if (c) {
      this.startScan();
    } else {
      this.stopScan();
    }
  };
  




  //Alerta de alumno presente
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