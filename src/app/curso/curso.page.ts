import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import type { Animation } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { AlertController, AlertButton } from '@ionic/angular';
import {ConsumoAPIService} from '../services/consumo-api.service';
import { NavController } from '@ionic/angular';



//importar LocalStorage
//import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-curso',
  templateUrl: './curso.page.html',
  styleUrls: ['./curso.page.scss'],
})
export class CursoPage implements OnInit {

  public usuarios = [
    { id: 1, name: 'Usuario1' },
    { id: 2, name: 'Usuario2' },
    // Otros usuarios...
  ];
  

    //Codigo QR - https://www.npmjs.com/package/angularx-qrcode

    qrString = 'Texto de prueba'

    constructor(private router:Router, private activatedRouter: ActivatedRoute,private animationCtrl:AnimationController, private alertController: AlertController, public proveedor: ConsumoAPIService , public navCtrl: NavController ) {}

  /*
  ionViewDidLoad(){
    this.proveedor.obtenerDatos()
    .subscribe(
    (data)=> {this.usuarios = data;},
    (error)=>{console.log(error);}
    )
  }
  */

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
