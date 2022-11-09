import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment, _TOKEN } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { CatServicios } from '../../interfaces/catservicios';

@Injectable()
export class CatServiciosService {

    private urlEndPoint = `${environment.rutaAPI}/CatServicios`;
  	constructor(private http: HttpClient) { }

	getCatServicios(): Observable<CatServicios[]> {
		return this.http.get(this.urlEndPoint).pipe(
		  map(response => response as CatServicios[])
		);
	}

	getCatServicio(ids: number): Observable<CatServicios> {
		// return this.http.get<Usuarios>(`${this.urlEndPoint+"/Usuarios"}/${ids}`, {headers: this.httpHeaders})
		return this.http.get<CatServicios>(`${this.urlEndPoint}/${ids}`);
	}

	create(catservicios: CatServicios): Observable<CatServicios> {
		const user = sessionStorage.Login;
		return this.http.post<CatServicios>(`${this.urlEndPoint + '?Usuario=' + user}`, catservicios);
	}

	update(servicio: CatServicios): Observable<CatServicios> {
		return this.http.put<CatServicios>(`${this.urlEndPoint}/${servicio.cats_id}`, servicio);
	}

	delete(id: Number): Observable<CatServicios> {
		return this.http.delete<CatServicios>(`${this.urlEndPoint}/${id}`);
	}

}