import { Component, OnInit } from '@angular/core';
import { _TOKEN } from '../../../environments/environment';
import { VideosFLService } from '../../services/services.index';
import { VideosFL } from '../../interfaces/videosfl';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';

@Component({
  selector: 'app-videos-fl',
  templateUrl: './videos-fl.component.html',
  styleUrls: ['./videos-fl.component.css']
})
export class VideosFLComponent implements OnInit {


  videosFL:VideosFL[];
  url: SafeResourceUrl;

  p: number = 1;

  

  constructor( private _vfl: VideosFLService, public sanitizer:DomSanitizer ) { }

  ngOnInit(): void {
    this._vfl.getVideosFL().subscribe(
      videosFL => {
        this.videosFL = videosFL;
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.videosFL[0].vid_src);
        console.log(this.videosFL);
      },
      error => {
        console.log(error);
      }
    );
  }

}
