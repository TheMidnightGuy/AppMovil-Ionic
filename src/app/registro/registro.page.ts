import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras , Router } from '@angular/router';
import { IonModal } from '@ionic/angular';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;

  constructor(private router: Router) { }


  public mensaje = ""

  user = {
    usuario: "",
    contrasena: ""
  }

  enviarInformacion() {
    if (this.user.usuario != "") {
      let navigationExtras: NavigationExtras = {
        state: { user: this.user }
      }
      this.router.navigate(['/login'], navigationExtras);
    } else {
      this.mensaje = "Datos no validos, intente denuevo";
    }
  }

  confirm() {
    this.mensaje="Registro Exitoso"
    this.modal.dismiss(this.user.usuario, 'confirm');
  }


  ngOnInit() {
  }

}
