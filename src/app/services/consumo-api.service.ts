import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError} from 'rxjs/operators';
import { Observable } from 'rxjs'
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, getFirestore, setDoc, doc, getDoc, addDoc, collection, collectionData, query } from '@angular/fire/firestore';
import  Alumno  from '../interfaces/alumno';



@Injectable({
  providedIn: 'root'
})
export class ConsumoAPIService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'aplication/json',
      'Access-Control-Allow-Origin' :'*'
    })
  }


   apiURL = 'https://jsonplaceholder.typicode.com';

  constructor(private http:HttpClient, private auth: Auth, private firestore: Firestore) { }



  getPost():Observable<any>{
    return this.http.get(this.apiURL+'/posts/').pipe(
      retry(3)
    )
  }

  obtenerDatos():Observable<any>{
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  //METODO - REGISTRAR USUARIOS
  registro({email, password}: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  //METODO - INICIAR SESION
  login({email, password}: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
    
  }

  //METODO - CERRAR SESION
  logout() {
    return signOut(this.auth);
  }
  
  //METODO - OBTENER DOCUMENTOS DE UNA COLECCION
  getCollectionData(path: string, collectionQuery?: any) {
    const ref = collection(getFirestore(), path)
    return collectionData(query(ref, collectionQuery))
  }

  //obtener alumnos de base de datos (Pagina: Cursos)
  getAlumno(): Observable<Alumno[]> {
    const alumnoRef = collection(this.firestore, 'alumnos');
    return collectionData(alumnoRef, {idField: 'id'}) as Observable<Alumno[]>
  }


  //añadir alumnos a la base de datos - (Pagina: Alumno)
  addAlumno(alumno: Alumno) {
    const alumnoRef = collection(this.firestore, 'alumnos');
    return addDoc(alumnoRef, alumno);
  }

  




}

