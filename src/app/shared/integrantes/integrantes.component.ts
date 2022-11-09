import { Component, OnInit } from '@angular/core';
import { IntegrantesService } from '../../services/dasboard/integrantes.service';
import { Integrantes } from '../../interfaces/integrantes';

@Component({
  selector: 'app-integrantes',
  templateUrl: './integrantes.component.html'
})
export class IntegrantesComponent implements OnInit {

  integrantes:Integrantes[];
  comite:any;
  descripcion:string;

  constructor(private _int:IntegrantesService) { }

  ngOnInit(): void {

    this._int.getIntegrantes().subscribe(
      integrantes => {
        this.integrantes = integrantes;
        //console.log(this.integrantes);
      }
    );

    this._int.getComite().subscribe(
      comite=>{
        this.comite=comite;
        console.log(this.comite);
        this.descripcion=this.comite.com_descripcion;
        console.log(this.descripcion);
      }
    );

  }

}
