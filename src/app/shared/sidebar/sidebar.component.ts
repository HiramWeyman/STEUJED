import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/dasboard/sidebar.service';
import { Usuarios } from '../../modules/usuarios/usuarios';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public usuario: Usuarios = new Usuarios();
  usuarios:Usuarios[];
  session: string;
  public rol_user: number;
  public situacion_user: string;
  constructor( private _sid:SidebarService ) { }

  ngOnInit(): void {

    this.session = sessionStorage.getItem('Login');

    if (sessionStorage.getItem('TipoUser') === null) {

      this._sid.getDatos(this.session).subscribe(
        usuarios => {
          this.usuarios = usuarios;
          //console.log(this.usuarios);
        }
      );

    }else{
      this.rol_user = Number(sessionStorage.getItem('TipoUser'));
      this.situacion_user = sessionStorage.getItem('Situacion');
      console.log(this.situacion_user);
    }
    
  }

}
