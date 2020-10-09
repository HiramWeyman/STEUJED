import { Injectable } from '@angular/core';
import { Usuarios } from '../../modules/usuarios/usuarios';
import { Perfil } from '../../modules/usuarios/perfil';
import { Observable } from 'rxjs/Observable';
import { environment, _TOKEN } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  // public urlEndPoint = `${environment.rutaAPI}`;
  private urlEndPoint = `${environment.rutaAPI}/Perfil`;
  constructor(private http: HttpClient) { }


  getPerfil(): Observable<Perfil[]> {
    return this.http.get(`${environment.rutaAPI}` + '/Perfil').pipe(
      map(response => response as Perfil[])
    );
  }

  create(per: Perfil): Observable<Perfil> {
    const user = sessionStorage.Login;
    return this.http.post<Perfil>(`${environment.rutaAPI + '/Perfil?usr=' + user }`, per);
  }

  getPerfiles(ids: number): Observable<Perfil> {
    // return this.http.get<Usuarios>(`${this.urlEndPoint+"/Usuarios"}/${ids}`, {headers: this.httpHeaders})
    return this.http.get<Perfil>(`${environment.rutaAPI + '/Perfil'}/${ids}`);
  }

  update(per: Perfil): Observable<Perfil> {
    // return this.http.put<Usuarios>(`${this.urlEndPoint+"/Usuarios"}/${usuario.id}`, usuario, {headers: this.httpHeaders})
    const user = sessionStorage.Login;
    per.usr_mod = user;
    return this.http.put<Perfil>(`${environment.rutaAPI + '/Perfil'}/${per.id}`, per);
  }

  delete(per: Perfil): Observable<Perfil> {
    return this.http.delete<Perfil>(`${environment.rutaAPI + '/Perfil'}/${per.id}`);
    // return this.http.delete<Usuarios>("/api/Usuarios/"+id)
  }

}
