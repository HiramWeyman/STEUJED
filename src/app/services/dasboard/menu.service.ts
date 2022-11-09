import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Menu } from '../../modules/menu/menu'

@Injectable()
export class MenuService {

	private urlEndPoint: string = `${environment.rutaAPI}/Menu`;
  	private httpHeaders = new HttpHeaders({'Content-Type': 'application/json','Access-Control-Allow-Origin':'*'})
  	constructor(private http: HttpClient) { }

	  getMenu(): Observable<Menu[]> {
		//return of(CLIENTES);
		return this.http.get(this.urlEndPoint).pipe(
		  map(response => response as Menu[])
		);
	  }

	  getMenuBandera(): Observable<Menu[]> {
		//return of(CLIENTES);
		return this.http.get(this.urlEndPoint+"?Bandera=Bandera").pipe(
		  map(response => response as Menu[])
		);
	  }

	  getMenus(ids:number): Observable<Menu>{
		//return this.http.get<Usuarios>(`${this.urlEndPoint+"/Usuarios"}/${ids}`, {headers: this.httpHeaders})
		return this.http.get<Menu>(`${this.urlEndPoint}/${ids}`)
	  }

	  update(menu: Menu): Observable<Menu>{
		//return this.http.put<Usuarios>(`${this.urlEndPoint+"/Usuarios"}/${usuario.id}`, usuario, {headers: this.httpHeaders})
		return this.http.put<Menu>(`${this.urlEndPoint}/${menu.menu_id}`, menu)
	  }

	  cancelar(id: number): Observable<Menu>{
		return this.http.delete<Menu>(`${this.urlEndPoint}/${id}`)
		//return this.http.delete<Usuarios>("/api/Usuarios/"+id)
	  }
}