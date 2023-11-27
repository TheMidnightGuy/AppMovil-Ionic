import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { ConsumoAPIService } from '../services/consumo-api.service';
//import { title } from 'process';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  tituloUno: any;

  constructor(private router:Router, private activatedRouter: ActivatedRoute, private consumoApi: ConsumoAPIService) {}

  public mensaje = ""
  


  public user = {
    usuario: "",
    password: ""
  }


  //Variable tipo ConsumoAPIService
  //contructor(private consumoApi:ConsumoAPIService,private activatedRouter: ActivatedRoute) {}

  //Metodo para mostrar
  Mostrar(){
    //this.presentAlert();
    this.consumoApi.getPost().subscribe((res)=>{
      this.tituloUno = '' + res[0].title;
      console.log(res[0].title +"++++" + this.tituloUno);
    }, (error)=>{
      console.log(error);

    });

  }

  loginPage(){
    this.router.navigate(['/login']);
  }


  enviarInformacion() {
    if (this.user.usuario != "") {
      let navigationExtras: NavigationExtras = {
        state: { user: this.user }
      }
      this.router.navigate(['/login'], navigationExtras);
    } else {
      this.mensaje = "Debe ingresar sus credenciales";
    }
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



  //Hacer login valide alumno o profesor y de su correspondiente vista
}


