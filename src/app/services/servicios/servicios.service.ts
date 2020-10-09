import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment, _TOKEN } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Advos } from '../../interfaces/advos';
import { UserBase } from '../../interfaces/userbase';

@Injectable()
export class ServiciosService {

	private urlEndPoint = `${environment.rutaAPI}/PadronAdvo`;
	private urlConsurso = `${environment.rutaAPI}/ConcursoPlazas`;
	private urlUsersBase = `${environment.rutaAPI}/UsersBase`;

  	constructor(private http: HttpClient) { }

	getPadronAdvo(): Observable<Advos[]> {
		return this.http.get(this.urlEndPoint).pipe(
		  map(response => response as Advos[])
		);
	}

	getAdvo(matricula: number): Observable<Advos[]> {
		return this.http.get<Advos[]>(`${this.urlEndPoint}?matricula=${matricula}`);
	}

	getAdministrativos(): Observable<Advos[]> {
		return this.http.get(this.urlConsurso).pipe(
		  map(response => response as Advos[])
		);
	}

	getAdministrativosCat(ids): Observable<Advos[]> {
		return this.http.get(this.urlConsurso+"/"+ids+"?bandera=''").pipe(
		  map(response => response as Advos[])
		);
	}

	create(administrativo: Advos): Observable<Advos> {
		return this.http.post<Advos>(`${this.urlConsurso}`, administrativo);
	}

	createBase(administrativo: UserBase): Observable<UserBase> {
		return this.http.post<UserBase>(`${this.urlUsersBase}`, administrativo).pipe(
			map((response: any) => {
				  return response;
				  })
		  );
	}

}