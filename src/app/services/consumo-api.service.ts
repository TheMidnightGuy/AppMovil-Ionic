import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError} from 'rxjs/operators';
import { Observable } from 'rxjs'

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

  constructor(private http:HttpClient) { }

  getPost():Observable<any>{
    return this.http.get(this.apiURL+'/posts/').pipe(
      retry(3)
    )
  }

  obtenerDatos (){
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

}
