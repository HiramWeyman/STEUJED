import { Component, OnInit, ViewChild } from '@angular/core';
import { Publicaciones } from './publicaciones';
import { PublicacionesService } from '../../../services/dasboard/publicaciones.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  public urlEndPoint: string = `${environment.rutaAPI}`;
  public publicacion: Publicaciones = new Publicaciones();
  publicaciones:Publicaciones[];
  htmlContent = '';

  selectedFile: File = null;

  progress : any;
  mensaje : any;

  ToggleButton: boolean = true;

  //la configuracion de toolbarHiddenButtons, se encuentra en el archivo @kolkov/angular-editor/_ivy_ngcc_/fesm2015/kolkolv-angular-editor.js
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    width: 'auto',
    placeholder: 'Ingrese su texto aquí...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    enableToolbar: true,
    toolbarHiddenButtons: [
      ['justifyLeft','justifyCenter','justifyRight','justifyFull'],
      ['strikeThrough', 'superscript', 'subscript'],
      ['heading', 'fontName', 'fontSize', 'color','textColor','backgroundColor'],
      ['indent', 'outdent'],
      ['cut', 'copy', 'delete', 'removeFormat', 'undo', 'redo'],
      ['paragraph', 'blockquote', 'removeBlockquote', 'horizontalLine', 'insertOrderedList', 'insertUnorderedList'],
      ['link', 'unlink', 'insertImage', 'insertVideo','insertHorizontalRule']
    ]
  };


  constructor( public router: Router, private http: HttpClient, private _publicaciones:PublicacionesService ) {}

  ngOnInit(): void {
    this._publicaciones.getPublicaciones().subscribe(
      (publicaciones) => {
        this.publicaciones = publicaciones;
        //console.log(this.publicaciones);
      }
    )
  }

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    this.ToggleButton = false;
  }

  onUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post(`${this.urlEndPoint+"/UploadBanner?ruta=pics02.jpg"}`,fd,{
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
            this.router.navigate(['/principal']).then(() => {
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

  cargarPublicacion(id:number): void{
    if(id){
      this._publicaciones.getPublicacion(id).subscribe( (publicacion) => {
        this.publicacion = publicacion;
        //console.log(this.publicacion);
      })
    }
  }

  LimpiarForm(form: NgForm){
    form.resetForm(); // or form.reset();
  }

  delete(){}

  create(){}

  update(){
    this._publicaciones.update(this.publicacion).subscribe(usr =>{
      this.router.navigate(['/principal']).then(() => {
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

}
