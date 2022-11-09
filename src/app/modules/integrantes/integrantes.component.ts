import { Component, OnInit, ViewChild } from '@angular/core';
import { Integrantes } from '../../interfaces/integrantes';
import { IntegrantesService } from '../../services/dasboard/integrantes.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-integrantes',
  templateUrl: './integrantes.component.html',
  styleUrls: ['./integrantes.component.css']
})
export class IntegrantesComponent implements OnInit {

  public urlEndPoint: string = `${environment.rutaAPI}`;
  public integrante: Integrantes = new Integrantes();
  integrantes:Integrantes[];
  comite:any;
  descripcion:string;

  selectedFile: File = null;

  progress : any;
  mensaje : any;

  ToggleButton: boolean = true;

  constructor( public router: Router, private http: HttpClient, private _int:IntegrantesService ) { }

  ngOnInit(): void {
    this._int.getIntegrantesBandera().subscribe(
      (integrantes) => {
        this.integrantes = integrantes;
        //console.log(this.integrantes);
      }
    )

    this._int.getComite().subscribe(
      comite=>{
        this.comite=comite;
        //console.log(this.comite);
        this.descripcion=this.comite.com_descripcion;
        //console.log(this.descripcion);
      }
    );

  }



  ActualizaComite(descripcion:string){
    
   /*  alert(descripcion); */

    this._int.ActualizaComite(1,descripcion).subscribe(usr =>{
      this.router.navigate(['/integrantes']).then(() => {
        window.location.reload();
      });
        Swal.fire('Actualizado', 'Comité actualizado con exito', 'success');
        
    },
    error => {
      //console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
  }


  cargarIntegrantes(){
    this._int.getIntegrantesBandera().subscribe(
      (integrantes) => {
        this.integrantes = integrantes;
      }
    )
  }

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    this.ToggleButton = false;
  }

  cargarPublicacion(id:number): void{
    if(id){
      this._int.getIntegrante(id).subscribe( (integrante) => {
        this.integrante = integrante
        //console.log(this.integrante);
      })
    }
  }

  LimpiarForm(form: NgForm){
    form.resetForm(); // or form.reset();
  }

  delete(integrante){
    this._int.delete(integrante.int_id).subscribe(
      response => {
        //this.integrante = this.integrante.filter(cli => cli !== integrante)
        this.router.navigate(['/integrantes']).then(() => {
          window.location.reload();
        });
        Swal.fire(
          'Usuario Eliminado!',
          `Usuario ${integrante.int_nombre} eliminado con éxito.`,
          'success'
        )
      }
    )
  }

  create(){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post(`${this.urlEndPoint+"/UploadBanner?ruta=integrantes/"+this.selectedFile.name}`,fd,{
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress){
          console.log("Progreso: " + Math.round (event.loaded / event.total * 100)  + "%");
          this.progress = Math.round (event.loaded * 100 / event.total );
        }else if (event.type === HttpEventType.Response){
          console.log(event);
          if (event.status == 201){
            //////registro
            this._int.create(this.integrante,this.selectedFile.name).subscribe(integrante =>{
              this.router.navigate(['/integrantes']).then(() => {
                window.location.reload();
              });
                Swal.fire('Guardado', `Archivo ${integrante.int_nombre} creado con éxito!`, 'success');
            },
            error => {
              //console.log(error);
              Swal.fire({
                title: 'ERROR!!!',
                text: error.message,
                icon: 'error'});
            });
            //////
          } 
        }
      },
      error => {
        console.log(error);
        Swal.fire({
          title: 'ERROR!!!',
          text: error.message,
          icon: 'error'});
      })
  }

  update(){
    this._int.update(this.integrante).subscribe(usr =>{
      this.router.navigate(['/integrantes']).then(() => {
        window.location.reload();
      });
        Swal.fire('Actualizada', 'Publicación actualizada con exito', 'success');
        
    },
    error => {
      //console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
  }

  onUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post(`${this.urlEndPoint+"/UploadBanner?ruta=integrantes/"+this.selectedFile.name}`,fd,{
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress){
          console.log("Progreso: " + Math.round (event.loaded / event.total * 100)  + "%");
          this.progress = Math.round (event.loaded * 100 / event.total );
        }else if (event.type === HttpEventType.Response){
          //console.log(event);
          if (event.status == 201){
            this._int.updateNombreArchivo(this.integrante,this.selectedFile.name).subscribe(integrante =>{
              this.router.navigate(['/integrantes']).then(() => {
                window.location.reload();
              });
                Swal.fire('Guardado', `Archivo ${this.selectedFile.name} actualizado con éxito!`, 'success');
            },
            error => {
              //console.log(error);
              Swal.fire({
                title: 'ERROR!!!',
                text: error.message,
                icon: 'error'});
            });
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

}
