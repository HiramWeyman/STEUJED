import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment, _TOKEN } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Advos } from '../../interfaces/advos';
import { admplaza } from '../../interfaces/admplaza';
import { UserBase } from '../../interfaces/userbase';

@Injectable()
export class ServiciosService {

	private urlEndPoint = `${environment.rutaAPI}/PadronAdvo`;
	private urlConsurso = `${environment.rutaAPI}/ConcursoPlazas`;
	private urlConsursoCancel = `${environment.rutaAPI}/SolCancel`;
	private urlReimpresion = `${environment.rutaAPI}/GetSolicitudesReimpresion`;
	private urlUsersBase = `${environment.rutaAPI}/UsersBase`;
	private urlCancelarSol = `${environment.rutaAPI}/CancelarSol`;
	private urlRestablecerSol = `${environment.rutaAPI}/RestablecerSol`;
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

	/* getAdministrativosCat(ids): Observable<admplaza[]> {
	/* 	return this.http.get(this.urlConsurso+"/"+ids+"?bandera=''").pipe(
		  map(response => response as admplaza[])
		); */
		//return this.http.get(`${environment.rutaAPI + '/ConcursoPlazas/' + ids+"?bandera=''"}`);
	//} */

	 getAdministrativosCat(ids) {
		/* 	return this.http.get(this.urlConsurso+"/"+ids+"?bandera=''").pipe(
			  map(response => response as admplaza[])
			); */
			return this.http.get(`${environment.rutaAPI + '/plazasCon/' + ids}`);
		}

	getAdministrativosCatCancel(ids): Observable<Advos[]> {
		return this.http.get(this.urlConsursoCancel+"/"+ids).pipe(
		  map(response => response as Advos[])
		);
	}

	getAdministrativosReimp(ids) {
/* 		return this.http.get(this.urlReimpresion+ "/" +ids).pipe(
		  map(response => response as Advos[])
		); */
		return this.http.get(`${environment.rutaAPI + '/GetSolicitudesReimpresion/' + ids}`);
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

	update(administrativo: Advos): Observable<Advos> {
		// return this.http.put<Usuarios>(`${this.urlEndPoint+"/Usuarios"}/${usuario.id}`, usuario, {headers: this.httpHeaders})
		const user = sessionStorage.Login;
		administrativo.pad_user_cancela=user;
		//console.log(user);
		//console.log(administrativo);
		if(user!=null){
			return this.http.put<Advos>(`${this.urlCancelarSol}/${administrativo.pad_id}`, administrativo);
		}
		
	  }


	  updateRestablece(administrativo: Advos): Observable<Advos> {
		// return this.http.put<Usuarios>(`${this.urlEndPoint+"/Usuarios"}/${usuario.id}`, usuario, {headers: this.httpHeaders})
		const user = sessionStorage.Login;
		administrativo.pad_user_restablece=user;
		//console.log(user);
		//console.log(administrativo);
		return this.http.put<Advos>(`${this.urlRestablecerSol}/${administrativo.pad_id}`, administrativo);
	  }

	  updatePromovido(id:number,parametro:number) {
		// return this.http.put<Usuarios>(`${this.urlEndPoint+"/Usuarios"}/${usuario.id}`, usuario, {headers: this.httpHeaders})
		return this.http.put(`${environment.rutaAPI + '/ActEstatusSol/' + id+"?parametro="+parametro}`,"");
	  }

	  updateComentarios(id:number,comentario:string) {
		// return this.http.put<Usuarios>(`${this.urlEndPoint+"/Usuarios"}/${usuario.id}`, usuario, {headers: this.httpHeaders})
		return this.http.put(`${environment.rutaAPI + '/ActComentarios/' + id+"?comentario="+comentario}`,"");
	  }

}