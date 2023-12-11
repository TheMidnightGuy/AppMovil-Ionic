import { Component, OnInit, inject } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import type { Animation } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { AlertController, AlertButton } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ConsumoAPIService} from '../services/consumo-api.service';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { doc , getDoc} from "firebase/firestore"
import Alumno from '../interfaces/alumno';








@Component({
  selector: 'app-curso',
  templateUrl: './curso.page.html',
  styleUrls: ['./curso.page.scss'],
})
export class CursoPage implements OnInit {


  usuarios : any;

  datos: any[];
  

    //Codigo QR - https://www.npmjs.com/package/angularx-qrcode

    qrString = 'Texto de prueba'

    constructor(private readonly firestore: Firestore , private router:Router, private activatedRouter: ActivatedRoute,private animationCtrl:AnimationController, private alertController: AlertController, private userService: ConsumoAPIService , public navCtrl: NavController ) {}




  



  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Clase',
      subHeader: '' ,
      message:  'Se ha registrado correctamente la clase ' ,
      buttons: ['OK'],
    });

    await alert.present();
  }

  public user = {
    usuario: "",
    password: ""
  }

  alumnos: Alumno[];

  ngOnInit(): void {
    this.userService.getAlumno().subscribe(alumnos => {
      this.alumnos = alumnos;
    })
  }




  //Cerrar sesion mediante boton
  onClick() {
    this.userService.logout()
    .then(() => {
      this.router.navigate(['/home'])
    })
    .catch(error => console.log(error));
  }

  //


}


  





