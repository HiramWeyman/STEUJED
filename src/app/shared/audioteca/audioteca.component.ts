import { Component, OnInit } from '@angular/core';
import { Track } from 'ngx-audio-player';  
import { msaapPlaylist } from '../../services/audios/msaapPlaylist';  
import { AudiotecaService } from '../../services/audios/audioteca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-audioteca',
  templateUrl: './audioteca.component.html'
})
export class AudiotecaComponent implements OnInit {

msaapDisplayTitle = true;
msaapDisplayPlayList = true;
msaapPageSizeOptions = [10,20,30];
msaapDisplayVolumeControls = true;

msaapPlaylist: Track[];

  constructor( private _audios:AudiotecaService ) { }

  ngOnInit(): void {

    this._audios.getArchivos().subscribe(
      msaapPlaylist => {
        this.msaapPlaylist = msaapPlaylist;
        console.log(this.msaapPlaylist);
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
/*
  // Material Style Advance Audio Player Playlist
msaapPlaylist: Track[] = [
  {
      title: '01 STEUJED AL AIRE',
      link: '../../assets/audios/01 STEUJED AL AIRE.mp3'
  },
  {
      title: '02 STEUJED AL AIRE',
      link: '../../assets/audios/02 STEUJED AL AIRE.mp3'
  },
  {
      title: '03 STEUJED AL AIRE',
      link: '../../assets/audios/03 STEUJED AL AIRE.mp3'
  },
  {
    title: '04 STEUJED AL AIRE',
    link: '../../assets/audios/04 STEUJED AL AIRE.mp3'
  },
  {
    title: '05 STEUJED AL AIRE Secretarìa de Organizacion Entrev Lic Norma Obdulia Casas',
    link: '../../assets/audios/05 STEUJED AL AIRE Secretarìa de Organizacion Entrev Lic Norma Obdulia Casas.mp3'
  },
  {
    title: '06 STEUJED AL AIRE Secretarìa de Organizaciòn (parte2) Entrev Lic Norma Obdulia Casas',
    link: '../../assets/audios/06 STEUJED AL AIRE Secretarìa de Organizaciòn (parte2) Entrev Lic Norma Obdulia Casas.mp3'
  },
  {
    title: '07 STEUJED AL AIRE  Secretarìa del Trabajo y Conflictos Entrev Jorge Hdez',
    link: '../../assets/audios/07 STEUJED AL AIRE  Secretarìa del Trabajo y Conflictos Entrev Jorge Hdez.mp3'
  },
  {
    title: '08 STEUJED AL AIRE Secretarìa de Vivienda Entrev Jorge Salas',
    link: '../../assets/audios/08 STEUJED AL AIRE Secretarìa de Vivienda Entrev Jorge Salas.mp3'
  },
  {
    title: '09 STEUJED AL AIRE Secretarìa de Vivienda Entrev Jorge Salas Hndez',
    link: '../../assets/audios/09 STEUJED AL AIRE Secretarìa de Vivienda Entrev Jorge Salas Hndez.mp3'
  },
  {
    title: '10 STEUJED AL AIRE Cartera Educacion Sindical Entrev Lic Jesus Ontiveros',
    link: '../../assets/audios/10 STEUJED AL AIRE Cartera Educacion Sindical Entrev Lic Jesus Ontiveros.mp3'
  },
  {
    title: '11 STEUJED AL AIRE Comision Bolsa de Trabajo Entrev Susana Martinez',
    link: '../../assets/audios/11 STEUJED AL AIRE Comision Bolsa de Trabajo Entrev Susana Martinez.mp3'
  },
  {
    title: '12 STEUJED AL AIRE Comision Bolsa de Trabajo Entrev Raimundo Gonzalez',
    link: '../../assets/audios/12 STEUJED AL AIRE Comision Bolsa de Trabajo Entrev Raimundo Gonzalez.mp3'
  },
  {
    title: '13 STEUJED AL AIRE Seguridad e Higiene Entrev Laura Denis Molina',
    link: '../../assets/audios/13 STEUJED AL AIRE Seguridad e Higiene Entrev Laura Denis Molina.mp3'
  },
  {
    title: '14 STEUJED AL AIRE Prog 43 ANIVERSARIO del Sindicato',
    link: '../../assets/audios/14 STEUJED AL AIRE Prog 43 ANIVERSARIO del Sindicato.mp3'
  },
  {
    title: '15 STEUJED AL AIRE Seguridad e Higiene (parte2)  Entrev Laura Denis Molina',
    link: '../../assets/audios/15 STEUJED AL AIRE Seguridad e Higiene (parte2)  Entrev Laura Denis Molina.mp3'
  },
];
*/
}
