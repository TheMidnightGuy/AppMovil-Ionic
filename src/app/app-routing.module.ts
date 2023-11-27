import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [



  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),

  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'cuenta',
    loadChildren: () => import('./cuenta/cuenta.module').then( m => m.CuentaPageModule),

  },
  {
    path: 'alumno',
    loadChildren: () => import('./alumno/alumno.module').then( m => m.AlumnoPageModule),
    //canActivate: [AuthGuard]  // Aplica el guard y me redirige a Login

  },
  {
    path: 'profesor',
    loadChildren: () => import('./profesor/profesor.module').then( m => m.ProfesorPageModule),

  },
  {
    path: 'curso',
    loadChildren: () => import('./curso/curso.module').then( m => m.CursoPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./error-page/error-page.module').then( m => m.ErrorPagePageModule)
  },

  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
