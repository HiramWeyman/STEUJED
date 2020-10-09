import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment, _TOKEN } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Descarga } from '../../interfaces/descarga';

@Injectable()
export class DescargaService {

  	constructor(private http: HttpClient) { }

	getPDescargas(): Observable<Descarga[]> {
		return this.http.get(`${environment.rutaAPI}/DescArchivos`).pipe(
		  map(response => response as Descarga[])
		);
	}

	create(descripcion: string, nombre: string, matricula: String): Observable<Descarga> {
        //return this.http.post<Descarga>(`${environment.rutaAPI}/DescArchivos?descripcion=`+descripcion+'&nombre='+nombre, Descarga);
        return this.http.post<Descarga>(`${environment.rutaAPI}/DescArchivos?descripcion=`+descripcion+'&nombre='+nombre+'&matricula='+matricula,'');
	}

}