import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment, _TOKEN } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Usuarios } from '../../modules/usuarios/usuarios';
import { Login } from '../../shared/login/login';
import { Router } from '@angular/router';
import { UserBase } from '../../interfaces/userbase';
import { Password } from '../../modules/solicitud/cambiapassword/password';

@Injectable()
export class LoginService {
	private user:string;
	  constructor(private http: HttpClient, public router: Router) { }
	  public urlEndPoint = `${environment.rutaAPI}`;

	  getLogin(login: Login): Observable<Login[]> {
		// const urlEndPoint: string = `${environment.rutaAPI}/Login/`+matricula;
		return this.http.post<Usuarios>(this.urlEndPoint + '/Login', login).pipe(
		// return this.http.get("/api/Login/"+matricula).pipe(
          map((response: any) => {
			sessionStorage.Login = login.user_login.toString();
			localStorage.setItem(_TOKEN, login.toString());
			// sessionStorage.setItem(_TOKEN, matricula.toString());
            return response;
            })
		);
	  }
	  
	  getLoginBase(login: UserBase): Observable<UserBase[]> {
		return this.http.post<Usuarios>(this.urlEndPoint + '/LoginBase', login).pipe(
          map((response: any) => {
			sessionStorage.LoginBase = login.ub_user.toString();
			localStorage.setItem(_TOKEN, login.toString());
            return response;
            })
		);
      }

    logout() {
		localStorage.removeItem(_TOKEN);
		sessionStorage.removeItem('TipoUser');
		sessionStorage.removeItem('Login');
		// sessionStorage.removeItem(_TOKEN);
		this.router.navigate(['/adminLogin']);
	}

	logoutBase() {
		localStorage.removeItem(_TOKEN);
		sessionStorage.removeItem('TipoUser');
		sessionStorage.removeItem('LoginBase');
		sessionStorage.removeItem('Situacion');
		this.router.navigate(['/loginbase']);
	}

      estaLogueado() {
		if (localStorage.getItem(_TOKEN) === null) {
		// if (sessionStorage.removeItem(_TOKEN) === null) {
			return false;
		} else {
			return (localStorage.getItem(_TOKEN).length > 5);
			// return (sessionStorage.getItem(_TOKEN).length>5);
		}
	}

	update(pass: Password): Observable<Password> {
		// return this.http.put<Usuarios>(`${this.urlEndPoint+"/Usuarios"}/${usuario.id}`, usuario, {headers: this.httpHeaders})
		this.user = sessionStorage.Matricula;
		return this.http.put<Password>(`${environment.rutaAPI}` + '/Pass' + `/${this.user}`, pass.pass1);
	  }
}
