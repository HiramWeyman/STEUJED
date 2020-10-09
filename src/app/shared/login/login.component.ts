import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { Login } from '../../shared/login/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

private subscription: Subscription;
public log: Login = new Login();
forma: FormGroup;

  constructor( private router: Router, private activated: ActivatedRoute, private _login: LoginService ) { }

  ngOnInit(): void {

	this._login.logout();

    window.scroll(0, 0);
		this.forma = new FormGroup({
			// FormControl ---> Valor default, Reglas de Validacion, Reglas de validación asíncronas
			'Usuario' : new FormControl('', Validators.required)
		});

		if (this._login.estaLogueado()) {
			this.router.navigate(['/inicio']);
		}
  }

  ngOnDestroy() {
	if (this.subscription !== undefined) {
		this.subscription.unsubscribe();
	}
}

pagina_principal(){
	this.router.navigate(['']);
}

  login() {
	this.subscription = this._login.getLogin(this.log)
		.subscribe((data: any) => {
			if ( data != null) {
				swal.fire({
					icon: 'success',
					title: 'Usuario Logeado',
					text: 'Bienvenido ' + data.user_login,
					timer: 2000
				});
				this.router.navigate(['/inicio']);
			} else{
				swal.fire({
					icon: 'error',
					title: 'Usuario y/o contraseña incorrecta'
				});
			}	
		},
		error => {
			//console.log(error.error.Message);
			swal.fire({
				title: 'ERROR!!!',
				text: error.error.Message,
				icon: 'error'});
		});
	}

}
