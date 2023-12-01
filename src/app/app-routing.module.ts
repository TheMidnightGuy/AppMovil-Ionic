import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard'; 
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard'; //guard - firebase

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
    path: 'alumno',
    loadChildren: () => import('./alumno/alumno.module').then( m => m.AlumnoPageModule),
    ...canActivate(()=> redirectUnauthorizedTo(['/login'])) 
    //canActivate: [AuthGuard]  // Aplica el guard y me redirige a Login

  },
  {
    path: 'profesor',
    loadChildren: () => import('./profesor/profesor.module').then( m => m.ProfesorPageModule),
    ...canActivate(()=> redirectUnauthorizedTo(['/login'])) 
    //canActivate: [AuthGuard]  // Aplica el guard y me redirige a Login

  },
  {
    path: 'curso',
    loadChildren: () => import('./curso/curso.module').then( m => m.CursoPageModule),
    ...canActivate(()=> redirectUnauthorizedTo(['/login'])) 
    //*GUARD TEMPORAL, QUITAR* canActivate: [AuthGuard]  // Aplica el guard y me redirige a Login
  },
  {
    path: '**',
    loadChildren: () => import('./error-page/error-page.module').then( m => m.ErrorPagePageModule),
    //En caso de url inexistente me redirige a page404
  },

  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
