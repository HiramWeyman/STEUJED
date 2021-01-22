import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment, _TOKEN } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { CajaAhorro } from '../../interfaces/cajaAhorro';
import { Revolvente } from '../../interfaces/revolvente';
import { Buscaprestamo } from '../../interfaces/buscaprestamo';

@Injectable()
export class CajaAhorroService {

	private urlEndPoint = `${environment.rutaAPI}/CajaAhorro`;
	private urlPrestamos = `${environment.rutaAPI}/Prestamos`;
	private urlRevolvente = `${environment.rutaAPI}/PreRevolvente`;

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

   getRevolventes(): Observable<Revolvente[]> {
	return this.http.get(this.urlRevolvente).pipe(
		map(response => response as Revolvente[])
	);
	}

	getRevolvente(matricula: string): Observable<Revolvente[]> {
	return this.http.get(`${this.urlRevolvente}?matricula=${matricula}`).pipe(
		map(response => response as Revolvente[])
		);
	}

	createRevolvente(matricula:string, nombre: string, revolvente: Revolvente): Observable<Revolvente> {
		return this.http.post<Revolvente>(`${this.urlRevolvente + '?matricula='+matricula+'&nombre='+nombre}`, revolvente);
	}

	updateRevolvente(valorSelect: string, ID: number){
		return this.http.put(`${this.urlRevolvente}/${ID}?valor=`+valorSelect, CajaAhorro);
	}

	getBuscaMat(matricula: string): Observable<CajaAhorro[]> {
		const urlEndPoint = `${environment.rutaAPI + '/GetCajaAhorroMat?matricula=' + matricula}`;
		return this.http.get(urlEndPoint).pipe(
		  map(response => response as CajaAhorro[])
		);
	  }

	  getBuscaMatEstatus(matestatus: Buscaprestamo): Observable<CajaAhorro[]> {
		const urlEndPoint = `${environment.rutaAPI + '/GetCajaAhorroMatEstatus?matricula=' + matestatus.matricula2+'&estatus='+matestatus.estatus}`;
		return this.http.get(urlEndPoint).pipe(
		  map(response => response as CajaAhorro[])
		);
	  }

	  getBuscaMatIng(matricula: string): Observable<Revolvente[]> {
		const urlEndPoint = `${environment.rutaAPI + '/GetIngresoMat?matricula=' + matricula}`;
		return this.http.get(urlEndPoint).pipe(
		  map(response => response as Revolvente[])
		);
	  }

	  getBuscaMatEstatusIng(matestatus: Buscaprestamo): Observable<Revolvente[]> {
		const urlEndPoint = `${environment.rutaAPI + '/GetIngresoMatEstatus?matricula=' + matestatus.matricula2+'&estatus='+matestatus.estatus}`;
		return this.http.get(urlEndPoint).pipe(
		  map(response => response as Revolvente[])
		);
	  }

	  getBuscaMatRev(matricula: string): Observable<CajaAhorro[]> {
		  console.log(matricula);
		const urlEndPoint = `${environment.rutaAPI + '/GetRevMat?matricula=' + matricula}`;
		return this.http.get(urlEndPoint).pipe(
		  map(response => response as CajaAhorro[])
		);
	  }

	  getBuscaMatEstatusRev(matestatus: Buscaprestamo): Observable<CajaAhorro[]> {
		const urlEndPoint = `${environment.rutaAPI + '/GetRevMatEstatus?matricula=' + matestatus.matricula2+'&estatus='+matestatus.estatus}`;
		return this.http.get(urlEndPoint).pipe(
		  map(response => response as CajaAhorro[])
		);
	  }

	  getBuscaMatRetiro(matricula: string): Observable<CajaAhorro[]> {
		console.log(matricula);
	  const urlEndPoint = `${environment.rutaAPI + '/GetRetiroMat?matricula=' + matricula}`;
	  return this.http.get(urlEndPoint).pipe(
		map(response => response as CajaAhorro[])
	  );
	}

	getBuscaMatEstatusRetiro(matestatus: Buscaprestamo): Observable<CajaAhorro[]> {
	  const urlEndPoint = `${environment.rutaAPI + '/GetRetiroMatEstatus?matricula=' + matestatus.matricula2+'&estatus='+matestatus.estatus}`;
	  return this.http.get(urlEndPoint).pipe(
		map(response => response as CajaAhorro[])
	  );
	}
}