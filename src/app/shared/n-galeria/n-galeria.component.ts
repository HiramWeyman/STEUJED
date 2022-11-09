import { Component, OnInit } from '@angular/core';
import { _TOKEN } from '../../../environments/environment';
import { ArchivosService } from '../../services/dasboard/archivos.services';
import { Archivos } from '../../interfaces/archivos';
import { GaleriaService } from '../../services/dasboard/galeria.service';
import { Galeria } from '../../interfaces/galeria';

@Component({
  selector: 'app-n-galeria',
  templateUrl: './n-galeria.component.html',
  styleUrls: ['./n-galeria.component.css']
})
export class NGaleriaComponent implements OnInit {

  galerias:Galeria[];

  p: number = 1;

  constructor( private _archivos : ArchivosService, private _gs: GaleriaService ) { }

  ngOnInit(): void {
    this._gs.getGalerias().subscribe(
      publicaciones => {
        this.galerias = publicaciones;
        //console.log(this.galerias);
        this.galerias = this.galerias.map( item => {
          var splitter = item.gal_ruta.split(",,");
          item.gal_ruta = item.gal_ruta ? '' || 'assets/images/galeria/'+item.gal_id+'/'+splitter[0] : 'MyVAL'
          return item;
       });
      },
      error => {
        console.log(error);
      }
    );
  }

}
