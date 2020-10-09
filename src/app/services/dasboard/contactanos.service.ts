import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment, _TOKEN } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Contactanos } from '../../modules/contactanos/Contactanos';

@Injectable()
export class ContactanosService {

    private urlEndPoint = `${environment.rutaAPI}/Contactanos`;
  	constructor(private http: HttpClient) { }

	  getContactanos(): Observable<Contactanos[]> {
		return this.http.get(this.urlEndPoint).pipe(
		  map(response => response as Contactanos[])
		);
	  }

    
	getContacto(ids: number): Observable<Contactanos> {
		// return this.http.get<Usuarios>(`${this.urlEndPoint+"/Usuarios"}/${ids}`, {headers: this.httpHeaders})
		return this.http.get<Contactanos>(`${this.urlEndPoint}/${ids}`);
	  }
    
	update(publicaciones: Contactanos): Observable<Contactanos> {
		return this.http.put<Contactanos>(`${this.urlEndPoint}/${publicaciones.con_id}`, publicaciones);
	}

	delete(id: number): Observable<Contactanos> {
		return this.http.delete<Contactanos>(`${this.urlEndPoint}/${id}`);
	}

}