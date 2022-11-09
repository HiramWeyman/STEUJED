import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Archivos } from '../../interfaces/archivos';

@Injectable()
export class ArchivosService {

    FileName: any;

    private urlEndPoint: string = `${environment.rutaAPI}/Archivos`;

    constructor(private http: HttpClient) { }

    getArchivos(): Observable<Archivos[]> {
		  return this.http.get(this.urlEndPoint).pipe(
		  map(response => response as Archivos[])
		  );
    }

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
      
}