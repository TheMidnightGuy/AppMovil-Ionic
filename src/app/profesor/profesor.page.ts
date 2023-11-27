import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import type { Animation } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { AlertController, AlertButton } from '@ionic/angular';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {

  private animation!:Animation;


  constructor(private router:Router, private activatedRouter: ActivatedRoute,private animationCtrl:AnimationController, private alertController: AlertController ) {}

  
  

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

  public user = {
    usuario: "",
    password: ""
  }

  //lista de alumnos presentes
  alumnosPresentes: any[];


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
