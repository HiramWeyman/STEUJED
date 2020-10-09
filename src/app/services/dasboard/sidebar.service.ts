import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Usuarios } from '../../modules/usuarios/usuarios';

@Injectable()
export class SidebarService {

   

    private urlEndPoint: string = `${environment.rutaAPI}/Datos`;

    constructor(private http: HttpClient) { }

    getDatos(user: string): Observable<Usuarios[]> {
		return this.http.get(this.urlEndPoint+"?user="+user).pipe(
		  map(response => response as Usuarios[])
		);
	  }
      
}