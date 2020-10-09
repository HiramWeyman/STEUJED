import { Component, OnInit } from '@angular/core';
import { DescargaService } from '../../services/descarga/descarga.service';
import { Descarga } from '../../interfaces/descarga';

@Component({
  selector: 'app-descarchivos',
  templateUrl: './descarchivos.component.html',
  styleUrls: ['./descarchivos.component.css']
})
export class DescarchivosComponent implements OnInit {

  descarga:Descarga[];

  constructor(private _ds:DescargaService) { }

  ngOnInit(): void {
      this._ds.getPDescargas().subscribe(
        descarga => {
        this.descarga = descarga;
        console.log(this.descarga);
      }
    );
  }

}
