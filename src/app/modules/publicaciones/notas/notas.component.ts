import { Component, OnInit, ViewChild } from '@angular/core';
import { Publicaciones } from '../principal/publicaciones';
import { PublicacionesService } from '../../../services/dasboard/publicaciones.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {

  public urlEndPoint: string = `${environment.rutaAPI}`;
  public publicacion: Publicaciones = new Publicaciones();
  publicaciones:Publicaciones[];
  htmlContent = '';

  selectedFile: File = null;

  progress : any;
  mensaje : any;

  selectedFiles: File[];
  FileNames: string = "";

  ToggleButton: boolean = true;

  afuConfig:any;

  imagenes: any[];
  data: any;
  array: string = "";

  public loadImagenes(data) {
    let body = <HTMLDivElement> document.body;
    let script = document.createElement('script');
    script.type = 'text/javascript';
    /*
    script.innerHTML = "$('.fotorama').fotorama({ "+
                        "data: [ "+
                            "{img: 'http://www.steujed.org.mx/assets/images/noticias/68/imagen1.jpeg'},"+
                            "{img: 'http://www.steujed.org.mx/assets/images/noticias/68/imagen2.jpeg'}"+
                          "]"+
                        "});";
    */
   script.innerHTML = data;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

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

  onFileSelected(event){
    //this.selectedFile = <File>event.target.files;
    this.selectedFiles = [].slice.call(event.target.files);
    for (const row of this.selectedFiles) {
      //this.FileNames += row.name+",";
      this.FileNames += row.name;
    }
    //this.FileNames.substring(-1);
    this.ToggleButton = false;
  }

  onUpload(){
    const fd = new FormData();
    for (const row of this.selectedFiles) {
    fd.append('image', row, row.name);
    this.http.post(`${this.urlEndPoint+"/UploadBanner?ruta=noticias/"+this.publicacion.pub_id+"/"+row.name}`,fd,{
      reportProgress: true,
      observe: 'events',
    })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress){
          console.log("Progreso: " + Math.round (event.loaded / event.total * 100)  + "%");
          this.progress = Math.round (event.loaded * 100 / event.total );
        }else if (event.type === HttpEventType.Response){
          //console.log(event);
          if (event.status == 201){ 

            this.afuConfig = {
              multiple: true,
              formatsAllowed: ".jpg,.jpeg",
              maxSize: "50",
              uploadAPI:  {
                url:`${environment.rutaAPI}/`+this.publicacion.pub_id,
                method:"POST"
              },
              hideResetBtn: true,
            };

            this._publicaciones.updateNombreArchivo(this.publicacion,this.publicacion.pub_id+"/"+row.name).subscribe(integrante =>{
              this.router.navigate(['/notas']).then(() => {
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
        //console.log(error);
        Swal.fire({
          title: 'ERROR!!!',
          text: error.message,
          icon: 'error'});
      });
      this.ToggleButton = true;
    }
  }

  cargarPublicacion(id:number): void{
    if(id){
      this._publicaciones.getPublicacion(id).subscribe( (publicacion) => {
        this.publicacion = publicacion;
        //console.log(this.publicacion);
      })
    }
  }

  cargarGaleria(id:number): void{
    if(id){
      this._publicaciones.getPublicacion(id).subscribe( (publicacion) => {
        this.publicacion = publicacion;
        //console.log(this.publicacion);

        this.imagenes = this.publicacion.pub_ruta.split(",,");
        this.imagenes.splice(-1,1);
        for( var x=0; x<this.imagenes.length; x=x+1){
          this.array += "{img:'http://www.steujed.org.mx/assets/images/noticias/"+id+"/"+this.imagenes[x]+"'},";
        }
        this.array = this.array.slice(0, -1)
        this.data =
        "$('.fotorama').fotorama({ data: ["+this.array+"] });"

        this.loadImagenes(this.data);
      })
    }
  }

  update(){
    /*
    this._publicaciones.update(this.publicacion).subscribe(usr =>{
      this._publicaciones.getPublicaciones().subscribe(
        (publicaciones) => {
          this.publicaciones = publicaciones;
        }
      )
        Swal.fire('Actualizada', 'Publicación actualizada con exito', 'success');
    },
    error => {
      //console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
    */
  }

  create(){
    /*
    const Usuario = sessionStorage.Login.replace("_", "");
    this._publicaciones.create(this.publicacion,'assets',Usuario).subscribe(publicacion =>{
      this._publicaciones.getPublicaciones().subscribe(
        (publicaciones) => {
          this.publicaciones = publicaciones;
        }
      )
      Swal.fire('Guardado', `Nota ${publicacion.pub_titulo} creada con éxito!`, 'success');
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
    */
  }

  /*
  //ANTERIOR METODO DE CREAR NOTAS Y SUBIR SOLO UNA FOTO
  create(){
     //////registro
     const Usuario = sessionStorage.Login.replace("_", "");
     this._publicaciones.create(this.publicacion,'assets',Usuario).subscribe(publicacion =>{
      
      ////////imagenes
       
       const fd = new FormData();
        if (this.selectedFiles.length > 0) {
          for (const row of this.selectedFiles) {
           fd.append('image', row, row.name);
            this.http.post(`${this.urlEndPoint+"/UploadBanner?ruta=noticias/"+publicacion.pub_id+"/"+row.name}`,fd,{
             reportProgress: true,
             observe: 'events',
           }).subscribe(event => {
                if (event.type === HttpEventType.UploadProgress){
                  console.log("Progreso: " + Math.round (event.loaded / event.total * 100)  + "%");
                  const promise = this.progress = Math.round (event.loaded * 100 / event.total );
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
         
        ///////actualizamos el campo de ruta con los nombres de las imagenes
        this._publicaciones.updateNombreArchivo(publicacion,publicacion.pub_id+"/"+this.FileNames).subscribe(integrante =>{
          this._publicaciones.getPublicaciones().subscribe(
            (publicaciones) => {
              this.publicaciones = publicaciones;
            }
          )
        Swal.fire('Guardado', `Nota ${publicacion.pub_titulo} creada con éxito!`, 'success');
        },
        error => {
          //console.log(error);
          Swal.fire({
            title: 'ERROR!!!',
            text: error.message,
            icon: 'error'});
        });
        ////////
        
        }
        
        /////////
        
     },
     error => {
       console.log(error);
       Swal.fire({
         title: 'ERROR!!!',
         text: error.message,
         icon: 'error'});
     });
     
     //////
  }
  */
  
  delete(publicacion){
    this._publicaciones.delete(publicacion.pub_id).subscribe(
      response => {
        this._publicaciones.getPublicaciones().subscribe(
          (publicaciones) => {
            this.publicaciones = publicaciones;
          }
        )
        Swal.fire('Nota Eliminada!',`Nota ${publicacion.pub_titulo} eliminada con éxito.`,'success')
      }
    )
  }

}
