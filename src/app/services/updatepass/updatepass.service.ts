import { Injectable } from '@angular/core';
import { Password } from '../../modules/solicitud/cambiapassword/password';
import { Observable } from 'rxjs/Observable';
import { environment, _TOKEN } from '../../../environments/environment';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Usuarios } from '../../modules/usuarios/usuarios';
import { Datos } from '../../shared/loginbase/datos';
import { Respuesta } from '../../shared/loginbase/respuesta';
@Injectable({
  providedIn: 'root'
})
export class UpdatepassService {
  private urlEndPoint = `${environment.rutaAPI}/updatepass`;
  private user:string;
  constructor(private http: HttpClient) { }

  update(pass: Password): Observable<Password> {
    // return this.http.put<Usuarios>(`${this.urlEndPoint+"/Usuarios"}/${usuario.id}`, usuario, {headers: this.httpHeaders})
    this.user = sessionStorage.Matricula;
    return this.http.put<Password>(`${this.urlEndPoint + '?user=' + this.user + '&pass=' + pass.pass1}`, pass);
  }

  updateUser(pass: Password, matricula: string): Observable<Password> {
    // return this.http.put<Usuarios>(`${this.urlEndPoint+"/Usuarios"}/${usuario.id}`, usuario, {headers: this.httpHeaders})
    this.user = sessionStorage.Matricula;
    return this.http.put<Password>(`${this.urlEndPoint + '?user=' + matricula + '&pass=' + pass.pass1}`, pass);
  }

  obtener(data: Datos) {
    return this.http.get(`${environment.rutaAPI + '/getUser?matricula=' + data.matricula + '&curp=' + data.curp + '&rfc=' + data.rfc}`);
  }
}

