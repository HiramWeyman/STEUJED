import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Integrantes } from '../../interfaces/integrantes'
import { log } from 'util';

@Injectable()
export class IntegrantesService {

	private urlEndPoint: string = `${environment.rutaAPI}/Integrantes`;
  	constructor(private http: HttpClient) { }

	  getIntegrantes(): Observable<Integrantes[]> {
		return this.http.get(this.urlEndPoint).pipe(
		  map(response => response as Integrantes[])
		);
	  }

	  getIntegrantesBandera(): Observable<Integrantes[]> {
		return this.http.get(this.urlEndPoint+"?bandera=Bandera").pipe(
		  map(response => response as Integrantes[])
		);
	  }

	  getIntegrante(ids:number): Observable<Integrantes>{
		//return this.http.get<Usuarios>(`${this.urlEndPoint+"/Usuarios"}/${ids}`, {headers: this.httpHeaders})
		return this.http.get<Integrantes>(`${this.urlEndPoint}/${ids}`)
	  }

	  
	  create(archivos: Integrantes, nombreArchivo: string) : Observable<Integrantes> {
		//return this.http.post<Usuarios>(this.urlEndPoint+"/Usuarios", usuario, {headers: this.httpHeaders})
		//return this.http.post<Archivos>(this.urlEndPoint, archivos)
		return this.http.post<Integrantes>(`${this.urlEndPoint+"/Integrantes?nombreArchivo="+nombreArchivo}`, archivos)
	  }

	update(integrantes: Integrantes): Observable<Integrantes>{
		return this.http.put<Integrantes>(`${this.urlEndPoint}/${integrantes.int_id}`, integrantes)
	}

	
	ActualizaComite(id:number,desc:String) {
		// return this.http.put<Usuarios>(`${this.urlEndPoint+"/Usuarios"}/${usuario.id}`, usuario, {headers: this.httpHeaders})
	
		return this.http.put(`${environment.rutaAPI + '/ActComite/' + id+"?desc="+desc}`,"");
	  }


	updateNombreArchivo(integrantes: Integrantes, nombreArchivo: string): Observable<Integrantes>{
		console.log(integrantes);
		
		return this.http.put<Integrantes>(`${this.urlEndPoint}/${integrantes.int_id}?nombreArchivo=`+nombreArchivo, integrantes)
	}

	delete(id: number): Observable<Integrantes>{
		return this.http.delete<Integrantes>(`${this.urlEndPoint}/${id}`)
		//return this.http.delete<Usuarios>("/api/Usuarios/"+id)
	  }


	  getComite() {
	
			return this.http.get(`${environment.rutaAPI + '/Comite'}`);
		}

}