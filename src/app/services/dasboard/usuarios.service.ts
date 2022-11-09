import { Injectable } from '@angular/core';
import { Usuarios } from '../../modules/usuarios/usuarios';
import { Perfil } from '../../modules/usuarios/perfil';
import { Actividad } from '../../modules/usuarios/actividad';
import { Role } from '../../modules/usuarios/role';
import { Observable } from 'rxjs/Observable';
import { environment, _TOKEN } from '../../../environments/environment';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  // public urlEndPoint = `${environment.rutaAPI}`;
  private urlEndPoint = `${environment.rutaAPI}/Usuarios`;
   private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS',
    'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
    'Allow': 'GET, POST, OPTIONS, PUT, DELETE' });

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuarios[]> {
    const urlEndPoint = `${this.urlEndPoint}`;
    return this.http.get(urlEndPoint).pipe(
      map(response => response as Usuarios[])
    );
  }

  getUsuariosPerfil(ids: any): Observable<Usuarios[]> {
    const urlEndPoint = `${environment.rutaAPI}` + '/usuariosPerfil' + `/${ids}`;
    return this.http.get(urlEndPoint).pipe(
      map(response => response as Usuarios[])
    );
  }

  getUsuariosActividad(ids: any): Observable<Usuarios[]> {
    const urlEndPoint = `${environment.rutaAPI}` + '/usuariosActividad' + `/${ids}`;
    return this.http.get(urlEndPoint).pipe(
      map(response => response as Usuarios[])
    );
  }

  getUsuariosNombre(nombre: any): Observable<Usuarios[]> {
    const urlEndPoint = `${environment.rutaAPI}` + '/usuariosNombre' + `/${nombre}`;
    return this.http.get(urlEndPoint).pipe(
      map(response => response as Usuarios[])
    );
  }
  getPerfil(): Observable<Perfil[]> {
    return this.http.get(`${environment.rutaAPI}` + '/Perfil').pipe(
      map(response => response as Perfil[])
    );
  }

  getAcividad(): Observable<Actividad[]> {
    return this.http.get(`${environment.rutaAPI}` + '/Actividades').pipe(
      map(response => response as Actividad[])
    );
  }

  getRole(): Observable<Role[]> {
    return this.http.get(`${environment.rutaAPI}` + '/Roles').pipe(
      map(response => response as Role[])
    );
  }

  create(usuario: Usuarios): Observable<Usuarios> {
    const user = sessionStorage.Login;
    if (usuario.nombre_completo != null) {
      usuario.nombre_completo = usuario.nombre_completo.toUpperCase();
    }
    if (usuario.direccion != null) {
      usuario.direccion = usuario.direccion.toUpperCase();
    }
    if (usuario.trabajador_base_rec  != null) {
      usuario.trabajador_base_rec = usuario.trabajador_base_rec.toUpperCase();
    }
    if (usuario.user_login != null) {
      usuario.user_login = usuario.user_login.toUpperCase();
    }
    // return this.http.post<Usuarios>(this.urlEndPoint+"/Usuarios", usuario, {headers: this.httpHeaders})
    // return this.http.post<Usuarios>(this.urlEndPoint + '/Usuarios', usuario);
    // console.log(user);
    return this.http.post<Usuarios>(`${this.urlEndPoint + '?usr=' + user.toUpperCase() }`, usuario);
  }

  getUsuario(ids: number): Observable<Usuarios> {
    // return this.http.get<Usuarios>(`${this.urlEndPoint+"/Usuarios"}/${ids}`, {headers: this.httpHeaders})
    return this.http.get<Usuarios>(`${this.urlEndPoint}/${ids}`);
  }

  update(usuario: Usuarios): Observable<Usuarios> {
    // return this.http.put<Usuarios>(`${this.urlEndPoint+"/Usuarios"}/${usuario.id}`, usuario, {headers: this.httpHeaders})
    const user = sessionStorage.Login;
    if (usuario.nombre_completo != null) {
      usuario.nombre_completo = usuario.nombre_completo.toUpperCase();
    }
    if (usuario.direccion != null) {
      usuario.direccion = usuario.direccion.toUpperCase();
    }
    if (usuario.trabajador_base_rec  != null) {
      usuario.trabajador_base_rec = usuario.trabajador_base_rec.toUpperCase();
    }
    if (usuario.user_login != null) {
      usuario.user_login = usuario.user_login.toUpperCase();
    }
    if (usuario.user_login != null) {
      usuario.user_login = usuario.user_login.toUpperCase();
    }

    usuario.usr_mod = user.toUpperCase();
    return this.http.put<Usuarios>(`${this.urlEndPoint}/${usuario.id}`, usuario);
  }

  delete(usuario: Usuarios): Observable<Usuarios> {
    return this.http.put<Usuarios>(`${environment.rutaAPI}` + '/userDelete' + `/${usuario.id}`, usuario);
    // return this.http.delete<Usuarios>("/api/Usuarios/"+id)
  }

  getPDF() {
    return this.http.get<any>(`${environment.rutaAPI}` + '/Reportelista');
  }

}
