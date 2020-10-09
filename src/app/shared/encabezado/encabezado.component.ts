import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor( private _login: LoginService ) { }

  ngOnInit(): void {
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  cerrarSesion() {
    if (sessionStorage.getItem('TipoUser') != '4'){
      this._login.logout();
    }else{
      this._login.logoutBase();
    }
		
	}

}
