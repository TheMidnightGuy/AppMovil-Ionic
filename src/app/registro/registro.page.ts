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


  ngOnInit(): void {
  }

  //Metodo para boton de formulario
  onSubmit() {
    this.userService.registro(this.formReg.value)
     .then(response => {
      console.log(response);
      this.router.navigate(['/login']);
      console.log("Registro de usuario exitoso")
     })
     .catch(error => console.log(error));
     this.mensaje = "Datos no validos, intente denuevo";
     console.log("Datos no validos, intente denuevo")
  }

}
