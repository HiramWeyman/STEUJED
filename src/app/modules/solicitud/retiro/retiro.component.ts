import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../../services/servicios/servicios.service';
import { CajaAhorroService } from '../../../services/cajaAhorro/cajaAhorro.service';
import { CajaAhorro } from '../../../interfaces/cajaAhorro';
import Swal from 'sweetalert2';
import { environment} from '../../../../environments/environment';
import { HttpClient, HttpEventType } from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-retiro',
  templateUrl: './retiro.component.html',
  styleUrls: ['./retiro.component.scss']
})
export class RetiroComponent implements OnInit {

  public urlEndPoint: string = `${environment.rutaAPI}`;

  public cajaAhorro: CajaAhorro = new CajaAhorro();

  advos: any;
  public nombre: string;
  public matricula: string;
  public adscripcion: string;

  cajaAhorros:CajaAhorro[];

  selectedFile: File = null;
  progress : any;
  mensaje : any;
  ToggleButton: boolean = true;

  IDRegistro: any;
  valorBandera: any;

  constructor( private _serv:ServiciosService, private _ca: CajaAhorroService, private http: HttpClient,
               public router: Router ) { }

  ngOnInit(): void {
    this._ca.getCaja(sessionStorage.getItem('LoginBase'), 'RETIRO').subscribe(
      (cajaAhorros) => {
        this.cajaAhorros = cajaAhorros;
        //console.log(this.cajaAhorros);
      }
    )

    this._serv.getAdvo(Number(sessionStorage.getItem('LoginBase'))).subscribe(
      advos => {
        this.advos = advos;
        this.nombre = this.advos.pad_nombre;
        this.matricula = this.advos.pad_mat;
        this.adscripcion = this.advos.pad_adscripcion;
      },
      error => {
      console.log(error);
      Swal.fire({title: 'ERROR!!!',text: error.error.Message ,icon: 'error'});
    });
  }

  create(){
    //console.log(datos.form.value);
    this._ca.create(this.matricula, this.nombre, this.adscripcion, 'RETIRO', this.cajaAhorro).subscribe(cajaAhorro =>{
      this._ca.getCaja(sessionStorage.getItem('LoginBase'), 'RETIRO').subscribe(
        (cajaAhorros) => {
          this.cajaAhorros = cajaAhorros;
          //console.log(this.cajaAhorros);
        }
      )
      Swal.fire('Guardado', `Solicitud de Retiro Parcial enviada con éxito!`, 'success');
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
  }

  reporte(id:number,tipo:number){
    window.open(`${environment.rutaAPI}` + '/ReporPrestamos?id='
    + id
    + '&tipo=' + tipo
    );
  }

  valorID(ID,bandera){
    this.IDRegistro = ID;
    this.valorBandera = bandera;
  }

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    this.ToggleButton = false;
  }

  onUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post(`${this.urlEndPoint}`+"/Prestamos/"+this.IDRegistro+"?bandera="+this.valorBandera,fd,{
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress){
          console.log("Progreso: " + Math.round (event.loaded / event.total * 100)  + "%");
          this.progress = Math.round (event.loaded * 100 / event.total );
        }else if (event.type === HttpEventType.Response){
          //console.log(event);
          if (event.status == 200){
            this.router.navigate(['/retiro']).then(() => {
              window.location.reload();
            });
            this.mensaje = "Archivo " +this.selectedFile.name+ " subido correctamente.";
            Swal.fire({
              title: "Subida exitosa.",
              text: "El archivo " +this.selectedFile.name+ " se subido correctamente.",
              icon: 'success'});
          } 
        }
      },
      error => {
        console.log(error);
        Swal.fire({
          title: 'ERROR!!!',
          text: error.message,
          icon: 'error'});
      });
      this.ToggleButton = true;
  }

  noPuntoComa(event) {
  
    var e = event || window.event;
    var key = e.keyCode || e.which;

    if ( key === 110 || key === 190 || key === 188 ) {     
        
       e.preventDefault();     
    }
}

}
