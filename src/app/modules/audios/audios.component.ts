import { Component, OnInit } from '@angular/core';
import { Track } from 'ngx-audio-player';  
import { msaapPlaylist } from '../../services/audios/msaapPlaylist';  
import { AudiotecaService } from '../../services/audios/audioteca.service';
import Swal from 'sweetalert2';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Router, ActivatedRoute} from '@angular/router';
import { Audios } from '../../services/audios/audios';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-audios',
  templateUrl: './audios.component.html',
  styleUrls: ['./audios.component.css']
})
export class AudiosComponent implements OnInit {

  public urlEndPoint: string = `${environment.rutaAPI}`;

  public audio: Audios = new Audios();
  audios: Audios[];

  msaapPlaylist: Track[];

  selectedFile: File = null;

  progress : any;
  mensaje : any;

  ToggleButton: boolean = true;

  afuConfig = {
    multiple: false,
    formatsAllowed: ".mp3",
    maxSize: "50",
    uploadAPI:  {
      url:"https://localhost:44354/api/UploadAudios",
      //url:"assets/audios",
      method:"POST"
    },
  };

  constructor( public router: Router, private http: HttpClient, private _audios:AudiotecaService ) {}
   
  ngOnInit(): void {
    this._audios.getArchivos().subscribe(
      msaapPlaylist => {
        this.msaapPlaylist = msaapPlaylist;
        //console.log(this.audios);
      }
    ),
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    };
  }

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    this.ToggleButton = false;
  }
/*
  create(){
    this._audios.create(this.audio, "gdf").subscribe(audio =>{
      //console.log(audio);
      
      this._audios.getArchivos().subscribe(
        msaapPlaylist => {
          this.msaapPlaylist = msaapPlaylist;
          console.log(this.msaapPlaylist);
        }
      )
      //Swal.fire('Guardado', `Audio ${publicacion.pub_titulo} creado con éxito!`, 'success');
      Swal.fire('Guardado', `Audio creado con éxito!`, 'success');
    },
    error => {
      //console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
  }
*/
  
  create(){

    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    
    //this.http.post(`${this.urlEndPoint+"/UploadAudios?ruta="+this.selectedFile.name}`,fd,{
    //this.http.post<any>(`${this.urlEndPoint+"/UploadAudios?ruta="+this.selectedFile.name}`,fd,{
    this.http.post<any>(`${this.urlEndPoint+"/UploadAudios"}`,fd,{
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
            this._audios.create(this.audio, this.selectedFile.name).subscribe(audio =>{
              console.log(audio);
              
              this._audios.getArchivos().subscribe(
                msaapPlaylist => {
                  this.msaapPlaylist = msaapPlaylist;
                  console.log(this.msaapPlaylist);
                }
              )
              Swal.fire('Guardado', `Audio ${audio.title} creado con éxito!`, 'success');
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


  delete(audio){
    this._audios.delete(audio.id).subscribe(
      response => {
        //this.integrante = this.integrante.filter(cli => cli !== integrante)
        this._audios.getArchivos().subscribe(
          msaapPlaylist => {
            this.msaapPlaylist = msaapPlaylist;
            console.log(this.msaapPlaylist);
          }
        )
        
        Swal.fire(
          'Audio Eliminado!',
          `Audio ${audio.title} eliminado con éxito.`,
          'success'
        )
      }
    )
  }

}
