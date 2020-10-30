import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment, _TOKEN } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { CajaAhorro } from '../../interfaces/cajaAhorro';

@Injectable()
export class CajaAhorroService {

	private urlEndPoint = `${environment.rutaAPI}/CajaAhorro`;
	private urlPrestamos = `${environment.rutaAPI}/Prestamos`;

  	constructor(private http: HttpClient) { }

	getCajaAhorro(): Observable<CajaAhorro[]> {
	return this.http.get(this.urlEndPoint).pipe(
		map(response => response as CajaAhorro[])
	);
	}

	getCaja(matricula: string, tipo: string): Observable<CajaAhorro[]> {
	return this.http.get(`${this.urlEndPoint}?matricula=${matricula}&tipo=${tipo}`).pipe(
		map(response => response as CajaAhorro[])
		);
	}

	getCajaTipo(tipo: string): Observable<CajaAhorro[]> {
		return this.http.get(`${this.urlEndPoint}?tipo=${tipo}`).pipe(
			map(response => response as CajaAhorro[])
			);
	}

	create(matricula:string, nombre: string, adscripcion: string, tipo:string, cajaAhorro: CajaAhorro): Observable<CajaAhorro> {
		return this.http.post<CajaAhorro>(`${this.urlEndPoint + '?matricula='+matricula+'&nombre='+nombre+'&adscripcion='+adscripcion+'&tipo='+tipo}`, cajaAhorro);
	  }

    
	update(valorSelect: string, ID: number){
		return this.http.put(`${this.urlPrestamos}/${ID}?valor=`+valorSelect, CajaAhorro);
	}

	/*
	updateNombreArchivo(publicacion: Publicaciones, nombreArchivo: string): Observable<Publicaciones>{
		return this.http.put<Publicaciones>(`${this.urlEndPoint}/${publicacion.pub_id}?nombreArchivo=`+nombreArchivo, publicacion)
	}

	delete(id: number): Observable<Publicaciones> {
		return this.http.delete<Publicaciones>(`${this.urlEndPoint}/${id}`);
	}
    */
}