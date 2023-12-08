import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import type { Animation } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { AlertController, AlertButton } from '@ionic/angular';

import { BarcodeScanner} from '@capacitor-community/barcode-scanner';
import { async } from '@angular/core/testing';

import { ConsumoAPIService } from '../services/consumo-api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import Alumno from '../interfaces/alumno';


@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  //Codigo QR - https://www.npmjs.com/package/angularx-qrcode

  qrString = 'Texto de prueba'

  private animation!:Animation;

  formAlumno: FormGroup;

  scanActive: boolean = false;

  constructor(private router:Router, private activatedRouter: ActivatedRoute,private animationCtrl:AnimationController, private alertController: AlertController, private userService: ConsumoAPIService, public auth: Auth ) {

    this.formAlumno = new FormGroup({
      nombre: new FormControl(),
      apellido: new FormControl(),
      asistencia: new FormControl()
    })
  }

  

  // ----- INICIO SECCION QR -----

  async checkPermission() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        BarcodeScanner.openAppSettings();
        resolve(false);
      }
    });
  }

  async startScanner() {
    const allowed = await this.checkPermission();

    if (allowed) {
      this.scanActive = true;
      BarcodeScanner.hideBackground();

      const result = await BarcodeScanner.startScan();

      if (result.hasContent) {
        this.scanActive = false;
        alert(result.content); //The QR content will come out here
        //Handle the data as your heart desires here
      } else {
        alert('NO DATA FOUND!');
      }
    } else {
      alert('NOT ALLOWED!');
    }
  }

  stopScanner() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

  ionViewWillLeave() {
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }


  /*
      async checkPermission() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        BarcodeScanner.openAppSettings();
        resolve(false);
      }
    });
  }

  
    checkPermission = async () => {
    // check or request permission
    const status = await BarcodeScanner.checkPermission({ force: true });
  
    if (status.granted) {
      // the user granted permission
      return true;
    }
  
    return false;
  };

  

  //Preparar escaneo - CODIGO QR
  async prepare () {
    BarcodeScanner.prepare();
  };
  
  //Iniciar escaneo - CODIGO QR
  async startScan () {
    BarcodeScanner.hideBackground();
    const result = await BarcodeScanner.startScan();
    
    if (result.hasContent) {
      console.log(result.content);

      this.presentAlert(); //Si se escaneo correctamente muestra una alerta de confirmacion de asistencia
    }
  };

  //Detener escaneo - CODIGO QR
  async stopScan () {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  };

  //Preguntar por escaneo - CODIGO QR
  async askUser () {
    this.prepare();

    const c = confirm('Quieres escanear un codigo QR?');

    if (c) {
      this.startScan(); //si se confirma, abre la camara y comienza el escaneo 
      console.log("Iniciando Escaneo...")
    } else {
      this.stopScan(); //de lo contrario vuelve a la pagina actual
      console.log("No se dieron los permisos para iniciar un escaneo")
      this.router.navigate(['/alumno'])
    }
  };

  */
  // ----- FIN SECCION QR -----
  
  



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
  
  alumnos: Alumno[];

  //correo de usuario actual
  correo: string | null | undefined;

  ngOnInit(): void {
    //Obtener alumnos
    this.userService.getAlumno().subscribe(alumnos => {
      this.alumnos = alumnos;
    });

    //obtener usuario actual
    this.correo = this.auth.currentUser?.email;
  }

  

  //Cerrar sesion mediante boton
  onClick() {
    this.userService.logout()
    .then(() => {
      this.router.navigate(['/home'])
    })
    .catch(error => console.log(error));
  }


  //Boton de formulario de asistencia alumno
  async onSubmit() {
    console.log(this.formAlumno.value)
    const response = await this.userService.addAlumno(this.formAlumno.value);
    console.log(response);
    console.log("Asistencia registrada!")
  }

  //Recupera los datos del inicio de sesion y muestra el usuario que inicio sesion
  
  

}