import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServiciosService } from '../../../services/servicios/servicios.service';
import { CajaAhorroService } from '../../../services/cajaAhorro/cajaAhorro.service';
import { Revolvente } from '../../../interfaces/revolvente';
import Swal from 'sweetalert2';
import { environment} from '../../../../environments/environment';
import { HttpClient, HttpEventType } from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-revolvente',
  templateUrl: './revolvente.component.html',
  styleUrls: ['./revolvente.component.scss']
})
export class RevolventeComponent implements OnInit {

  public urlEndPoint: string = `${environment.rutaAPI}`;

  @ViewChild('closeModal') private closeModal: ElementRef;

  public revolvente: Revolvente = new Revolvente();

  advos: any;
  public nombre: string;
  public matricula: string;
  public adscripcion: string;

  revolventes: Revolvente[];

  selectedFile: File = null;
  progress : any;
  mensaje : any;
  ToggleButton: boolean = true;
  ToggleButtonA: boolean = true;
  ToggleButtonM: boolean = true;

  IDRegistro: any;
  valorBandera: any;

  constructor( private _serv:ServiciosService, private _ca: CajaAhorroService, private http: HttpClient,
    public router: Router ) { }

  ngOnInit(): void {
    this._ca.getRevolvente(sessionStorage.getItem('LoginBase')).subscribe(
      (revolventes) => {
        this.revolventes = revolventes;
        console.log(this.revolventes);
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

  valorID(ID,bandera){
    this.IDRegistro = ID;
    this.valorBandera = bandera;
  }

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    this.ToggleButton = false;
  }

  inputCantidad(valorSelect){
    if(valorSelect === 'ALTA'){ 
      this.ToggleButtonA = false;
      this.ToggleButtonM = true;
    }else if(valorSelect === 'BAJA'){
      this.ToggleButtonA = true;
      this.ToggleButtonM = true;
    }else if(valorSelect === 'MODIFICACION'){
      this.ToggleButtonA = true;
      this.ToggleButtonM = false;
    }else{
      this.ToggleButtonA = true;
      this.ToggleButtonM = true;
    }
  }

  createRevolvente(){
    console.log(this.revolvente);
    
    this._ca.createRevolvente(this.matricula, this.nombre, this.revolvente).subscribe(cajaAhorro =>{
      this._ca.getRevolvente(sessionStorage.getItem('LoginBase')).subscribe(
        (revolventes) => {
          this.revolventes = revolventes;
        }
      )
      Swal.fire('Guardado', `Solicitud de Ingresos enviada con éxito!`, 'success');
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
    
  }

  onUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post(`${this.urlEndPoint}`+"/Revolvente/"+this.IDRegistro+"?bandera="+this.valorBandera,fd,{
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress){
          console.log("Progreso: " + Math.round (event.loaded / event.total * 100)  + "%");
          this.progress = Math.round (event.loaded * 100 / event.total );
        }else if (event.type === HttpEventType.Response){
          console.log(event);
          if (event.status == 200){
            this.router.navigate(['/revolvente']).then(() => {
              //window.location.reload();
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

  reporte(id:number,tipo:number){

    window.open(`${environment.rutaAPI}` + '/ReporPrestamos?id='
    + id
    + '&tipo=' + tipo
    );
      }


      noPuntoComa(event) {
  
        var e = event || window.event;
        var key = e.keyCode || e.which;
    
        if ( key === 110 || key === 190 || key === 188 ) {     
            
           e.preventDefault();     
        }
    }

}
