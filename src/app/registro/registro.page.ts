import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationExtras , Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { ConsumoAPIService } from '../services/consumo-api.service';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formReg: FormGroup;

  @ViewChild(IonModal) modal!: IonModal;

  constructor(private router: Router, private userService: ConsumoAPIService ) { 
    //Registro de usuarios
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }


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


  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.registro(this.formReg.value)
     .then(response => {
      console.log(response);
      this.router.navigate(['/login']);
     })
     .catch(error => console.log(error));
  }

}
