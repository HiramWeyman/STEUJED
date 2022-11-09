import { Component, OnInit } from '@angular/core';
import { Advos } from '../../interfaces/advos';
import { ServiciosService } from '../../services/servicios/servicios.service';
import { environment} from '../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reimpresionsol',
  templateUrl: './reimpresionsol.component.html',
  styleUrls: ['./reimpresionsol.component.css']
})
export class ReimpresionsolComponent implements OnInit {
  /* administrativos: Advos[]; */
  administrativos: any;
  constructor( private _serv:ServiciosService) { }

  ngOnInit(): void {
    //console.log(sessionStorage.Matricula+"j");
    this.cargarConcursoPlazas(sessionStorage.Matricula);
  }
 

  cargarConcursoPlazas(ids){

  this._serv.getAdministrativosReimp(ids).subscribe(
    administrativos => this.administrativos = administrativos
    );
  }

  reporte(id: number){

    window.open(`${environment.rutaAPI}` + '/ReimpresionSol?id='
    + id

    );
  }

}
