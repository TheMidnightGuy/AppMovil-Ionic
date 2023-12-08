import { Component, OnInit } from '@angular/core';
import { NavigationExtras , Router } from '@angular/router';
import type { Animation } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { AuthGuard } from '../guard/auth.guard';
import { FormControl, FormGroup } from '@angular/forms';
import { ConsumoAPIService } from '../services/consumo-api.service';
import { User } from 'firebase/auth';
import Alumno from '../interfaces/alumno';





@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private animation!:Animation;

  formLogin: FormGroup;

  constructor(private router: Router,private animationCtrl:AnimationController,private auth:AuthGuard, private userService: ConsumoAPIService) {
    //Inicio de sesion 
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    }) 
   }



  public mensaje = ""


  ngOnInit(): void {
  }

  //Validar login - profesor/alumno (Firebase) 
  onSubmit() {
    this.userService.login(this.formLogin.value)
      .then(response => {
        const email = response.user.email;
        if (email !== "profesor@gmail.com") {
          this.router.navigate(['alumno']);
          console.log("Bienvenido Alumno!")
        } else if (email === "profesor@gmail.com") {
          this.router.navigate(['profesor']);
          console.log("Bienvenido Profesor!")
        }
      })
      .catch(error => {
        console.log(error);
        this.mensaje = "Datos no validos, intente denuevo";
        console.log("El correo electrónico no está asociado a ningún rol: 'Profesor o 'Alumno'");
      });
  }  




}

  /*
  --- INICIO VALIDACION LOCAL --- 
            *comentada*

  //Validar login - profesor/alumno (local)
  validarLogin() {
    const usuarioIngresado = this.user.usuario.toLowerCase();
  
    if (usuarioIngresado === this.alumno.usuario.toLowerCase()) {
      let navigationExtras: NavigationExtras = {
        state: { user: this.alumno }
      };
      this.auth.setAuthenticationStatus(true);
      this.router.navigate(['/alumno'], navigationExtras);
    } else if (usuarioIngresado === this.profesor.usuario.toLowerCase()) {
      let navigationExtras: NavigationExtras = {
        state: { user: this.profesor }
      };
      this.auth.setAuthenticationStatus(true);
      this.router.navigate(['/profesor'], navigationExtras);
    } else {
      this.mensaje = "Datos no validos, intente denuevo";
      console.error("Usuario no reconocido");
    }
  }


  mostrarConsola() {
    console.log(this.user);
    if (this.user.usuario != "" && this.user.contrasena != "") {
      this.mensaje = "Usuario Conectado";
    } else {
      this.mensaje = "Usuario y contraseña deben tener algun valor"
    }
  }

  --- FIN DE VALIDACION LOCAL ---

  */
  
  



  //Metodo para boton de formulario #1 firebase - solo validaba y manda a una pagina
  /*
  onSubmit() {
    this.userService.login(this.formLogin.value)
    .then(response => {
      console.log(response);
      this.router.navigate(['alumno'])
    })
    .catch(error => {
      console.log(error);
      this.mensaje = "Datos no validos, intente denuevo";
    });
  }
  */







