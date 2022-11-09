import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment, _TOKEN } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Galeria } from '../../interfaces/galeria';

@Injectable()
export class GaleriaService {

    private urlEndPoint = `${environment.rutaAPI}/Galeria`;
  	constructor(private http: HttpClient) { }

    getGalerias(): Observable<Galeria[]> {
        return this.http.get(this.urlEndPoint).pipe(
            map(response => response as Galeria[])
        );
    }

    getGaleria(ids: number): Observable<Galeria> {
        return this.http.get<Galeria>(`${this.urlEndPoint}/${ids}`);
    }

	create(galerias: Galeria, Usuario: string): Observable<Galeria> {	
		return this.http.post<Galeria>(`${this.urlEndPoint + '?Usuario=' + Usuario}`, galerias);
	}

	update(galeria: Galeria, Usuario: string): Observable<Galeria>{
		return this.http.put<Galeria>(`${this.urlEndPoint}/${galeria.gal_id}?Usuario=`+Usuario, galeria)
	}

	delete(id: number): Observable<Galeria> {
		return this.http.delete<Galeria>(`${this.urlEndPoint}/${id}`);
    }

}