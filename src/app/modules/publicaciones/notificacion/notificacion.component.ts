import { Component, OnInit} from '@angular/core';
import { Publicaciones } from '../principal/publicaciones';
import { PublicacionesService } from '../../../services/dasboard/publicaciones.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html'
})
export class NotificacionComponent implements OnInit {

  public publicacion: Publicaciones = new Publicaciones();
  publicaciones:Publicaciones[];
  htmlContent = '';

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

  constructor( public router: Router, private http: HttpClient, private _publicaciones:PublicacionesService ) { }

  ngOnInit(): void {
    this._publicaciones.getPublicaciones().subscribe(
      (publicaciones) => {
        this.publicaciones = publicaciones;
        //console.log(this.publicaciones);
      }
    )
  }

  cargarPublicacion(id:number): void{
    if(id){
      this._publicaciones.getPublicacion(id).subscribe( (publicacion) => {
        this.publicacion = publicacion;
        //console.log(this.publicacion);
      })
    }
  }

  update(){
    this._publicaciones.update(this.publicacion).subscribe(usr =>{
      this.router.navigate(['/notificacion']).then(() => {
        //window.location.reload();
      });
        Swal.fire('Actualizada', 'Notificación actualizada con exito', 'success');
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
