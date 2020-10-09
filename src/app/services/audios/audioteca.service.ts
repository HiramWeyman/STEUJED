import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { msaapPlaylist } from './msaapPlaylist';
import { Audios } from './audios';

@Injectable()
export class AudiotecaService {

    private urlEndPoint: string = `${environment.rutaAPI}/Audioteca`;

    constructor(private http: HttpClient) { }

    getArchivos(): Observable<msaapPlaylist[]> {
		  return this.http.get(this.urlEndPoint).pipe(
		  map(response => response as msaapPlaylist[])
		  );
    }

    delete(id: number): Observable<Audios>{
      return this.http.delete<Audios>(`${this.urlEndPoint}/${id}`)
      //return this.http.delete<Usuarios>("/api/Usuarios/"+id)
    }

    create(title: Audios, nombreArchivo: string) : Observable<Audios> {
      const user = sessionStorage.Login;
      //return this.http.post<Usuarios>(this.urlEndPoint+"/Usuarios", usuario, {headers: this.httpHeaders})
      //return this.http.post<Archivos>(this.urlEndPoint, archivos)
      return this.http.post<Audios>(`${this.urlEndPoint+"?nombreArchivo="+nombreArchivo+"&Usuario="+user}`, title)
    }

    /*
    getArchivo(ids:number): Observable<Archivos> {
        return this.http.get<Archivos>(`${this.urlEndPoint}/${ids}`)
    }

    create(archivos: Archivos, nombreArchivo: string, seccion: string) : Observable<Archivos> {
      //return this.http.post<Usuarios>(this.urlEndPoint+"/Usuarios", usuario, {headers: this.httpHeaders})
      //return this.http.post<Archivos>(this.urlEndPoint, archivos)
      return this.http.post<Archivos>(`${this.urlEndPoint+"?nombreArchivo="+nombreArchivo+"&seccion="+seccion}`, archivos)
    }

    update(archivos: Archivos): Observable<Archivos>{
      //return this.http.put<Usuarios>(`${this.urlEndPoint+"/Usuarios"}/${usuario.id}`, usuario, {headers: this.httpHeaders})
      return this.http.put<Archivos>(`${this.urlEndPoint}/${archivos.archivo_id}`, archivos)
    }
  
    delete(id: number): Observable<Archivos>{
      return this.http.delete<Archivos>(`${this.urlEndPoint}/${id}`)
      //return this.http.delete<Usuarios>("/api/Usuarios/"+id)
    }
    */
}