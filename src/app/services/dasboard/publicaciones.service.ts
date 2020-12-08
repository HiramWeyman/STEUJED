import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment, _TOKEN } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Publicaciones } from '../../modules/publicaciones/principal/publicaciones';

@Injectable()
export class PublicacionesService {

    private urlEndPoint = `${environment.rutaAPI}/Publicaciones`;
  	constructor(private http: HttpClient) { }

	  getPublicaciones(): Observable<Publicaciones[]> {
		return this.http.get(this.urlEndPoint).pipe(
		  map(response => response as Publicaciones[])
		);
	  }

	  getPublicacion(ids: number): Observable<Publicaciones> {
		// return this.http.get<Usuarios>(`${this.urlEndPoint+"/Usuarios"}/${ids}`, {headers: this.httpHeaders})
		return this.http.get<Publicaciones>(`${this.urlEndPoint}/${ids}`);
	  }

	  getNota(ids: number){
		return this.http.get(`${this.urlEndPoint}/${ids}`).pipe(
			map((response: any) => {
				return response;
				})
		);
	
	  }

	getPublicacionNotaPrincipal(): Observable<Publicaciones> {
		return this.http.get<Publicaciones>(`${this.urlEndPoint}/?notaPrincipal=1`);
		/*
		return this.http.get(`${this.urlEndPoint}/?notaPrincipal=1`).pipe(
			map(response => response as Publicaciones[])
		);
		*/
	}

	create(archivos: Publicaciones, nombreArchivo: string, Usuario: string): Observable<Publicaciones> {
		// return this.http.post<Usuarios>(this.urlEndPoint+"/Usuarios", usuario, {headers: this.httpHeaders})
		// return this.http.post<Archivos>(this.urlEndPoint, archivos)	
		return this.http.post<Publicaciones>(`${this.urlEndPoint + '?nombreArchivo=' + nombreArchivo + '&IDCategoria=' + 2 + '&IDUsuario=' + Usuario}`, archivos);
	  }

	update(publicaciones: Publicaciones): Observable<Publicaciones> {
		return this.http.put<Publicaciones>(`${this.urlEndPoint}/${publicaciones.pub_id}`, publicaciones);
	}

	updateNombreArchivo(publicacion: Publicaciones, nombreArchivo: string): Observable<Publicaciones>{
		return this.http.put<Publicaciones>(`${this.urlEndPoint}/${publicacion.pub_id}?nombreArchivo=`+nombreArchivo, publicacion)
	}

	delete(id: number): Observable<Publicaciones> {
		return this.http.delete<Publicaciones>(`${this.urlEndPoint}/${id}`);
	}

}
