import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import  Alumno  from '../interfaces/alumno';
import { collection } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private firestore: Firestore) { }

  getAlumno(): Observable<Alumno[]> {
    const alumnoRef = collection(this.firestore, 'alumnos');
    return collectionData(alumnoRef, {idField: 'id'}) as Observable<Alumno[]>
  }

  

}
