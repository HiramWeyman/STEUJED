import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment, _TOKEN } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { CatPlazas } from '../../interfaces/catplazas';

@Injectable()
export class CatPlazasService {

	public urlEndPoint = `${environment.rutaAPI}/CatPlazas`;
	public urlEndPoint2 = `${environment.rutaAPI}/CatPlazasAdmin`;
  	constructor(private http: HttpClient) { }

	getCatPlazas(): Observable<CatPlazas[]> {
		return this.http.get(this.urlEndPoint2).pipe(
		  map(response => response as CatPlazas[])
		);
	}

	getCatPlazasAdmin1(): Observable<CatPlazas[]> {
		return this.http.get(this.urlEndPoint).pipe(
		  map(response => response as CatPlazas[])
		);
	}

	getCatPlazasAdmin(): Observable<CatPlazas[]> {
		return this.http.get(this.urlEndPoint2).pipe(
		  map(response => response as CatPlazas[])
		);
	}

	



	getCatPlaza(ids: number): Observable<CatPlazas> {
		// return this.http.get<Usuarios>(`${this.urlEndPoint+"/Usuarios"}/${ids}`, {headers: this.httpHeaders})
		return this.http.get<CatPlazas>(`${this.urlEndPoint}/${ids}`);
	}

	create(catplazas: CatPlazas): Observable<CatPlazas> {
		const user = sessionStorage.Login;
		return this.http.post<CatPlazas>(`${this.urlEndPoint + '?Usuario=' + user}`, catplazas);
	}

	update(plaza: CatPlazas): Observable<CatPlazas> {
		return this.http.put<CatPlazas>(`${this.urlEndPoint}/${plaza.catp_id}`, plaza);
	}

	delete(id: Number): Observable<CatPlazas> {
		return this.http.delete<CatPlazas>(`${this.urlEndPoint}/${id}`);
	}

}