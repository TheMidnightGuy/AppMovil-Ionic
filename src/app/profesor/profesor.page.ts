import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import type { Animation } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { AlertController, AlertButton } from '@ionic/angular';

import { ConsumoAPIService } from '../services/consumo-api.service';
import { Auth } from '@angular/fire/auth';


@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {

  private animation!:Animation;


  constructor(private router:Router, private activatedRouter: ActivatedRoute,private animationCtrl:AnimationController, private alertController: AlertController, private userService: ConsumoAPIService, public auth: Auth  ) {}

  
  

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Clase',
      subHeader: '' ,
      message:  'Se ha registrado correctamente la clase ' ,
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



  //lista de alumnos presentes
  alumnosPresentes: any[];

  //correo de usuario actual
  correo: string | null | undefined;

  ngOnInit() {
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

}
