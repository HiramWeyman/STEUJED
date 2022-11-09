import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Publicaciones } from '../../principal/publicaciones';
import {Router, ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { PublicacionesService } from '../../../../services/dasboard/publicaciones.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notasform',
  templateUrl: './notasform.component.html',
  styleUrls: ['./notasform.component.css']
})
export class NotasformComponent implements OnInit {

  forma: FormGroup;
  public publicaciones: Publicaciones = new Publicaciones();
  publicacion:Publicaciones[];

  isHiddenNew = false;
  isHiddenUpdate = true;

  id: number;

  private subscription: Subscription;

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

  constructor( private fb: FormBuilder, private activatedRoute: ActivatedRoute, private _ps :PublicacionesService,
               public router: Router ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.id = params['id']      
      if (this.id !== 0){
        this.subscription = this._ps.getNota(this.id).subscribe(
          (nota) => {
            this.publicacion = nota;
            //console.log(this.publicacion);
            this.forma.patchValue(this.publicacion);
            this.forma.updateValueAndValidity();
            this.isHiddenNew = true;
            this.isHiddenUpdate = false;
            
          }
        )
      }
      
    })

    window.scroll(0, 0);
    this.crearFormulario();

  }

  get tituloNovalido(){
    return this.forma.get('pub_titulo').invalid && this.forma.get('pub_titulo').touched
  }

  get notaNovalido(){
    return this.forma.get('pub_texto').invalid && this.forma.get('pub_texto').touched
  }

  crearFormulario(){
    this.forma = this.fb.group({
      pub_id: [this.publicaciones.pub_id],
      pub_titulo: ['', Validators.required],
      pub_texto: ['', Validators.required],
      pub_subtitulo: [this.publicaciones.pub_subtitulo],
      pub_u_publica:[this.publicaciones.pub_u_publica],
      pub_f_publica: [this.publicaciones.pub_f_publica],
      pub_cancela: [this.publicaciones.pub_cancela],
      pub_id_categoria:  [this.publicaciones.pub_id_categoria],
      pub_ruta:  [this.publicaciones.pub_ruta],
      Pub_Categoria:  [this.publicaciones.Pub_Categoria]
    });
  }

  guardar(){
    if (this.forma.invalid){
      return Object.values( this.forma.controls ).forEach( control =>{
        control.markAsTouched();
      })
    }else{
      const Usuario = sessionStorage.Login.replace("_", "");
      this._ps.create(this.forma.value,'assets',Usuario).subscribe(publicacion =>{
        this._ps.getPublicaciones().subscribe(
          (nota) => {
            this.publicacion = nota;
          }
        )
        this.router.navigate(['/notas']);
        Swal.fire('Guardado', `Nota ${publicacion.pub_titulo} creada con éxito!`, 'success');
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

  update(id){
    this._ps.update(this.forma.value).subscribe(usr =>{
      this._ps.getPublicaciones().subscribe(
        (publicaciones) => {
          this.publicacion = publicaciones;
        }
      )
      this.router.navigate(['/notas']);
      Swal.fire('Actualizada', 'Publicación actualizada con exito', 'success');
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
  }
}
