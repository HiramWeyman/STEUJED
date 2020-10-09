import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { ArchivosService } from '../../../services/dasboard/archivos.services';
import { Archivos } from '../../../interfaces/archivos';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-arccomp-form',
  templateUrl: './arccomp-form.component.html'
})
export class ArccompFormComponent implements OnInit {

  public archivos: Archivos = new Archivos();

  public urlEndPoint: string = `${environment.rutaAPI}`;

  selectedFile: File = null;

  progress : any;
  mensaje : any;

  constructor(private http: HttpClient, public router: Router, private activatedRoute: ActivatedRoute, private _archivos: ArchivosService) { }

  ngOnInit(): void {
    this.cargarArchivos();
  }

  cargarArchivos(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      //console.log(params);
      if(id){ 
       this._archivos.getArchivo(id).subscribe( (archivos) => {
         this.archivos = archivos
         //console.log(archivos);
       })
      }
    })
  }

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    //this.ToggleButton = false;
  }

  create(): void {
    console.log(this.archivos);
    const fd = new FormData();
    fd.append('application', this.selectedFile, this.selectedFile.name);
    console.log(fd);
    /*
    this._archivos.create(this.archivos).subscribe(archivo =>{
      this.router.navigate(['/archivos']);
      Swal.fire('Guardado', `Archivo ${archivo.archivo_descrip} creado con éxito!`, 'success');
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

  update(): void {
      this._archivos.update(this.archivos).subscribe(archivo =>{
        this.router.navigate(['/archivoscompartidos']);
          Swal.fire('Actualizado', 'Archivo actualizado con exito', 'success');
      },
      error => {
        //console.log(error);
        Swal.fire({
          title: 'ERROR!!!',
          text: error.message,
          icon: 'error'});
      });
  }

  regresar(): void {
    this.router.navigate(['/archivoscompartidos']);
  }

  onUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post(`${this.urlEndPoint+"/UploadFiles?ruta="+"compartidos/"+this.selectedFile.name}`,fd,{
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
            this._archivos.create(this.archivos,"compartidos/"+this.selectedFile.name,'2').subscribe(archivo =>{
              this.router.navigate(['/archivoscompartidos']);
                Swal.fire('Guardado', `Archivo ${archivo.archivo_descrip} creado con éxito!`, 'success');
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
      });
  }

}
