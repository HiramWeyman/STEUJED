import { Component, OnInit } from '@angular/core';
import { _TOKEN } from '../../../../environments/environment';
import { ArchivosService } from '../../../services/dasboard/archivos.services';
import { Archivos } from '../../../interfaces/archivos';
import { PublicacionesService } from '../../../services/dasboard/publicaciones.service';
import { Publicaciones } from '../../../modules/publicaciones/principal/publicaciones';

@Component({
  selector: 'app-noticiasall',
  templateUrl: './noticiasall.component.html',
  styleUrls: ['./noticiasall.component.css']
})
export class NoticiasallComponent implements OnInit {
  publicaciones:Publicaciones[];

  p: number = 1;
  constructor(private _archivos : ArchivosService, private _publicaciones: PublicacionesService) { }

  ngOnInit(): void {
    this._publicaciones.getPublicaciones().subscribe(
      publicaciones => {
        this.publicaciones = publicaciones;
        //this.texto = this.publicaciones[0].pub_texto.valueOf();
        //console.log(this.publicaciones);
        this.publicaciones = this.publicaciones.map( item => {
          var splitter = item.pub_ruta.split(",,");
          item.pub_ruta = item.pub_ruta ? '' || './assets/images/noticias/'+item.pub_id+'/'+splitter[0] : 'MyVAL'
          console.log(item);
          return item;
       });
      },
      error => {
        console.log(error);
      }
    );
  }

}
