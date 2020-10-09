import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoginService } from '../../services/login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-upload-banner',
  templateUrl: './upload-banner.component.html',
  styleUrls: ['./upload-banner.component.css']
})
export class UploadBannerComponent implements OnInit {

  public urlEndPoint: string = `${environment.rutaAPI}`;

  selectedFile: File = null;

  progress : any;
  mensaje : any;

  ToggleButton: boolean = true;

  constructor( private http: HttpClient, private _login : LoginService, private router: Router ) { }

  ngOnInit(): void {
   
  }

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    this.ToggleButton = false;
  }

  onUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post(`${this.urlEndPoint+"/UploadBanner?ruta=header.jpg"}`,fd,{
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
            this.mensaje = "Archivo " +this.selectedFile.name+ " subido correctamente.";
            swal.fire({
              title: "Subida exitosa.",
              text: "El archivo " +this.selectedFile.name+ " se subido correctamente.",
              icon: 'success'});
          } 
        }
        
      },
      error => {
        console.log(error);
        swal.fire({
          title: 'ERROR!!!',
          text: error.message,
          icon: 'error'});
      });
      this.ToggleButton = true;
  }

}
