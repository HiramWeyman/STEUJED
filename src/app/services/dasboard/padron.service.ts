import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment, _TOKEN } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Padron } from '../../modules/padron-advo/padron';


@Injectable({
  providedIn: 'root'
})
export class PadronService {
  // public urlEndPoint = `${environment.rutaAPI}`;
  private urlEndPoint = `${environment.rutaAPI}/Padron`;
  private urlPadronAdvos = `${environment.rutaAPI}/PadronAdvo`;
  constructor(private http: HttpClient) { }

  create(pad: any[]): Observable<Padron> {
    const user = sessionStorage.Login;
    return this.http.post<Padron>(`${environment.rutaAPI + '/Padron'}`, pad);
  }

  delete(pad: any[]): Observable<Padron> {
    return this.http.post<Padron>(`${environment.rutaAPI + '/PadDelete'}`, pad);
    // return this.http.delete<Usuarios>("/api/Usuarios/"+id)
  }

  deleteAct(pad: any[]): Observable<Padron> {
    return this.http.post<Padron>(`${environment.rutaAPI + '/PadDeleteAct'}`, pad);
    // return this.http.delete<Usuarios>("/api/Usuarios/"+id)
  }

  deleteJub(pad: any[]): Observable<Padron> {
    return this.http.post<Padron>(`${environment.rutaAPI + '/PadDeleteJub'}`, pad);
    // return this.http.delete<Usuarios>("/api/Usuarios/"+id)
  }

  
  getPadronAdvos(): Observable<Padron[]> {
		return this.http.get(this.urlPadronAdvos).pipe(
		  map(response => response as Padron[])
		);
  }
  
  getPadronAdvo(matricula: string): Observable<Padron> {
		// return this.http.get<Usuarios>(`${this.urlEndPoint+"/Usuarios"}/${ids}`, {headers: this.httpHeaders})
		return this.http.get<Padron>(`${this.urlPadronAdvos}?matricula=${matricula}`);
  }


  obtener(matricula: string) {
    console.log(matricula);
    return this.http.get(`${environment.rutaAPI + '/PadronAdvo?matricula=' + matricula}`);
  }

  getUsuario(matricula: string): Observable<Padron> {
    // return this.http.get<Usuarios>(`${this.urlEndPoint+"/Usuarios"}/${ids}`, {headers: this.httpHeaders})
    return this.http.get<Padron>(`${environment.rutaAPI + '/PadronAdvo?matricula=' + matricula}`);
  }
  
  update(usuario: Padron): Observable<Padron> {
    // return this.http.put<Usuarios>(`${this.urlEndPoint+"/Usuarios"}/${usuario.id}`, usuario, {headers: this.httpHeaders})
    const urlEndPoint = `${environment.rutaAPI}/updateEstatus`;
    usuario.pad_situacion= usuario.pad_situacion.toLocaleUpperCase();
    return this.http.put<Padron>(`${urlEndPoint}/${usuario.pad_mat}`, usuario);
  }

  getBuscaMat(matricula: string): Observable<Padron[]> {
    const urlEndPoint = `${environment.rutaAPI + '/getUserPadMat?matricula=' + matricula}`;
    return this.http.get(urlEndPoint).pipe(
      map(response => response as Padron[])
    );
  }

  getUsuariosNombre(nombre: any): Observable<Padron[]> {
    nombre=nombre.toUpperCase();
    const urlEndPoint = `${environment.rutaAPI + '/getUserPadNom?nombre=' + nombre}`;
    return this.http.get(urlEndPoint).pipe(
      map(response => response as Padron[])
    );
  }

}
