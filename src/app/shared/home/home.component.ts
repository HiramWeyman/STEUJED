import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
import { GaleriaService } from '../../services/dasboard/galeria.service';
import { Galeria } from '../../interfaces/galeria';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  preserveWhitespaces: true
})
export class HomeComponent implements OnInit {

  @ViewChild('myButton', {static: true}) myButton: ElementRef;

  galerias: Galeria[];
  private subscription: Subscription;
  public userbase: UserBase = new UserBase();

  imagenes: any[];
  array: string = "";
  data: any;
  str: any;
  id: any;
  titulo:string="";
  protocolo:string="http://200.23.125.55:8000/;?type=http&amp;nocache=156";

  archivos:Archivos[];
  publicaciones:Publicaciones[];
  public_principal:Publicaciones[];
  texto: string;

  ruta: string;
  descripcion: string;

  public loadImagenes(data) {
    
    let body = <HTMLDivElement> document.body;
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = data;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  idx0: Number;
  idx1: Number;
  idx2: Number;
  idx3: Number;
  Titulox0: string;
  Titulox1: string;
  Titulox2: string;
  Titulox3: string;
  Textox0: any;
  Textox1: any;
  Textox2: any;
  Textox3: any;
  Rutax0: string;
  Rutax1: string;
  Rutax2: string;
  Rutax3: string;

  constructor( private _archivos : ArchivosService, private _publicaciones: PublicacionesService,
               private router: Router, private _login: LoginService, private _descarga: DescargaService,
               private activatedRoute: ActivatedRoute, private _gs: GaleriaService ) { }

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
          //console.log(this.public_principal);
          
        },
        error => {
          console.log(error);
        }
      );

      this._publicaciones.getPublicaciones().subscribe(
        publicaciones => {
          this.publicaciones = publicaciones;
          console.log(this.publicaciones);
          
          this.idx0 = this.publicaciones[0].pub_id;this.Titulox0 = this.publicaciones[0].pub_titulo;this.Textox0 = this.publicaciones[0].pub_texto;this.Rutax0 = "http://www.steujed.org.mx/assets/images/noticias/"+this.publicaciones[0].pub_id+"/"+this.publicaciones[0].pub_ruta;
          this.idx1 = this.publicaciones[1].pub_id;this.Titulox1 = this.publicaciones[1].pub_titulo;this.Textox1 = this.publicaciones[1].pub_texto;this.Rutax1 = "http://www.steujed.org.mx/assets/images/noticias/"+this.publicaciones[1].pub_id+"/"+this.publicaciones[1].pub_ruta;
          this.idx2 = this.publicaciones[2].pub_id;this.Titulox2 = this.publicaciones[2].pub_titulo;this.Textox2 = this.publicaciones[2].pub_texto;this.Rutax2 = "http://www.steujed.org.mx/assets/images/noticias/"+this.publicaciones[2].pub_id+"/"+this.publicaciones[2].pub_ruta;
          this.idx3 = this.publicaciones[3].pub_id;this.Titulox3 = this.publicaciones[3].pub_titulo;this.Textox3 = this.publicaciones[3].pub_texto;this.Rutax3 = "http://www.steujed.org.mx/assets/images/noticias/"+this.publicaciones[3].pub_id+"/"+this.publicaciones[3].pub_ruta;
          
          this.str = this.Rutax0.split(",,");
          this.Rutax0 = this.str[0];
          this.str = this.Rutax1.split(",,");
          this.Rutax1 = this.str[0];
          this.str = this.Rutax2.split(",,");
          this.Rutax2 = this.str[0];
          this.str = this.Rutax3.split(",,");
          this.Rutax3 = this.str[0];
          
          //console.log("Ruta 0: "+this.Rutax0);
          //console.log("Ruta 1: "+this.Rutax1);
          //console.log("Ruta 2: "+this.Rutax2);
          //console.log("Ruta 3: "+this.Rutax3);
          this.publicaciones = this.publicaciones.map( item => {
            var splitter = item.pub_ruta.split(",,");
            item.pub_ruta = item.pub_ruta ? '' || 'http://www.steujed.org.mx/assets/images/noticias/'+item.pub_id+'/'+splitter[0] : 'MyVAL'
            return item;
         });

        },
        error => {
          console.log(error);
        }
      );

      this.cargarGaleria();

      //this.myButton.nativeElement.dispatchEvent(new MouseEvent('click'));

  }

  cargarGaleria(): void{
    this.activatedRoute.params.subscribe(params => {
      //console.log(params);

       this._gs.getGalerias().subscribe( (galerias) => {
        this.galerias = galerias
        //console.log(this.galerias);
        this.id = this.galerias[0].gal_id;
        this.titulo = this.galerias[0].gal_titulo;
        this.imagenes = this.galerias[0].gal_ruta.split(",,");
        this.imagenes.splice(-1,1);
        for( var x=0; x<this.imagenes.length; x=x+1){
          this.array += "{img:'http://www.steujed.org.mx/assets/images/galeria/"+this.id+"/"+this.imagenes[x]+"'},";
        }
        this.array = this.array.slice(0, -1)

        this.data =
        "$('.fotorama').fotorama({ data: ["+this.array+"] });"

        this.loadImagenes(this.data);
       })
    })

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
