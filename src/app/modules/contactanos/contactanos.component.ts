import { Component, OnInit} from '@angular/core';
import { Contactanos } from '../contactanos/Contactanos';
import { ContactanosService } from '../../services/dasboard/contactanos.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent implements OnInit {

  public contactano: Contactanos = new Contactanos();
  contactanos:Contactanos[];
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

  constructor( public router: Router, private http: HttpClient, private _contacto:ContactanosService ) { }

  ngOnInit(): void {

    this._contacto.getContactanos().subscribe(
      (contactanos) => {
        this.contactanos = contactanos;
        //console.log(contactanos);
      }
    )

  }

  cargarContactos(){
    this._contacto.getContactanos().subscribe(
      (contactanos) => {
        this.contactanos = contactanos;
        //console.log(contactanos);
      }
    )
  }

  cargarContacto(id:number){
    if(id){
      this._contacto.getContacto(id).subscribe( (contactano) => {
        this.contactano = contactano;
        //console.log(contactano);
      })
    }
  }

  update(){
    this._contacto.update(this.contactano).subscribe(usr =>{
      this.router.navigate(['/contactanos']).then(() => {
        this._contacto.getContactanos().subscribe(
          (contactanos) => {
            this.contactanos = contactanos;
            //console.log(contactanos);
          }
        )
      });
        Swal.fire('Actualizada', 'Contacto actualizada con exito', 'success');
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
