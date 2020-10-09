import { Injectable } from '@angular/core';
import { Usuarios } from '../../modules/usuarios/usuarios';
import { Actividad } from '../../modules/usuarios/actividad';
import { Observable } from 'rxjs/Observable';
import { environment, _TOKEN } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  // public urlEndPoint = `${environment.rutaAPI}`;
  private urlEndPoint = `${environment.rutaAPI}/Actividades`;
  constructor(private http: HttpClient) { }


  getAcividad(): Observable<Actividad[]> {
    return this.http.get(`${environment.rutaAPI}` + '/Actividades').pipe(
      map(response => response as Actividad[])
    );
  }

  create(act: Actividad): Observable<Actividad> {
    const user = sessionStorage.Login;
    return this.http.post<Actividad>(`${environment.rutaAPI + '/Actividades?usr=' + user }`, act);
  }

  getActivedades(ids: number): Observable<Actividad> {
    // return this.http.get<Usuarios>(`${this.urlEndPoint+"/Usuarios"}/${ids}`, {headers: this.httpHeaders})
    return this.http.get<Actividad>(`${environment.rutaAPI + '/Actividades'}/${ids}`);
  }

  update(act: Actividad): Observable<Actividad> {
    // return this.http.put<Usuarios>(`${this.urlEndPoint+"/Usuarios"}/${usuario.id}`, usuario, {headers: this.httpHeaders})
    const user = sessionStorage.Login;
    act.usr_mod = user;
    return this.http.put<Actividad>(`${environment.rutaAPI + '/Actividades'}/${act.id}`, act);
  }

  delete(act: Actividad): Observable<Actividad> {
    return this.http.delete<Actividad>(`${environment.rutaAPI + '/Actividades'}/${act.id}`);
    // return this.http.delete<Usuarios>("/api/Usuarios/"+id)
  }

}
