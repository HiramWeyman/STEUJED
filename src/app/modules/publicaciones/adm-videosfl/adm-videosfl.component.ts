import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient, HttpEventType } from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import { VideosFLService } from '../../../services/services.index';
import { VideosFL } from '../../../interfaces/videosfl';

@Component({
  selector: 'app-adm-videosfl',
  templateUrl: './adm-videosfl.component.html',
  styleUrls: ['./adm-videosfl.component.css']
})
export class AdmVideosflComponent implements OnInit {

  public video: VideosFL = new VideosFL();
  videos:VideosFL[];

  constructor( public router: Router, private http: HttpClient, private _vfl:VideosFLService ) { }

  ngOnInit(): void {

    this._vfl.getVideosFL().subscribe(
      (videos) => {
        this.videos = videos;
        //console.log(this.videos);
      }
    )

  }

  cargarPublicacion(id:number): void{
    if(id){
      this._vfl.getVideo(id).subscribe( (video) => {
        this.video = video;
        //console.log(this.video);
      })
    }
  }

  create(){
    const Usuario = sessionStorage.Login.replace("_", "");
    this._vfl.create(this.video,Usuario).subscribe(video =>{
      this._vfl.getVideosFL().subscribe(
        (videos) => {
          this.videos = videos;
        }
      )
      Swal.fire('Guardado', `Video ${video.vid_titulo} agregado con éxito!`, 'success');
    },
    error => {
      console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
  }

  update(){
    this._vfl.update(this.video).subscribe(usr =>{
      this._vfl.getVideosFL().subscribe(
        (videos) => {
          this.videos = videos;
        }
      )
        Swal.fire('Actualizado', 'Video actualizada con exito', 'success');
    },
    error => {
      //console.log(error);
      Swal.fire({
        title: 'ERROR!!!',
        text: error.message,
        icon: 'error'});
    });
  }

  delete(video){
    this._vfl.delete(video.vid_id).subscribe(
      response => {
        this._vfl.getVideosFL().subscribe(
          (videos) => {
            this.videos = videos;
          }
        )
        Swal.fire('Video Eliminado!',`Video ${video.vid_titulo} eliminado con éxito.`,'success')
      }
    )
  }

}
