import { Component, OnInit } from '@angular/core';
import { _TOKEN } from '../../../environments/environment';
import { ArchivosService } from '../../services/dasboard/archivos.services';
import { Archivos } from '../../interfaces/archivos';
import { PublicacionesService } from '../../services/dasboard/publicaciones.service';
import { Publicaciones } from '../../modules/publicaciones/principal/publicaciones';
import { UserBase } from '../../interfaces/userbase';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';
import { LoginService } from '../../services/login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DescargaService } from '../../services/descarga/descarga.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  preserveWhitespaces: true
})
export class HomeComponent implements OnInit {

  private subscription: Subscription;
  public userbase: UserBase = new UserBase();

  archivos:Archivos[];
  publicaciones:Publicaciones[];
  public_principal:Publicaciones[];
  texto: string;

  ruta: string;
  descripcion: string;

  constructor( private _archivos : ArchivosService, private _publicaciones: PublicacionesService,
               private router: Router, private _login: LoginService, private _descarga: DescargaService ) { }

  ngOnInit() {
    /*
    if (localStorage.getItem(_TOKEN) != null) {
      localStorage.removeItem(_TOKEN);
    }
    */

      this._archivos.getArchivos().subscribe(
        archivos => {
          this.archivos = archivos;
          //console.log(this.archivos);
        },
        error => {
          console.log(error);
        }
      );

      this._publicaciones.getPublicaciones().subscribe(
        publicaciones => {
          this.public_principal = publicaciones;
          console.log(this.public_principal);
          
        },
        error => {
          console.log(error);
        }
      );

      this._publicaciones.getPublicaciones().subscribe(
        publicaciones => {
          this.publicaciones = publicaciones;

          this.publicaciones = this.publicaciones.map( item => {
            var splitter = item.pub_ruta.split(",,");
            item.pub_ruta = item.pub_ruta ? '' || 'assets/images/noticias/'+item.pub_id+'/'+splitter[0] : 'MyVAL'
            return item;
         });

        },
        error => {
          console.log(error);
        }
      );

  }

  rutaArchivo(ruta: string, descripcion: string){
    this.ruta = ruta;
    this.descripcion = descripcion;
  }

  login() {
    this.subscription = this._login.getLoginBase(this.userbase)
      .subscribe((data: any) => {
        if ( data != null) {
          this._descarga.create(this.descripcion, data.ub_nombre, this.userbase.ub_user).subscribe(
            descarga => {
              console.log(data);
              swal.fire({icon: 'success', title: 'Usuario Logeado', text: 'Bienvenido ' + data.ub_nombre, timer: 2000});
              window.open("http://www.steujed.org.mx/"+this.ruta, "_blank");
            },
            error => {console.log(error);swal.fire({title: 'ERROR!!!',text: error.message,icon: 'error'});}
          );
        } else{
          swal.fire({icon: 'error',title: 'Usuario y/o contraseña incorrecta'});
        }	
      },
      error => {
        //console.log(error.error.Message);
        swal.fire({title: 'ERROR!!!',text: error.error.Message,icon: 'error'});
      });
    }

}
