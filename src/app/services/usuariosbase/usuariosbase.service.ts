import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment, _TOKEN } from '../../../environments/environment';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Usuariosbase} from '../../modules/usuariosbase/usuariosbase';

@Injectable({
  providedIn: 'root'
})
export class UsuariosbaseService {

  constructor(private http: HttpClient) { }

  getUsuariosNombre(nombre: any): Observable<Usuariosbase[]> {
    nombre=nombre.toUpperCase();
    const urlEndPoint = `${environment.rutaAPI + '/usuariosbaseNombre?nombre=' + nombre}`;
    return this.http.get(urlEndPoint).pipe(
      map(response => response as Usuariosbase[])
    );
  }

  getUsuarios(): Observable<Usuariosbase[]> {
    const urlEndPoint = `${environment.rutaAPI}` + '/getUserBase';
    return this.http.get(urlEndPoint).pipe(
      map(response => response as Usuariosbase[])
    );
  }

  getBuscaMat(matricula: string): Observable<Usuariosbase[]> {
    const urlEndPoint = `${environment.rutaAPI + '/getUserBaseMat?matricula=' + matricula}`;
    return this.http.get(urlEndPoint).pipe(
      map(response => response as Usuariosbase[])
    );
  }

  obtener(matricula: string) {
    console.log(matricula);
    return this.http.get(`${environment.rutaAPI + '/getUserBaseMat?matricula=' + matricula}`);
  }

  update(usuario: Usuariosbase): Observable<Usuariosbase> {
    // return this.http.put<Usuarios>(`${this.urlEndPoint+"/Usuarios"}/${usuario.id}`, usuario, {headers: this.httpHeaders})
    const urlEndPoint = `${environment.rutaAPI}/updateuserbase`;
    if (usuario.ub_nombre != null) {
      usuario.ub_nombre = usuario.ub_nombre.toUpperCase();
    }
    return this.http.put<Usuariosbase>(`${urlEndPoint}/${usuario.ub_user}`, usuario);
  }
}
