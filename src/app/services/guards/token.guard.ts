import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { _TOKEN } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()

export class TokenGuard implements CanActivate {

	constructor(private router: Router) {}

	canActivate(): Promise<boolean> | boolean {
		// console.log('Inicio de verificación del Token');
		const token = localStorage.getItem(_TOKEN);
		if (token === null) {
			return false;
		} else {
			const payload = JSON.parse(atob(token.split('.')[1]));
			const expirado = this.expirado(payload.exp);
			if (expirado) {
				console.log('Bloqueado por el GUARD');
				localStorage.removeItem(_TOKEN);
				this.router.navigate(['/login']);
				return false;
			} else {
				return true;
			}
		}
	}

	expirado(fechaExp: number) {
		const ahora = new Date().getTime() / 1000;
		if (ahora > fechaExp) {
			// console.log('mayor');
			return true;
		} else {
			// console.log('menor');
			return false;
		}
	}

	getTimeout() {
		return new Promise((resolve, reject) => {
			// Recuperamos el token
			const token = localStorage.getItem(_TOKEN);
			if (token === null) {
				resolve ('00:00');
			} else {
				// Obtenemos la información del token
				const payload = JSON.parse(atob(token.split('.')[1]));
				// Obtenemos el dato de expiracion
				const expirado = payload.exp * 1000;
				const horaExp = new Date();
				horaExp.setTime(expirado);

				const hrExp = horaExp.getHours();	// console.log('he', hrExp);
				const mnExp = horaExp.getMinutes();	// console.log('me', mnExp);
				const sgExp = horaExp.getSeconds();	// console.log('se', sgExp);

				// Obtenemos la fecha actual
				const ahora = new Date();

				const hrAct = ahora.getHours();		// console.log('ha', hrAct);
				const mnAct = ahora.getMinutes();	// console.log('ma', mnAct);
				const sgAct = ahora.getSeconds();	// console.log('sa', sgAct);
				
				const hr = hrExp - hrAct;
				let mn = mnExp - mnAct;
				let sg = sgExp - sgAct;

				if (hr > 0) {
					mn = mn + 60;
				}
				if (sg < 0) {
					mn--;
					sg = sg + 60;
				}

				let resultado = '';
				if (mn < 10) {
					resultado = '0' + mn;
				} else {
					resultado = mn.toString();
				}
				resultado = resultado + ':';
				if (sg < 10) {
					resultado = resultado + '0' + sg;
				} else {
					resultado = resultado + sg.toString();
				}
				resolve(resultado);
			}
		});
	}

	getUsuario() {

	}

	getNombre() {
		const token = localStorage.getItem(_TOKEN);
		if (token === null) {
			return null;
		} else {
			const payload = JSON.parse(atob(token.split('.')[1]));
			return JSON.parse(payload.usuario).nombre;
		}
	}

}
